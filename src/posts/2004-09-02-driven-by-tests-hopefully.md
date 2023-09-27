---
layout: post
title: Driven by Tests... hopefully
date: '2004-09-02T09:04:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2004-09-02T09:04:18.126-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-109413385812807982
permalink: 2004/09/driven-by-tests-hopefully.html
---

A little late to the test driven side, I am, but I have played with JUnit
      for a while now. What I'm looking for is best practices to continue this implementation a
      little further. After some brief research, I have settled on the following setup for our
      tests:
      <br />
      <br />Unit Testing
      <br />JUnit - obviously for unit testing POJO's
      <br /> -> Cactus - for server side unit testing of ejb's
      <br /> -> Strutstestcase - for unit testing Action classes. This I'm unsure of, but
      will look at Raible's project for direction.
      <br />
      <br />Functional/Acceptance Testing
      <br />HttpUnit - Http/Html driven tests
      <br /> -> JWebUnit - Extension driven by code
      <br /> -> Canoo Webtest - Extension driven by XML
      <br />
      <br />Anyway, if you have any direction for me, please advise!
      <br />