---
layout: post
title: Firefox AJAX Bug - Plus Workaround
date: '2006-06-13T13:20:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2006-06-13T13:22:12.336-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-115022283762635651
permalink: 2006/06/firefox-ajax-bug-plus-workaround.html
---

Today we stumbled across a fairly significant <a
      href="https://bugzilla.mozilla.org/show_bug.cgi?id=317600">firefox bug</a> with popup
      windows and making XHR requests. Here is the scenario:<br /><br />We have a
      calendar selection popup window for our users to select a date (typical of any reservation
      website). User clicks calendar icon, calendar select popup appears, user selects date, popup
      window closes & fills text field with date.<br /><br />Today we wanted to add
      an AJAX call triggered just as the popup window closes. This call would request filtered data
      for another field based on the date selected. The AJAX call (via DWR) was working fine when we
      didn't use the calendar popup, but when using the popup we would get "No data received from
      server" from DWR.<br /><br />Luckily we found a reference to the <a
      href="https://bugzilla.mozilla.org/show_bug.cgi?id=317600">firefox bug</a> on the
      <a
      href="http://www.nabble.com/Possible-Bug--No-data-received-from-server-DWR-1.0-Exception-in-DWR-1.1-t1260759.html#a3344846">dwr
      mailing list</a>.<br /><br />Basically, Firefox incorrectly tries to make
      the XHR call from the popup window (even though the javascript explicitly says to call the XHR
      from the opener). The workaround is to call the dwr function from inside a
      window.setTimeout('myAjaxCall()',0). This will allow the window to close successfully in
      Firefox.<br /><br />Here's the code example from the example website:<br
      /><blockquote>Without seeing your code its hard to say, but I bet that from your
      popup you are invoking a dwr call on the popup's window.opener. (i.e. in your popup you have
      something like window.opener.makeDWRCall()). The problem is when you do that, the
      XMLHttpRequest is "owned" by the popup window even though the call resides on your main
      window.<br /><br />If you take a look at the Firefox bug listed above you will see
      a workaround to the issue:<br /><br />function closePickupWindow(id) {<br
      />opener.pickupId.value = id;<br />if (opener.pickupFunctionPointer != null) {<br
      />opener.launchLookup();<br />}<br />window.close();<br /><br
      />}<br /><br />// This is to work around the following bug in firecox<br
      />function launchLookup() {<br />window.setTimeout('pickupFunctionPointer()',
      0);<br />}<br /><br />Some of this code is extraneous, but the basic idea is
      that from your popup you call a function on window.opener that uses setTimeout to issue the
      DWR call. Note that the timeout can be instantaneous because all you are really trying to do
      is change the caller of the DWR function to window.opener instead of your popup.<br
      /><br />Hope this helps.<br />John Kleinschmidt</blockquote>