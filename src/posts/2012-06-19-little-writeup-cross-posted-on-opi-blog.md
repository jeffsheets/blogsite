---
layout: post
title: JQuery UI datepicker IE focus fix
date: '2012-06-19T08:04:00.001-05:00'
author: Jeff Sheets
tags:
- jquery
- javascript
modified_time: '2020-11-29T20:15:31.628-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-647292892747922123
permalink: 2012/06/little-writeup-cross-posted-on-opi-blog.html
---

<p>The jquery ui <a
      href="http://jqueryui.com/demos/datepicker/">datepicker control</a> is quite slick
      and easy to use, and as you see here it can be customized through various events.</p>
      <p>At my current client we have multiple controls on the page that listen for onblur and
      onchange events to notify of changes to the page (most notably an <a
      href="http://www.cssnewbie.com/cross-browser-support-for-html5-placeholder-text-in-forms/">html5
      placeholder enabler</a>). But the datepicker does not send the blur event when a
      selection happens. Also, our users wanted focus to return the text input field after the date
      selection. So we need to setup some event handlers to call the blur and focus events upon date
      selection.</p>
      <p>First let’s start with a simple datepicker that is applied to any input field having
      css class dateInput, with a few extra options:<br /><code></code></p>
      <p><code><code></code></code></p>
      <pre>$("input.dateInput").datepicker({
      changeMonth: true,
      changeYear: true,
      showAnim: "fadeIn",
      yearRange: 'c-30:c+30',
      showButtonPanel: true
      });
      </pre>
      <p><code></code></p>
      <p>Adding a blur and change event on datepicker selection is rather easy:<br
      /><code></code></p>
      <p><code><code></code></code></p>
      <pre>$("input.dateInput").datepicker({
      changeMonth: true,
      changeYear: true,
      showAnim: "fadeIn",
      yearRange: 'c-30:c+30',
      showButtonPanel: true,

      /* blur needed to correctly handle placeholder text */
      onSelect: function(dateText, inst) {
      $(this).blur().change();
      }
      });
      </pre>
      <p><code></code></p>
      <p>But adding focus is a little more difficult because of a difference in browser
      behavior. Simply adding a .focus() to onSelect and onClose will suffice for Chrome and Firefox
      <a href="http://stackoverflow.com/q/4664053">but IE will reopen the datepicker</a>
      once it <a href="http://stackoverflow.com/a/1401978">receives the focus</a>. In
      order to handle IE we can simply implement the beforeShow event handler, returning false when
      we reach a case where IE should not reopen the datepicker window. I’ve added a fixFocusIE
      variable to track this:</p>

      <p>Hopefully this helps someone else searching for a way to focus on the original input
      field after selecting a date with the JQuery UI Datepicker
      control.</p><p><b>Note: </b>A little writeup cross-posted on the <a
      href="http://www.objectpartners.com/">OPI blog</a> about making the <a
      href="http://jqueryui.com/demos/datepicker/">jquery UI datepicker</a> send blur
      events when dates change, while handling a quirk with IE:<br />
      <a
      href="http://www.objectpartners.com/2012/06/18/jquery-ui-datepicker-ie-focus-fix/">http://www.objectpartners.com/2012/06/18/jquery-ui-datepicker-ie-focus-fix/</a></p><p>&nbsp;<br
      /></p>