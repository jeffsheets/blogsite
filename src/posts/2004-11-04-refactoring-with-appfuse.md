---
layout: post
title: Refactoring with Appfuse
date: '2004-11-04T22:16:00.000-06:00'
author: Jeff Sheets
tags:
modified_time: '2004-11-04T22:21:01.866-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-109962817693032799
permalink: 2004/11/refactoring-with-appfuse.html
---

<a
      href="http://raibledesigns.com/wiki/Wiki.jsp?page=AppFuse">Appfuse</a> is starting a
      small revolution on the projects that I work with. Through Appfuse [<a
      href="http://today.java.net/pub/a/today/2004/07/15/thefuse.html">article</a>] I have
      been able to easily brief co-developers and architect types on the latest open source ideas in
      J2EE. You see, the projects I have worked on are "big enterprise" J2EE - Weblogic types, and
      it is hard to sell these people on new ideas. So, slowly we can implement <a
      href="http://www.martinfowler.com/articles/newMethodology.html">Agile</a> ideas and
      methods into the archaic processes and development that exists. <a
      href="http://xdoclet.sf.net/">Xdoclet</a> was one of the first to make it in.
      <br />
      <br />Lately it has been simple things like showing <a
      href="http://cvshome.org/">CVS</a> can replace much more expensive CM repositories.
      Then throwing in ideas like <a
      href="http://www.badgers-in-foil.co.uk/projects/cvsspam/">CVSSpam</a>. I'm also
      trying a <a href="http://www.jspwiki.org/">JSPWiki</a> and <a
      href="http://rollerweblogger.org/page/project">Roller Weblogger</a>, but that seems
      to be catching on much slower than I had hoped (although using Matt's professional looking
      <a href="http://www.raibledesigns.com/wiki/templates/redman.tar.gz">redman
      theme</a> has helped!).
      <br />
      <br />My next step is <a href="http://cruisecontrol.sourceforge.net/">Cruise
      Control</a>. After a brief comparison with <a
      href="http://www.urbancode.com/projects/anthill/default.jsp">Anthill</a>, it looks
      like CC will be our <a
      href="http://www.martinfowler.com/articles/continuousIntegration.html">Continuous</a>
      <a
      href="http://www.clarkware.com/cgi/blosxom/2004/10/19#TheyNeedABuildMachine">Integration</a>
      approach. (Of course both with help from appfuse - <a
      href="http://raibledesigns.com/wiki/Wiki.jsp?page=AppFuseCruiseControl">CC</a> -
      <a href="http://raibledesigns.com/wiki/Wiki.jsp?page=AppFuseAnthill">anthill</a>).
      <br />
      <br />All of this because of Appfuse! A big thanks to <a
      href="http://raibledesigns.com/">Matt Raible</a> for being open with his experiences
      and sharing the code behind his project. This has made new concepts easier to integrate with
      our old project, through the clean organization of his ideas.
      <br />
      <br />After Continuous Integration comes an even harder sell, which may seem easy to
      many of you agile veterans. The sell of test-driven coding and writing unit tests for all of
      our code (as I have <a
      href="http://uncommentedbytes.blogspot.com/2004/09/driven-by-tests-hopefully.html">mentioned</a>
      <a
      href="http://uncommentedbytes.blogspot.com/2004/06/ant-junit-task-mishandles-suites.html">before</a>).
      <a href="http://www.junit.org/">JUnit</a>, <a
      href="http://dbunit.sourceforge.net/">DBUnit</a>, <a
      href="http://jakarta.apache.org/cactus/">Cactus</a>, <a
      href="http://strutstestcase.sourceforge.net/">StrutsTestCase</a>, <a
      href="http://jwebunit.sourceforge.net/">JwebUnit</a>, <a
      href="http://webtest.canoo.com/">Canoo Webtest</a>, here we come!
      <br />
      <br />(This leaves <a href="http://www.hibernate.org/">Hibernate</a> and
      <a href="http://ibatis.com/">iBatis</a> to conquer CMP on another day...)