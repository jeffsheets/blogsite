---
layout: post
title: jQuery to Disable IE MS Lync phone number icons
date: '2012-06-27T07:22:00.000-05:00'
author: Jeff Sheets
tags:
- jquery
- javascript
modified_time: '2012-06-27T07:22:00.650-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-4478679215032976118
permalink: 2012/06/jquery-to-disable-ie-ms-lync-phone.html
---

Corporate environments have been pushing out <a
      href="http://lync.microsoft.com/en-us/Pages/unified-communications.aspx">MS Lync</a>
      as the IM successor to Office Communicator. With that comes a <a
      href="http://ucken.blogspot.com/2010/09/lync-click-to-call-in-internet-explorer.html">click-to-call
      plugin</a> that automatically puts a little phone icon next to any detected phone number
      on a web page. I can only assume that clicking the icon will make a phone call, as if anyone
      really wants that feature to be on by default.<br />
      <br />
      Unfortunately for web developers, the icon is rendered by inserting markup into the webpage.
      This is a problem for a number of reasons:<br />
      <br />
      <ol>
      <li><span style="background-color: white;">The icon </span><i
      style="background-color: white;">looks</i><span style="background-color:
      white;">&nbsp;like it is part of your page, but it's really
      not.&nbsp;</span></li>
      <li><span style="background-color: white;">It even prints with the
      page.&nbsp;</span></li>
      <li><span style="background-color: white;">It screws up your layout because the
      icon is inserted AFTER the page is rendered and onLoad javascript executes! This plays double
      issues when using a scrolling tables plugin like jQuery datatables because now the header
      doesn't lineup with the columns.</span></li>
      <li><span style="background-color: white;">There is no meta tag to disable the
      plugin. The only option to disable the plugin is up to the user or administrator, and we know
      we can't count on users to disable it for us.</span></li>
      </ol>
      <br />
      Our phone numbers were in the common US format of (555) 555-5555. After some trial-and-error I
      found that MS Lync does not detect phone numbers that use a non-breaking hyphen
      (&amp;#8209) instead of the normal hyphens (&amp;#45 and &amp;#4208) (big thanks
      to this <a href="http://www.cs.tut.fi/~jkorpela/dashes.html">Dashes and Hyphens
      page</a>).<br />
      <br />
      Now I could have changed our code server-side to render the new hyphen, but this caused issues
      with our exports to Excel, Word, and PDF. So instead I created a simple jQuery plugin that
      will replace the common &amp;#45 hyphen with a &amp;#8209 non-breaking hyphen and foil
      the MS Lync plugin from detecting our phone numbers.<br />
      <br />
      <script src="https://gist.github.com/2996777.js?file=jquery.disableMSLync.js">
      </script><br />
      <br />