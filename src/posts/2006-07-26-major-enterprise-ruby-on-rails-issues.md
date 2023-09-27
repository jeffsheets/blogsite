---
layout: post
title: Major Enterprise Ruby on Rails Issues?
date: '2006-07-26T09:08:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2006-07-26T09:08:58.903-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-115392293878043905
permalink: 2006/07/major-enterprise-ruby-on-rails-issues.html
---

Greg Luck has written a <a
      href="http://gregluck.com/blog/archives/2006/07/report_from_osc.html">Report from
      OSCON2006: The Ruby Conspiracy</a> where he proceeds to smash Ruby on Rails.<br
      /><br />First, I'm just starting to get past the Rails tutorials so I have NO (zero)
      knowledge of Rails at an Enterprise level. And I've had <a
      href="http://uncommentedbytes.blogspot.com/2005/07/no-fluff-iowa-day-1-javas-dead-ruby.html">similar
      thoughts to Greg's</a> that Rails was being pushed for the betterment of the speakers
      before.<br /><br />So really I'm asking a question here... Are the points that
      Greg makes true?<br /><br />Does Active Record really not have support for
      Prepared Statements?<br /><blockquote>We have two production applications running
      on Ruby. And how is it. Well, despite being perhaps no more than 5% of the functionality of
      our applications, Ruby on Rails is the number one consumer of Oracle CPU and logical gets.
      Why? Rails does not support prepared statements, so Oracle has to reparse every
      time.</blockquote><br /><br />He then goes on to say:<br
      /><blockquote>And ActiveRecord seems not to have learnt Hibernate's lession; that OR
      tools suck for performance and need caching tricks to make them work
      well.</blockquote><br />Although maybe this is a result of Prepared Statements
      being absent?<br /><br />Then, he has issues with Rails not running through a
      connection pool, because fastcgi is forking processes? Really? That sux:<br
      /><blockquote>Also, our Rails apps running in (now unmaintained) fast-cgi regularly
      go awry and fork more processes. Each one creates a new connection to Oracle. So, the opposite
      of connection pooling; connection denial of service.</blockquote><br /><br
      />Next:<br /><blockquote>And does Ruby support Unicode. Not really. And is
      Rails threadsafe? No.</blockquote><br />Not threadsafe? Woah! Is this true?<br
      /><br />So I'm really looking for answers now. Is everyone that is pushing Ruby on
      Rails really looking for more money, and not thinking about the enterprise readiness of the
      product? I know the 37signals success stories, and there are many more, but what of these
      questions that Greg raises?