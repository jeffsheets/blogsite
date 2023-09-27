---
layout: post
title: Ant Junit Task mishandles Suites
date: '2004-06-29T12:15:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2004-06-29T12:17:33.506-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-108852931885785198
permalink: 2004/06/ant-junit-task-mishandles-suites.html
---

Maybe I'm missing something, but the Ant <a
      href="http://ant.apache.org/manual/OptionalTasks/junit.html">Junit task</a> doesn't
      seem to handle Suites well. What I mean is that the formatters supplied with the base Junit
      task, when outputting information about a suite, don't spit out details about the class that a
      test was in. So <junitreport> can't even display this information in the html.
      <br />
      <br />For instance if I had two tests, one in TestClass1 and another in TestClass2 named
      testMyMethod() and run from the suite AllTests, the output from <junit> not distinguish
      between the two tests.
      <br />
      <br />The "work around" is to use the <batchtest> nested element and specify a:
      <br />&lt;fileset includes="**/*.class" excludes="**/AllTests.class" /&gt;
      <br />However, this runs slower than using test suites.
      <br />
      <br />I did see that in 1.6.2 there will be a new option to fork a single JVM instead of
      one for each class, but even then this could run faster through test suites.
      <br />
      <br />So for now I have added a vote to <a
      href="http://issues.apache.org/bugzilla/show_bug.cgi?id=24106">bug #24106</a>. I
      encourage anyone else that is annoyed by this to do the same!