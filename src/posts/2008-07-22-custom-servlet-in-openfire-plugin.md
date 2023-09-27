---
layout: post
title: Custom servlet in Openfire plugin
date: '2008-07-22T13:16:00.001-05:00'
author: Jeff Sheets
tags:
modified_time: '2008-07-22T13:18:21.175-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-2790776316907035189
permalink: 2008/07/custom-servlet-in-openfire-plugin.html
---

I've been working on creating a plugin for our <a
      href="http://www.igniterealtime.org/projects/openfire/">Openfire</a> server, which is
      currently on version 3.3.3. The <a
      href="http://www.igniterealtime.org/builds/openfire/docs/latest/documentation/plugin-dev-guide.html">Plugin
      developer guide</a> is a little help, and so are the <a
      href="http://www.igniterealtime.org/community/index.jspa">message boards</a>, but
      there is still some detail missing.<br /><br />Situation: I want to have a custom
      servlet that is available on the same url:port as our admin server. I don't want to have to
      login to the admin server to reach this url, and the output from this servlet should not be
      wrapped by the openfire sitemesh template.<br /><br />First, I registered the
      servlet in a web-custom.xml, but I could not get my servlet to appear. I had a url like
      <code>http://localhost:9090/plugins/myplugin/CustomServlet</code>. I couldn't find
      an answer on the message boards so I pulled down the source and started debugging. Turns out
      that the PluginServlet class does a toLower on the servlet url. So changing the url pattern
      from /CustomServlet to /customservlet in the web-custom.xml fixed the problem.<br
      /><br />Next, to remove the security for hitting the servlet, I used the information
      from <a href="http://www.igniterealtime.org/community/message/165528#165528">this
      post</a>. Adding <code><a
      href="http://www.igniterealtime.org/builds/openfire/docs/latest/documentation/javadoc/index.html?org/jivesoftware/admin/AuthCheckFilter.html">AuthCheckFilter</a>.addExclude("CustomServlet")</code>
      to the initializePlugin method fixed it up.<br /><br />Lastly, as mentioned <a
      href="http://www.igniterealtime.org/community/message/107868#107868">here</a> and
      <a
      href="http://www.igniterealtime.org/builds/openfire/docs/latest/documentation/plugin-dev-guide.html">here</a>,
      adding <code>&lt;meta name='decorator' content='none'/></code> tells
      sitemesh to not use the normal openfire template.<br /><br />Hopefully this info
      will help me remember this stuff down the line...