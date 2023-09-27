---
layout: post
title: Jess Architecture in a J2EE Environment
date: '2004-07-07T16:57:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2004-07-07T17:03:51.920-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-108923742384635997
permalink: 2004/07/jess-architecture-in-j2ee-environment.html
---

We need to implement the Jess rules engine into a clusterable distributed
      environment. The question lies in how Jess is deployed.
      <br />
      <br />It would appear that it cannot be deployed inside of an App Server because Jess
      does it's own threading. After some research into JSR 94 (Rules engine API/SPI) it is still
      unclear how Jess would actually run in our environment. I seem to remember that Clipse ran as
      a single server instance and that our EJB's across the cluster would access this single
      instance. I also believe that Jess would have to run in this way, as a single server, however
      Jess itself is not a server.
      <br />
      <br />So how does an EJB in a cluster access the single instance of Jess? Do we write an
      RMI server to wrap the Jess instance (as suggested in "Jess in Action"), or do we some how use
      JCA to connect each App Server to Jess?
      <br />
      <br />So far we've written the RMI wrapper, but it seems like this could be easier.