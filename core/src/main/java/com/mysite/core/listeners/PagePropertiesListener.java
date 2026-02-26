package com.mysite.core.listeners;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.PropertyIterator;
import javax.jcr.Session;
import javax.jcr.version.Version;
import javax.jcr.version.VersionHistory;
import javax.jcr.version.VersionIterator;
import javax.jcr.version.VersionManager;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.observation.ResourceChange;
import org.apache.sling.api.resource.observation.ResourceChangeListener;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

@Component(service = ResourceChangeListener.class, property = {

//		ResourceChangeListener.PATHS + "=/content/mysite", ResourceChangeListener.CHANGES + "=CHANGED"

})
public class PagePropertiesListener implements ResourceChangeListener {

	@Reference
	private ResourceResolverFactory resolverFactory;

	/** prevent duplicate triggers **/
	private static final Map<String, Long> LOCK = new HashMap<>();

	@Override
	public void onChange(List<ResourceChange> changes) {

		Map<String, Object> param = Map.of(ResourceResolverFactory.SUBSERVICE, "myproject-service");

		try (ResourceResolver resolver = resolverFactory.getServiceResourceResolver(param)) {

			PageManager pm = resolver.adaptTo(PageManager.class);

			Session session = resolver.adaptTo(Session.class);

			VersionManager vm = session.getWorkspace().getVersionManager();

			for (ResourceChange change : changes) {

				String path = change.getPath();

/// ONLY jcr:content
				if (!path.endsWith("jcr:content")) {
					continue;
				}

				long now = System.currentTimeMillis();

/// STOP LOOP (Revision also fires event)
				if (LOCK.containsKey(path) && now - LOCK.get(path) < 10000) {

					continue;
				}

				LOCK.put(path, now);

				Resource resource = resolver.getResource(path);

				if (resource == null) {
					continue;
				}

				Page page = pm.getContainingPage(resource);

				if (page == null) {
					continue;
				}

				String versionPath = page.getPath() + "/jcr:content";

/// MUST be versionable
				if (!session.nodeExists(versionPath)) {
					continue;
				}

				Node currentNode = session.getNode(versionPath);

/// ensure versionable
				if (!currentNode.isNodeType("mix:versionable")) {
					continue;
				}

				VersionHistory vh = vm.getVersionHistory(versionPath);

				VersionIterator it = vh.getAllVersions();

				Version lastVersion = null;

/// get latest REAL version
				while (it.hasNext()) {

					lastVersion = it.nextVersion();

				}

// ignore rootVersion
				if (lastVersion == null || "jcr:rootVersion".equals(lastVersion.getName())) {

					continue;
				}

				Node frozenNode = lastVersion.getFrozenNode();

				PropertyIterator props = currentNode.getProperties();

				StringBuilder changeLog = new StringBuilder();

/// compare properties
				while (props.hasNext()) {

					Property prop = props.nextProperty();

					String name = prop.getName();

/// Skip system props BUT allow title
					if ((name.startsWith("jcr") && !"jcr:title".equals(name)) || name.startsWith("cq")) {
						continue;
					}

					if (!frozenNode.hasProperty(name)) {
						continue;
					}

					String newValue = prop.getString();

					String oldValue = frozenNode.getProperty(name).getString();

					if (!Objects.equals(oldValue, newValue)) {

						changeLog.append(name).append(" changed from ").append(oldValue).append(" → ").append(newValue)
								.append("\n");

					}

				}

// DO NOT CREATE EMPTY REVISION
				if (changeLog.length() == 0) {
					continue;
				}

// CREATE REVISION
				pm.createRevision(

						page, "Page Properties Updated", changeLog.toString()

				);

				System.out.println("Revision created -> " + page.getPath());

			}

		} catch (Exception e) {

			e.printStackTrace();

		}

	}

}
