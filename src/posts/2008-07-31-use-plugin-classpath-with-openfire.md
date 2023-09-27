---
layout: post
title: Use Plugin Classpath with Openfire Plugin
date: '2008-07-31T10:56:00.001-05:00'
author: Jeff Sheets
tags:
modified_time: '2008-07-31T10:58:53.399-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-1966323681012777640
permalink: 2008/07/use-plugin-classpath-with-openfire.html
---

When creating an Openfire plugin, some classes cannot be found by the
      default classpath. This is a result of the way that Openfire loads plugins and their jars into
      the classpath. For me, specifically, I got a ClassNotFoundException when trying to create an
      IntialContext with WLIntialContextFactory, even though the weblogic.jar was in my plugin lib
      folder. One solution is to move everything from the plugin/lib folder into openfire/lib. But
      this is messy at best.<br /><br />Luckily, I found a solution from someone trying
      to use<br /><a
      href="http://www.igniterealtime.org/community/message/170245#170245">GWT in an Openfire
      Plugin</a>.<br /><br />First, set a PluginClassLoader on your Plugin class.
      Here is my trimmed example:<br /><code><br />...<br />private
      PluginClassLoader pluginClassLoader = null;<br />...<br />public void
      initializePlugin(PluginManager pManager, File pluginDirectory) {<br /> pluginClassLoader
      = pManager.getPluginClassloader(this);<br />}<br />...<br />public
      PluginClassLoader getPluginClassLoader() {<br /> return pluginClassLoader;<br
      />}<br /></code><br /><br />Then, in my class that attempts to load
      a Context, before loading it I do this:<br /><code><br />MyPlugin myPlugin =
      (MyPlugin) XMPPServer.getInstance()<br />
      .getPluginManager().getPlugin("myplugin");<br />if (myPlugin != null &&
      myPlugin.getPluginClassLoader() != null) {<br />
      Thread.currentThread().setContextClassLoader(<br />
      myPlugin.getPluginClassLoader().getClassLoader());<br />}<br /></code>