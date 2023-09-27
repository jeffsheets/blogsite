---
layout: post
title: Weblogic EJB Compiler Options
date: '2004-08-11T11:23:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2004-08-11T11:34:29.743-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-109224139346884245
permalink: 2004/08/weblogic-ejb-compiler-options.html
---

We fixed a problem today by setting options for the Weblogic EJB compiler
      that is used to compile EJBs on the server at deploy time. Of course we should be using WL
      <a href="http://e-docs.bea.com/wls/docs81/ejb/appc_ejbc.html">appc</a>, but even
      then we'll probably need to use the same options.
      <br />
      <br />Now I need a nice wiki to document these myself, but without one I'll simply post
      it here.
      <br />
      <br /><h3>The Problem</h3>
      <br />When deploying many large EJBs to Weblogic, without pre-compiling with WL appc,
      you may find the deploy failing when the server attempts to compile the EJBs. A search through
      the logs will reveal some Out of Memory errors.
      <br />
      <br /><h3>The Fix</h3>
      <br />* Open the Weblogic server console (usually http://localhost:7001/console/)
      <br />* Expand Servers and click on your server name (defaults to myserver)
      <br />* Under Configuration|General expand Advanced Options
      <br />* Set the following to increase JVM heap size for the compiler:
      <br /> <b>Extra EJB Compiler Options:</b> <code>-J-ms128m
      -J-mx256m</code>
      <br /> of course modify for your own needs
      <br />