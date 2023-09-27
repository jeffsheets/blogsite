---
layout: post
title: Configuring Quartz 2 with Spring in clustered mode
date: '2013-07-09T20:32:00.001-05:00'
author: Jeff Sheets
tags:
modified_time: '2020-11-29T20:39:08.418-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-7041595517625565991
permalink: 2013/07/configuring-quartz-2-with-spring-in.html
---

<p>&nbsp;</p><p>Aligning the stars to configure
      Quartz 2.1.7 to work with Spring 3.1.3 in a cluster was surprisingly complicated. The main
      idea is to run jobs to fire only once per cluster, not once per server, while still providing
      beans from the Spring managed context and using the latest version of Quartz. The
      documentation consists essentially of a number of <a
      href="http://sloanseaman.com/wordpress/2011/06/06/spring-and-quartz-and-persistence/">blog
      posts</a> and stackoverflow answers. So here is one final and (hopefully) more
      comprehensive summary of the process.</p>
      <p>For the TL;DR version, just see <a
      href="https://gist.github.com/jeffsheets/5862630">the full github gist</a>.</p>
      <p>In Quartz.properties we'll want to set useProperties=true so that data persisted to
      the DB is in String form instead of Serialized Java objects. But unfortunately the Spring
      3.1.x CronTriggerFactoryBean sets a jobDetails property as a Java object, so Quartz will
      complain that the data is not a String. We'll need to create our own
      PersistableCronTriggerFactoryBean to get around this issue (similar to <a
      href="http://site.trimplement.com/using-spring-and-quartz-with-jobstore-properties/">this
      blog post</a> and <a
      href="http://forum.springsource.org/showthread.php?130984-Quartz-error-IOException">forum
      discussion</a>).<br />
      <script
      src="https://gist.github.com/jeffsheets/5862630.js?file=PersistableCronTriggerFactoryBean.java"></script><br
      /><script
      src="https://gist.github.com/jeffsheets/5862630.js?file=quartz.properties"></script></p>
      <p>Additionally, in our Spring config the SchedulerFactoryBean will need to set both the
      <a
      href="http://stackoverflow.com/questions/1187882/quartz-jobstore-with-spring-framework/1188471#1188471">triggers
      and the jobDetails objects</a>. We also setup the scheduler to use Spring's dataSource
      and transactionManager. And notice that durability=true must be set on each
      JobDetailFactoryBean.<br /><script
      src="https://gist.github.com/jeffsheets/5862630.js?file=quartzJobsConfig.xml"></script></p>
      <p>By default you cannot use Autowired capabilities in the Quartz Jobs, but this can be
      easily setup with a <a
      href="http://stackoverflow.com/questions/6990767/inject-bean-reference-into-a-quartz-job-in-spring/15211030#15211030">AutowiringSpringBeanJobFactory</a>.<br
      /><script
      src="https://gist.github.com/jeffsheets/5862630.js?file=AutowiringSpringBeanJobFactory.java"></script></p>
      <p>You'll also notice that we cannot use <a
      href="http://static.springsource.org/spring/docs/3.1.x/javadoc-api/org/springframework/scheduling/quartz/MethodInvokingJobDetailFactoryBean.html">MethodInvokingJobDetailFactoryBean</a>
      because it is not serializable, so we need to create our own Job class that extends
      QuartzJobBean. If your services are secured by Acegi or Spring Security, you will also need to
      register an authenticated quartzUser object with the security context.<br /><script
      src="https://gist.github.com/jeffsheets/5862630.js?file=FirstJob.java"></script></p>
      <p>And finally, we'll want to test that the trigger's Cron expression actually fires
      when we want it to. Here is an example test case that pulls the cronExpression from
      configuration and tests that it fires correctly on 2 consecutive days:<br /><script
      src="https://gist.github.com/jeffsheets/5862630.js?file=QuartzCronTriggerTest.java"></script></p>
      <p>Hopefully this helps others in configuring an enterprise-ready Quartz + Spring
      application to run jobs in a clustered server
      environment.</p><p><b>Cross-published on the Object Partners blog:
      </b><a
      href="https://objectpartners.com/2013/07/09/configuring-quartz-2-with-spring-in-clustered-mode/">https://objectpartners.com/2013/07/09/configuring-quartz-2-with-spring-in-clustered-mode/</a>
      <br /></p>