---
layout: post
title: Rollback Multiple Datasources in Grails Integration Tests
date: '2013-09-24T20:39:00.006-05:00'
author: Jeff Sheets
tags:
modified_time: '2020-11-29T20:42:13.333-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-3604386565814017605
permalink: 2013/09/rollback-multiple-datasources-in-grails.html
---

<p>&nbsp;</p><p>Grails GORM has solid support for
      using multiple datasources in both 1.3.x with the <a
      href="http://grails.org/plugin/datasources">Datasources plugin</a>, and 2.x with
      built-in <a
      href="http://grails.org/doc/2.3.x/guide/conf.html#multipleDatasources">multi-datasource
      support</a>. This feature allows you to partition your Domain classes and Services to
      attach to two or more databases. One pitfall you'll encounter though, is that Integration
      Tests of the secondary datasources DO NOT rollback their transactions on versions of Grails
      &lt; 2.3 (<a
      href="http://jira.grails.org/browse/GRAILS-9771">GRAILS-9771</a>). However, we can
      borrow the approach from <a
      href="https://github.com/grails/grails-core/commit/90df8dc232645397aa570ac1d9435c221890c169#diff-0">the
      2.3 patch</a> to fix our pre 2.3 test classes!</p>
      <p>The approach is simply to add rollback steps for the autowired transactionManager in
      the JUnit test setUp() and tearDown() methods (or Spock setup() and cleanup()). In this
      example I have a datasource named "db2" so the injected name of the bean is
      transactionManager_db2. The test then gets a reference to the transactionStatus in setUp() and
      rolls it back in tearDown(). (Note: this code was written for a Grails 1.3 app but should also
      work in 2.x)<br /><script
      src="https://gist.github.com/jeffsheets/6168245.js?file=GrailsMultipleDatasourcesWithRollbackIntTests.groovy"></script></p>
      <p>Of course the downfall of this approach is that you must remember to setup each test
      class for a non-default datasource (or use a base test class hierarchy). But this code is
      essential for integration testing your secondary databases until the app has been migrated to
      Grails 2.3!</p>
      <p>As a reference, here is the configuration I was using for the Datasources plugin in
      Grails 1.3:<br /><script
      src="https://gist.github.com/jeffsheets/6168245.js?file=Datasources.groovy"></script></p><p><b>Cross-published
      on the Object Partners blog:&nbsp; </b><a
      href="https://objectpartners.com/2013/09/24/rollback-multiple-datasources-in-grails-integration-tests/">https://objectpartners.com/2013/09/24/rollback-multiple-datasources-in-grails-integration-tests/</a><br
      /></p>