---
layout: post
title: Proxy Breaks Weblogic Web Service Testing
date: '2004-07-01T11:06:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2004-07-01T11:12:41.213-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-108869800251713194
permalink: 2004/07/proxy-breaks-weblogic-web-service.html
---

A peculiar error came up while trying to test my weblogic web service. BEA
      provides a test page for web services that you can use in development. So I went to the page
      to test my ProofOfConceptService (brilliant name, huh?). I received this error:
      <br /><div
      style="font-size:10px;font-family:tahoma,arial">weblogic.webservice.tools.wsdlp.WSDLParseException:
      Failed to retrieve WSDL from http://localhost:80/jetspeed/ProofOfConceptService?WSDL. Please
      check the URL and make sure that it is a valid XML file [java.io.FileNotFoundException:
      Response: '403: Forbidden' for url: 'http://localhost:80/jetspeed/ProofOfConceptService?WSDL']
      at
      weblogic.webservice.tools.wsdlp.DefinitionFactory.createDefinition(DefinitionFactory.java:126)
      at weblogic.webservice.tools.wsdlp.WSDLParser.(WSDLParser.java:76) at
      weblogic.webservice.WebServiceFactory.createFromWSDL(WebServiceFactory.java:108) at
      weblogic.webservice.WebServiceFactory.createFromWSDL(WebServiceFactory.java:84) at
      weblogic.webservice.server.servlet.ServletBase.invokeOperation(ServletBase.java:295) at
      weblogic.webservice.server.servlet.WebServiceServlet.invokeOperation(WebServiceServlet.java:344)
      at weblogic.webservice.server.servlet.ServletBase.handleGet(ServletBase.java:266) at
      weblogic.webservice.server.servlet.ServletBase.doGet(ServletBase.java:158) at
      weblogic.webservice.server.servlet.WebServiceServlet.doGet(WebServiceServlet.java:255) at
      javax.servlet.http.HttpServlet.service(HttpServlet.java:740) at
      javax.servlet.http.HttpServlet.service(HttpServlet.java:853) at
      weblogic.servlet.internal.ServletStubImpl$ServletInvocationAction.run(ServletStubImpl.java:971)
      at weblogic.servlet.internal.ServletStubImpl.invokeServlet(ServletStubImpl.java:402) at
      weblogic.servlet.internal.ServletStubImpl.invokeServlet(ServletStubImpl.java:305) at
      weblogic.servlet.internal.WebAppServletContext$ServletInvocationAction.run(WebAppServletContext.java:6350)
      at weblogic.security.acl.internal.AuthenticatedSubject.doAs(AuthenticatedSubject.java:317) at
      weblogic.security.service.SecurityManager.runAs(SecurityManager.java:118) at
      weblogic.servlet.internal.WebAppServletContext.invokeServlet(WebAppServletContext.java:3635)
      at weblogic.servlet.internal.ServletRequestImpl.execute(ServletRequestImpl.java:2585) at
      weblogic.kernel.ExecuteThread.execute(ExecuteThread.java:197) at
      weblogic.kernel.ExecuteThread.run(ExecuteThread.java:170)
      <br /></div>
      <br />Immediately I keyed in on the "403: Forbidden". So how can I be forbidden to
      access my localhost? After cruising google and bea newsgroups I only found 1 mention of this
      and 0 fixes. Then I thought of the line I added to my startup script that adds our proxy
      configuration to the JVM:
      <br /><div style="font-size:10px;font-family:tahoma,arial">-DproxySet=true
      -DproxyHost=ourproxy.server.com -DproxyPort=80</div>
      <br />This allows our Jetspeed portal to pull in web feeds through our firewall. Turns
      out that when I removed this the test went fine. It appears the JVM attempts to use the proxy
      even when I'm accessing the localhost. I guess there's no way around this than to remove the
      proxy setup line everytime I want to test a local web service. Unless someone knows of a way
      to tell a JVM to ignore a proxy for certain hosts?