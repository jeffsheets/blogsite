---
layout: post
title: Using Eclipse for C++ with GLUT on Windows
date: '2008-01-27T06:34:00.000-06:00'
author: Jeff Sheets
tags:
modified_time: '2008-01-27T07:04:25.888-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-8307390867412962783
permalink: 2008/01/using-eclipse-for-c-with-glut-on.html
---

For my latest grad school class at <a
      href="http://www.unomaha.edu/">UNO</a>, cs8626 Computer Graphics (yeah, its an easy
      elective for this semester), I need to develop some code using OpenGL. In my 10 years as a
      Java web app developer I haven't had any need for OpenGL before now, so my knowledge of it is
      around "beginner" to "sounds like something cool to learn". I can get by with C/C++/Make and
      the like, but until now I've either used A) Visual Studio back in college, B) a random linux
      box, or C) Cygwin to do any of my coding. But since I use Eclipse for my Java coding I thought
      I would tryout the C++ support that it offers on this Windows XP machine.<br /><br
      />And, of course, it is <a
      href="http://uncommentedbytes.blogspot.com/2004/11/i-agree-eclipse-website-sux.html">next
      to impossible</a> to navigate and deduce the steps needed to set this all up from the
      <a href="http://www.eclipse.org/cdt/">Eclipse</a> website and <a
      href="http://wiki.eclipse.org/CDT/User/FAQ">wiki</a> <a
      href="http://eclipsewiki.editme.com/CDT">pages</a>.<br /><br
      />Thankfully, after only a few hours and random searches, I found Paul Solt's <span
      style="font-size:100%;"><a
      href="http://www.ritgamedev.com/tutorials/glutEclipse/">GLUT Setup Tutorial with Eclipse
      CDT on Windows</a>. It goes step by step to get everything installed and running. Note:
      before finding Paul's page, I had already gone through Brian Lee's <a
      href="http://www.cs.umanitoba.ca/%7Eeclipse/7-EclipseCDT.pdf">steps to install</a>
      <a href="http://www.mingw.org/">MinGW</a>, and I couldn't get to the Max Berger
      page that Paul links to; so your results to his step #2 may vary. MinGW is a simple way to
      install the g++ compiler and its dependencies without using cygwin.<br /><br />I'm
      all setup with my first GLUT hello world app for my first assignment now. Hopefully this post
      will help someone else do the same in the future.<br /></span>