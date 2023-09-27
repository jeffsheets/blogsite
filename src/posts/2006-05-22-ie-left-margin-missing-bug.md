---
layout: post
title: IE Left Margin Missing Bug
date: '2006-05-22T12:01:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2006-05-22T12:03:46.390-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-114831727308274761
permalink: 2006/05/ie-left-margin-missing-bug.html
---

This one has been bugging me for a long time before finding the answer
      today...<br /><br />In IE I couldn't get absolute positioned elements in our
      left-hand Search pane to appear correctly. The would get pushed onto our right-hand content
      pane. After thinking about it overnight (well, over multiple nights) I realized that IE was
      not noticing our negative left or right margins (One True Layout stuff).<br /><br
      />A search today reveals <a
      href="http://www.positioniseverything.net/bughouse.html">the answer</a> from
      PositionIsEverything<br /><blockquote>If #wrapper is static or relative, it must
      have a width, or it and the &lt;DIV> it contains will lose their left margins in IE. If
      it's absolute, lack of a 'width' will not trigger the bug.</blockquote><br
      /><br />So I went back through and added width:100% or width:998px to the container
      divs that were position:static or position:relative. Everything now works beautifully!<br
      /><br />All of this stems from my desire to use <a
      href="http://script.aculo.us/">script.aculo.us</a> <a
      href="http://wiki.script.aculo.us/scriptaculous/show/Autocompleter.Local">local
      autocompletion</a> (which requires an absolutely positioned list) to replace a VERY long
      drop down select list that we have.