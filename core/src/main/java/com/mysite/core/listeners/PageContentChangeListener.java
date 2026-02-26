package com.mysite.core.listeners;

import java.util.*;

import javax.jcr.*;

import javax.jcr.version.*;

import org.apache.sling.api.resource.*;
import org.apache.sling.api.resource.observation.ResourceChange;
import org.apache.sling.api.resource.observation.ResourceChangeListener;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

@Component(service = ResourceChangeListener.class, property = {

		ResourceChangeListener.PATHS + "=/content/mysite",

		ResourceChangeListener.CHANGES + "=ADDED", ResourceChangeListener.CHANGES + "=CHANGED",
		ResourceChangeListener.CHANGES + "=REMOVED"

})
public class PageContentChangeListener implements ResourceChangeListener {

	@Reference
	private ResourceResolverFactory resolverFactory;

// avoid duplicate revisions
	private static final Map<String, Long> LOCK = new HashMap<>();

	@Override
	public void onChange(List<ResourceChange> changes) {

		Map<String, Object> param = Map.of(ResourceResolverFactory.SUBSERVICE, "myproject-service");

		try (ResourceResolver resolver = resolverFactory.getServiceResourceResolver(param)) {

			Session session = resolver.adaptTo(Session.class);

			PageManager pm = resolver.adaptTo(PageManager.class);

			VersionManager vm = session.getWorkspace().getVersionManager();

			for (ResourceChange change : changes) {

				String path = change.getPath();

				/// prevent workflow/system events
				if (path.contains("rep:policy") || path.contains("/var/") || path.contains("/conf/")) {

					continue;
				}

				Resource changedResource = resolver.getResource(path);

				if (changedResource == null) {
					continue;
				}

				Page page = pm.getContainingPage(changedResource);

				if (page == null) {
					continue;
				}

				String pagePath = page.getPath();

				/// stop duplicate trigger
				long now = System.currentTimeMillis();

				if (LOCK.containsKey(pagePath) && now - LOCK.get(pagePath) < 10000) {

					continue;
				}

				LOCK.put(pagePath, now);

				String contentPath = pagePath + "/jcr:content";

/// versionable check
				if (!session.nodeExists(contentPath)) {

					continue;
				}

				Node currentNode = session.getNode(contentPath);

				if (!currentNode.isNodeType("mix:versionable")) {

					continue;
				}

				VersionHistory vh = vm.getVersionHistory(contentPath);

				VersionIterator versions = vh.getAllVersions();

				Version lastVersion = null;

/// get latest version
				while (versions.hasNext()) {

					lastVersion = versions.nextVersion();

				}

				if (lastVersion == null || "jcr:rootVersion".equals(lastVersion.getName())) {

					continue;
				}

				Node frozenNode = lastVersion.getFrozenNode();

				StringBuilder changeLog = new StringBuilder();

/// recursive compare
				compareNodes(

						currentNode, frozenNode, changeLog, contentPath

				);

/// no change skip
				if (changeLog.length() == 0) {
					continue;
				}

// create revision
				pm.createRevision(

						page, "Content Updated", changeLog.toString()

				);

				System.out.println("Revision created -> " + pagePath);

			}

		} catch (Exception e) {

			e.printStackTrace();

		}

	}

	/**
	 * Recursive Node Comparison
	 */
	private void compareNodes(

			Node current, Node frozen, StringBuilder changeLog, String basePath)

			throws Exception {

/// PROPERTY COMPARE
		PropertyIterator props = current.getProperties();

		while (props.hasNext()) {

			Property prop = props.nextProperty();

			String name = prop.getName();

			/// allow jcr:title also
			if ((name.startsWith("jcr") && !"jcr:title".equals(name)) || name.startsWith("cq")) {

				continue;
			}

			String newValue = safeValue(prop);

			/// PROPERTY EXIST BEFORE ?
			if (frozen.hasProperty(name)) {

				String oldValue = safeValue(frozen.getProperty(name));

				if (!Objects.equals(oldValue, newValue)) {

					changeLog.append(

							current.getPath().replace(basePath, ""))

							.append(" : ").append(name).append(" changed from ").append(oldValue).append(" → ")
							.append(newValue).append("\n");
				}

			} else {

				/// PROPERTY ADDED

				changeLog.append(

						current.getPath().replace(basePath, ""))

						.append(" : ").append(name).append(" added → ").append(newValue).append("\n");

			}

		}

/// CHILD NODE COMPARE
		NodeIterator children = current.getNodes();

		while (children.hasNext()) {

			Node child = children.nextNode();

/// ignore system
			if (child.getName().startsWith("rep:")) {

				continue;
			}

			if (frozen.hasNode(child.getName())) {

				compareNodes(

						child, frozen.getNode(child.getName()), changeLog, basePath

				);

			} else {

				changeLog.append(

						"Component Added : " + child.getPath().replace(basePath, "") + "\n");

			}

		}

		PropertyIterator frozenProps = frozen.getProperties();

		while (frozenProps.hasNext()) {

			Property oldProp = frozenProps.nextProperty();

			String name = oldProp.getName();

			if ((name.startsWith("jcr") && !"jcr:title".equals(name)) || name.startsWith("cq")) {

				continue;
			}

			if (!current.hasProperty(name)) {

				changeLog.append(

						frozen.getPath().replace(basePath, ""))

						.append(" : ").append(name).append(" removed (old value → ").append(safeValue(oldProp))
						.append(")").append("\n");

			}

		}

	}

	private String safeValue(Property property) throws Exception {

		if (property.isMultiple()) {

			Value[] values = property.getValues();

			StringBuilder sb = new StringBuilder();

			for (Value v : values) {

				sb.append(v.getString()).append(",");

			}

			return sb.toString();

		}

		return property.getString();

	}

}
