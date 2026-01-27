package com.mysite.core.workflow;

import java.text.Normalizer;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;

@Component(service = WorkflowProcess.class, property = { "process.label  = Update Business Metadata" })

public class UpdateBusinessMetadataProcess implements WorkflowProcess {

	private static final Pattern NON_ALPHANUM = Pattern.compile("[^a-zA-Z0-9-_ ]");

	@Override
	public void execute(WorkItem item, WorkflowSession session, MetaDataMap args) throws WorkflowException {
		ResourceResolver resolver = session.adaptTo(ResourceResolver.class);
		Resource asset = resolver.getResource(item.getWorkflowData().getPayload().toString());

		String assetName = asset.getName();
		ModifiableValueMap meta = asset.getChild("jcr:content/metadata").adaptTo(ModifiableValueMap.class);

		normalizeTitle(meta, assetName);

		meta.put("auditStatus", "pending-review");
		
		try {
			resolver.commit();
		} catch (PersistenceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private void normalizeTitle(ModifiableValueMap metadata, String assetName) {

		if (metadata == null) {
			return;
		}

		// Existing values
		String title = metadata.get("dc:title", String.class);
		String description = metadata.get("dc:description", String.class);
		

		// Step 1: Title fallback
		if (StringUtils.isBlank(title)) {
			title = deriveTitleFromFilename(assetName);
		}
		
		

		// Step 2: Normalize title
		title = normalizeText(title);
		metadata.put("dc:title", title);

		// Step 3: Description fallback
		if (StringUtils.isBlank(description)) {
			metadata.put("dc:description", title);
		}
	}

	/**
	 * Derives a readable title from file name. Example: IMG_20250112-final_v2.jpg →
	 * IMG 20250112 final v2
	 */
	private static String deriveTitleFromFilename(String fileName) {
		if (StringUtils.isBlank(fileName)) {
			return "Untitled Asset";
		}

		int dot = fileName.lastIndexOf('.');
        fileName = dot > 0 ? fileName.substring(0, dot) : fileName;

		// Replace separators with space
		fileName = fileName.replace("_", " ").replace("-", " ");

		return normalizeText(fileName);
	}

	/**
	 * Normalizes text by: - Unicode normalization - Removing special characters -
	 * Trimming spaces
	 */
	private static String normalizeText(String input) {
		if (StringUtils.isBlank(input)) {
			return input;
		}

		// Normalize unicode
		String normalized = Normalizer.normalize(input, Normalizer.Form.NFKC);

		// Remove special characters
		normalized = NON_ALPHANUM.matcher(normalized).replaceAll("");

		// Normalize spaces
		normalized = normalized.replaceAll("\\s+", " ").trim();

		return normalized;
	}
}
