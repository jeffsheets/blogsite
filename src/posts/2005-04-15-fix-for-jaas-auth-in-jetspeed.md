---
layout: post
title: Fix for JAAS Auth in Jetspeed
date: '2005-04-15T16:16:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2005-04-15T16:18:40.213-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-111359981625883027
permalink: 2005/04/fix-for-jaas-auth-in-jetspeed.html
---

I've finally found a fix for our Jetspeed JAAS Authentication issue with
      Weblogic (thanks to help from a BEA consultant).<br /><br />The problem occurs
      when using the JAASSessionValidator in Jetspeed to authenticate through the Weblogic app
      server, along with using the struts bridge from the apache portals project. After logging in
      as the same user in more than one session (by first logging in, and then opening another
      browser to log in again with the same userid), and going from one page to another in the same
      mode (view mode, for example), the server throws up this error:<br
      /><code>Included resource or<br />file
      "/action/edit.jas;jsessionid=C7QZxyGkX0pm6Sp9ckM6vyfxTRJ4p1Tn0Ph3bdz<br
      />g3TJQX4pyDxwC!-2002059013" not found from requested resource "/jetspeed/portal/_<br
      />ns:YTIxMzQ4fGMwfGQwfGVfa3JhPTE9MXxlX3NwYWdlPTE9L2VkaXRfb2JzLmphcztqc2Vzc2lvbmlkP<br
      />T1DN1FaeHlHa1gwcG02U3A5Y2tNNnZ5ZnhUUko0cDFUbjBQaDNiZHpnM1RKUVg0cHlEeHdDIS0yMDAyM<br
      />DU5MDEzfGVfbW9kZT0xPXZpZXc_/".</code><br /><br />This appears to be a
      problem with how Jetspeed will rewrite URL's, and maybe it is more specifically related to the
      struts bridge. I say Jetspeed, and not Weblogic, because the problem can be resolved by
      telling Weblogic to only use cookies to relay session data instead of also rewriting url's. So
      we fixed this by placing this next configuration into the weblogic.xml file of ALL of our war
      files:<br /><code><br /> &lt;session-descriptor&gt;<br />
      &lt;session-param&gt;<br />
      &lt;param-name&gt;URLRewritingEnabled&lt;/param-name&gt;<br />
      &lt;param-value&gt;false&lt;/param-value&gt;<br />
      &lt;/session-param&gt;<br /> &lt;/session-descriptor&gt;<br
      /></code><br /><br />At least we found a work around!