---
layout: post
title: Cookie Craziness with IE and Javascript
date: '2011-07-19T22:53:00.005-05:00'
author: Jeff Sheets
tags:
- javascript
- cookies
modified_time: '2011-07-19T23:09:25.255-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-3238839803281948323
permalink: 2011/07/cookie-craziness-with-ie-and-javascript.html
---

This is a helpful post for my future self (and others) on the peculiarities
      of http cookies and accessing them from javascript vs server side. Since it took me numerous
      google searches to find all of the answers I'm putting the useful details here in one place
      for reference. I assume a basic understanding of browser cookies exists in your head
      already.<br /><br />The properties of cookies that matter are key, value, domain,
      path, and expiration. Cookies are normally set in the HTTP Response header sent by the server.
      Cookies can also be set in javascript with one catch that adds difficulty when debugging:
      domain, path, and expiration <b>can be set but not read</b> from javascript.
      Javascript can only read the key and value.<br /><br />To delete a cookie, you set
      the expiration date to something in the past. Setting it to today's date/time - 2 days is
      safe, but any time in the past will work.<br /><br /><i>NOTE:</i> When
      deleting cookies in Javascript make sure to use the toUTCString() on your date object. IE has
      issues with some of the toString representations of local timezones, but toUTCString() (or the
      deprecated toGMTString()) methods will take care of this. If your cookies are not deleting
      double check the value of your expires string.<br /><br />Quirksmode has <a
      href="http://www.quirksmode.org/js/cookies.html">some good example JS code</a>. But
      if you just want to delete a single cookie, here is my version:<br /><code><br
      />function deleteCookie(name, domain, path) {<br /> var date = new Date();<br
      /> date.setTime(date.getTime() - 2*24*60*60*1000); //Now - 2 days<br /> var cookie =
      name + "=; path=" + path + "; domain=" + domain + "; expires=" + date.toUTCString();<br
      /> document.cookie = cookie;<br />}<br /></code><br /><br
      /><h3><span style="font-size:130%;">Debugging Hints for
      IE</span></h3>While Firefox plays nicely and will easily show you the cookies you
      are using, IE makes things a little more difficult. Here are two techniques that I used to
      help see the cookies in IE:<br /><br />1 - A JS bookmarklet to view the
      keys/values of cookies for your page<br /><code><br
      />javascript:(function(){x=window.open();cs=document.cookie.split(';');for(c in
      cs){x.document.write(cs[c]+'&lt;br&gt;');}x.document.close();})()<br
      /></code><br /><br />2 - If you need to see the Domain for each cookie,
      go into Internet Options &gt; Privacy &gt; Advanced and Override the automatic cookie
      handling to Prompt for 1st and 3rd party cookies. Then IE will ask you to accept each cookie,
      but will also show you the key/value, Domain, expiration date, and other details for each
      cookie before you accept. This is very useful client-side since javascript can only give you
      the key and value information.<br /><br /><br />Hope this is helpful to
      someone out there in the future (probably just me)...