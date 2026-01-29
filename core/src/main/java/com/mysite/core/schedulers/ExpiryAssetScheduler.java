package com.mysite.core.schedulers;

import java.util.Collections;

import org.apache.sling.event.jobs.JobManager;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Designate(ocd = ExpiryAssetScheduler.Config.class)
@Component(service = Runnable.class, configurationPolicy = ConfigurationPolicy.REQUIRE)
public class ExpiryAssetScheduler implements Runnable {

	@Reference
	private JobManager jobManager;

	private final Logger LOG = LoggerFactory.getLogger(ExpiryAssetScheduler.class);

	private volatile boolean enabled;
	
	@Activate
	@Modified
	protected void activate(Config config) {
		this.enabled = config.scheduler_enabled();
		LOG.info("Expired Asset Scheduler activated. Cron = {}", config.scheduler_expression());
	}

	@Override
	public void run() {
		if (!enabled) {
			LOG.debug("Expired Asset Scheduler is disabled. Skipping execution.");
			return;
		}

		LOG.info("Expired Asset Scheduler triggered");
		jobManager.addJob("dam/expiry/job", Collections.emptyMap());
	}
	
	@ObjectClassDefinition(name = "MySite – Expired Asset Scheduler", description = "Scans DAM and tags expired assets")
	public static @interface Config {
		@AttributeDefinition(name = "Cron Expression", description = "Scheduler cron expression")
		String scheduler_expression() default "0 */5 * * * ?";

		@AttributeDefinition(name = "Enable Scheduler", description = "Enable or disable expired asset scheduler")
		boolean scheduler_enabled() default true;
	}

}
