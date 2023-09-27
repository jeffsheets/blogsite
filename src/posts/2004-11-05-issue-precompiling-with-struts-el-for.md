---
layout: post
title: 'Issue: Precompiling with Struts-EL for Weblogic'
date: '2004-11-05T13:29:00.000-06:00'
author: Jeff Sheets
tags:
modified_time: '2005-10-13T15:24:58.346-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-109968298159654318
permalink: 2004/11/issue-precompiling-with-struts-el-for.html
---

<blockquote>Edit 10/13/2005: Apparently BEA has a workaround, and it
      is <a
      href="http://support.bea.com/application?namespace=askbea&origin=ask_bea_answer.jsp&event=link.view_answer_page_solution&answerpage=solution&page=wls/S-24862.htm">fixed
      in Service Pack 4</a>! </blockquote><br /><br />For some reason the
      wlappc task of weblogic blows up when trying to precompile an war that uses the Struts-EL jar.
      This works fine with only the struts.jar so something is up with the struts-el.jar. Has anyone
      else seen this problem?<br /><br />I've found a post about this in the <a
      href="http://forums.bea.com/bea/thread.jspa?threadID=200037594&amp;tstart=0">BEA
      dev2dev Forums</a>. As well as a post on the <a
      href="http://www.mail-archive.com/struts-user@jakarta.apache.org/msg75109.html">struts
      mailing list</a>. So it would appear that this is a global issue between the
      struts-el.jar and the wlappc weblogic precompiling ant task.<br /><br />Here is
      the exception that is received, that seems to point to a MessageResources issue:<br
      /><code>java.lang.ExceptionInInitializerError<br /> at
      java.lang.Class.forName0(Native Method)<br /> at
      java.lang.Class.forName(Class.java:141)<br /> at
      org.apache.strutsel.taglib.html.ELBaseTagBeanInfo.class$(ELBaseTagBea<br
      />nInfo.java:81)<br /> at
      org.apache.strutsel.taglib.html.ELBaseTagBeanInfo.getPropertyDescript<br
      />ors(ELBaseTagBeanInfo.java:81)<br /> at
      java.beans.Introspector.getTargetPropertyInfo(Introspector.java:459)<br /> at
      java.beans.Introspector.getBeanInfo(Introspector.java:372)<br /> at
      java.beans.Introspector.getBeanInfo(Introspector.java:207)<br /> at
      java.beans.Introspector.getBeanInfo(Introspector.java:193)<br /> at
      weblogic.servlet.jsp.StandardTagLib.parseTagDD(StandardTagLib.java:13<br />23)<br
      /> at weblogic.servlet.jsp.StandardTagLib.parseDD(StandardTagLib.java:1261)<br
      /><br /> at
      weblogic.servlet.jsp.StandardTagLib.<init>(StandardTagLib.java:292)<br /> at
      weblogic.servlet.jsp.TagLibHelper.loadTagLib(TagLibHelper.java:314)<br /> at
      weblogic.servlet.jsp.JspLexer.loadTagLib(JspLexer.java:145)<br /> at
      weblogic.servlet.jsp.JspLexer.mTAGLIB_DIRECTIVE_BODY(JspLexer.java:50<br />15)<br
      /> at weblogic.servlet.jsp.JspLexer.mTAGLIB_DIRECTIVE(JspLexer.java:4853)<br /> at
      weblogic.servlet.jsp.JspLexer.mDIRECTIVE(JspLexer.java:4699)<br /> at
      weblogic.servlet.jsp.JspLexer.mSTANDARD_THING(JspLexer.java:2094)<br /> at
      weblogic.servlet.jsp.JspLexer.mTOKEN(JspLexer.java:1880)<br /> at
      weblogic.servlet.jsp.JspLexer.nextToken(JspLexer.java:1753)<br /> at
      weblogic.servlet.jsp.JspLexer.parse(JspLexer.java:963)<br /> at
      weblogic.servlet.jsp.JspParser.doit(JspParser.java:106)<br /> at
      weblogic.servlet.jsp.JspParser.parse(JspParser.java:230)<br /> at
      weblogic.servlet.jsp.Jsp2Java.outputs(Jsp2Java.java:125)<br /> at
      weblogic.utils.compiler.CodeGenerator.generate(CodeGenerator.java:258<br />)<br />
      at weblogic.jspc.runJspc(jspc.java:550)<br /> at
      weblogic.jspc.runJspc(jspc.java:437)<br /> at
      weblogic.servlet.jsp.JspcInvoker.compile(JspcInvoker.java:163)<br /> at
      weblogic.appc.compileWAR(appc.java:859)<br /> at
      weblogic.appc.compileModules(appc.java:650)<br /> at
      weblogic.appc.compileEAR(appc.java:733)<br /> at
      weblogic.appc.compileInput(appc.java:458)<br /> at
      weblogic.appc.runBody(appc.java:184)<br /> at
      weblogic.utils.compiler.Tool.run(Tool.java:146)<br /> at
      weblogic.utils.compiler.Tool.run(Tool.java:103)<br /> at
      weblogic.appc.main(appc.java:1028)<br /> at
      sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)<br /> at
      sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.<br
      />java:39)<br /> at
      sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAcces<br
      />sorImpl.java:25)<br /> at java.lang.reflect.Method.invoke(Method.java:324)<br
      /> at weblogic.ant.taskdefs.j2ee.CompilerTask.invokeMain(CompilerTask.java:<br
      />278)<br /> at weblogic.ant.taskdefs.j2ee.Appc.execute(Appc.java:179)<br /> at
      org.apache.tools.ant.UnknownElement.execute(UnknownElement.java:193)<br /> at
      org.apache.tools.ant.Task.perform(Task.java:341)<br /> at
      org.apache.tools.ant.Target.execute(Target.java:309)<br /> at
      org.apache.tools.ant.Target.performTasks(Target.java:336)<br /> at
      org.apache.tools.ant.Project.executeTarget(Project.java:1339)<br /> at
      org.apache.tools.ant.Project.executeTargets(Project.java:1255)<br /> at
      org.apache.tools.ant.Main.runBuild(Main.java:609)<br /> at
      org.apache.tools.ant.Main.start(Main.java:196)<br /> at
      org.apache.tools.ant.Main.main(Main.java:235)<br />Caused by:
      java.lang.NullPointerException<br /> at
      org.apache.struts.util.MessageResources.getMessageResources(MessageRe<br
      />sources.java:577)<br /> at
      org.apache.struts.taglib.html.BaseTag.<clinit>(BaseTag.java:94)<br /> ... 50
      more<br /> - with nested exception:<br
      />[java.lang.ExceptionInInitializerError]</code>