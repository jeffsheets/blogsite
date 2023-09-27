---
layout: post
title: Spock 1.2 Annotations for Spring Integration Testing
date: '2018-06-14T21:49:00.001-05:00'
author: Jeff Sheets
tags:
- Groovy
- Spring
- Spock
modified_time: '2021-01-25T17:33:09.683-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-4423811747377469353
permalink: 2018/06/spock-12-annotations-for-spring.html
---

<p>&nbsp;</p><p>@SpringBean, @SpringSpy, and
      @UnwrapAopProxy are new annotations in <a
      href="https://github.com/spockframework/spock/blob/master/docs/module_spring.adoc">Spock
      1.2</a> that make it easier to inject mocks into the Spring context when doing
      Integration testing. These can greatly simplify your code from using a @TestConfiguration
      approach, though there are some drawbacks too. If you're not familiar with the Spock 1.1
      @TestConfiguration method, take a look at the <a
      href="https://objectpartners.com/2017/04/18/spring-integration-testing-with-spock-mocks/">original
      Spock Spring Integration blog post</a> from <a
      href="https://twitter.com/snekse">Derek Eskens</a>.</p>
      <h3>@SpringBean</h3>
      <p>Let's start with the easiest new annotation @SpringBean. This annotation will tell
      Spock to add the mocked bean into the Spring test context. To use it you will need to
      explicitly create the Mock() and include a defined type (instead of using `def`)<br
      /><script
      src="https://gist.github.com/jeffsheets/558a9194d1e2cc2caac432f6d5b2b630.js?file=PersonControllerIntSpock12Spec.groovy"></script></p>
      <h3>@SpringSpy</h3>
      <p>Similarly, @SpringSpy will wrap a Spy around the bean that Spring creates and puts
      into the context. For most cases it is simple to just use @SpringSpy in place of
      @SpringBean.</p>
      <p>It becomes more complicated when trying to Spy a Spring AOP Proxied bean. @Validated
      services are one type of proxied object, as Spring wraps the class to perform the
      validation.<br /><script
      src="https://gist.github.com/jeffsheets/558a9194d1e2cc2caac432f6d5b2b630.js?file=ValidatedExternalRankingService.groovy"></script></p>
      <p>Without <a href="https://stackoverflow.com/a/48197950/1469525">unwrapping the
      AOP proxy</a>, the error you see in Spock will be very puzzling:<br /><script
      src="https://gist.github.com/jeffsheets/558a9194d1e2cc2caac432f6d5b2b630.js?file=spockSpringWrappedProxyError.txt"></script></p>
      <h3>@UnwrapAopProxy</h3>
      <p>@UnwrapAopProxy is a new Spock 1.2 annotation for easily unwrapping the proxy to use
      the spied object.<br /><script
      src="https://gist.github.com/jeffsheets/558a9194d1e2cc2caac432f6d5b2b630.js?file=PersonControllerIntSpock12ProxiedSpec.groovy"></script></p>
      <p>While @SpringBean and @SpringSpy make it very easy to Integration Test, the one
      drawback is that Spring will create a new test context for each test and will not try to cache
      and reuse the context between tests. So for very large applications with many tests this can
      be quite slow. In those cases you will still need to resort to using a reusable
      @TestConfiguration class.</p>
      <h3>Manual AOP Proxy unwrapping</h3>
      <p>In those cases, you will need to manually unwrap the AOP proxy for spying. This can
      be done using AopTestUtils.getUltimateTargetObject() from the spring-test package:<br
      /><script
      src="https://gist.github.com/jeffsheets/558a9194d1e2cc2caac432f6d5b2b630.js?file=PersonControllerIntProxiedSpec.groovy"></script></p>
      <h3>Spock 1.2-SNAPSHOT</h3>
      <p>As of this blog post writing in May 2018, Spock 1.2 is still a SNAPSHOT and has not
      been fully released yet. So to pull in the snapshot you'll need to use the snapshot repo in
      your gradle (or maven) file<br /><script
      src="https://gist.github.com/jeffsheets/558a9194d1e2cc2caac432f6d5b2b630.js?file=build.gradle"></script></p>
      <p>Hopefully this was a helpful intro to the new annotations available in Spock 1.2. You
      can try them out in a full source repo with tests by cloning the <a
      href="https://github.com/jeffsheets/spring-spock-integration-testing/tree/feat/mockSpringCglibProxyValidated">github
      repo
      https://github.com/jeffsheets/spring-spock-integration-testing/tree/feat/mockSpringCglibProxyValidated</a>.</p><p><b>Cross-published
      on the Object Partners blog:&nbsp; </b><a
      href="https://objectpartners.com/2018/06/14/spock-1-2-annotations-for-spring-integration-testing/">https://objectpartners.com/2018/06/14/spock-1-2-annotations-for-spring-integration-testing/</a><br
      /></p>