---
layout: post
title: Logical GWT client testing with Spock
date: '2018-05-02T21:45:00.001-05:00'
author: Jeff Sheets
tags:
- GWT
- Spock
modified_time: '2021-01-25T17:33:24.074-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-3071237818611116756
permalink: 2018/05/logical-gwt-client-testing-with-spock.html
---

<p>&nbsp;</p><p>GWT - <a
      href="http://www.gwtproject.org/">Google Web Toolkit</a> may not be as heavily used
      as it once was 5-10 years ago, though many enterprise teams and legacy projects are still
      using the technology. While we can easily use <a
      href="http://spockframework.org/">Spock</a> to test our other Java and Groovy
      projects, and even to test some parts of GWT, the client-side portion of GWT that executes
      native Javascript is not quite so simple.</p>
      <p>The GWT project does provide <a
      href="http://www.gwtproject.org/doc/latest/tutorial/JUnit.html">testing patterns</a>
      for unit and integration tests, however they are a bit cumbersome to work with. The framework
      supplied option is to extend <a
      href="http://www.gwtproject.org/doc/latest/DevGuideTesting.html">GWTTestCase</a>
      which runs the test in an HtmlUnit headless browser, a valid but slow procedure.</p>
      <p>Another nice option is to use <a
      href="https://github.com/google/gwtmockito">GwtMockito</a> which provides Mockito
      mocks for the core client-side GWT classes. This works great if you stay in a JUnit + Mockito
      world. But what if we would like to use Spock? It's only logical.</p>
      <p>Replicating <a
      href="https://github.com/google/gwtmockito/blob/master/gwtmockito/src/main/java/com/google/gwtmockito/GwtMockitoTestRunner.java">all
      of the inner classes</a> that are mocked out by GwtMockito would be a great thing to
      have for Spock, but unfortunately is not currently available. Also duplicating this effort
      seems inefficient for a project on its last legs.</p>
      <p>The solution provided here leverages the goodness of using GwtMockito from within
      Spock (as opposed to JUnit). And really, it is fairly simple to use this pattern:</p>
      <p>1) Setup Mocks, and Initialize GwtMockito.<br />- This involves normal Spock
      mocks for any services used by the file under test.<br />- GwtMockito initialization
      <a
      href="https://github.com/google/gwtmockito#support-for-junit-3-and-other-tests-that-cant-use-custom-runners">follows
      the pattern for usage</a> outside of a JUnit test runner<br />- We also
      instantiate our class under test, the GwtSpockWidget, but wrapping it as a Spy<br
      /><script
      src="https://gist.github.com/jeffsheets/02b3d77293c8f8419c0b31b47b627676.js?file=GwtSpockWidgetSpec.z1setup.groovy"></script></p>
      <p>2) Spock Spy wrapper<br />- The Spock Spy wrapper shown above requires usage of
      an as-of-this-date(2018-04-30) unpublished version of Spock 1.2<br />- It uses <a
      href="https://github.com/spockframework/spock/issues/769">a fix to allow spying</a>
      instantiated objects that lack an empty constructor<br />- Grab it from the snapshot
      repo like this:<br /><script
      src="https://gist.github.com/jeffsheets/02b3d77293c8f8419c0b31b47b627676.js?file=GwtSpockWidgetSpec.z5build.gradle"></script></p>
      <p>3) Simple test of @UIField element<br />- GwtMockito auto mocks the @UIField
      elements with Mockito mocks. As such, we need to verify them Mockito-style as seen on Line 16
      below:<br /><script
      src="https://gist.github.com/jeffsheets/02b3d77293c8f8419c0b31b47b627676.js?file=GwtSpockWidgetSpec.z3mockito.groovy"></script></p>
      <p>4) Test object under test with Spock Spy<br />- To verify that an action takes
      place somewhere else in the widget, we can easily validate an internal call through the
      Spy:<br /><script
      src="https://gist.github.com/jeffsheets/02b3d77293c8f8419c0b31b47b627676.js?file=GwtSpockWidgetSpec.z4spy.groovy"></script></p>
      <p>This was just a quick run-thru to get you started on "modern" GWT client testing with
      Spock and GwtMockito. It is much faster than spinning up the default GWTTestCase container,
      you don't have to stumble through JUnit assertions, and best of all it uses Spock.
      Precisely.</p>
      <p><a
      href="https://gist.github.com/jeffsheets/02b3d77293c8f8419c0b31b47b627676">Full test
      source</a>:<br /><script
      src="https://gist.github.com/jeffsheets/02b3d77293c8f8419c0b31b47b627676.js?file=GwtSpockWidgetSpec.groovy"></script></p><p><b>Cross-published
      on the Object Partners blog:&nbsp; </b><a
      href="https://objectpartners.com/2018/05/02/logical-gwt-client-testing-with-spock/">https://objectpartners.com/2018/05/02/logical-gwt-client-testing-with-spock/</a><br
      /></p>