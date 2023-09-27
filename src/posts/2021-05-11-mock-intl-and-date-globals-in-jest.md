---
layout: post
title: Mock Intl and Date globals in Jest
date: '2021-05-11T16:20:00.003-05:00'
author: Jeff Sheets
tags:
- Jest
- test
- javascript
modified_time: '2021-05-11T16:20:27.485-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-7463619245650258865
permalink: 2021/05/mock-intl-and-date-globals-in-jest.html
---

<p>In Javascript land, mocking the browser global objects can be a
      bit of a pain for tests. Searching StackOverflow gives plenty of complicated answers. Some
      suggesting using 3rd party mock libraries. Some that overwrite the global object itself....
      But Jest already has this capability built-in and it isn't so bad:</p><p>So let's
      say you have a method that gets the user's timezone or the timezone offset. (the timezone
      offset is used sometimes since <a
      href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions#browser_compatibility">IE11
      doesn't support easily reading the timezone</a>, but I digress)</p>
      <script
      src="https://gist.github.com/jeffsheets/710d1d6dd2f2acb0125a5d624ae915e4.js?file=timeZoneUtils.js"></script>
      <p>
      Now to test this, we'll need to mock out both the <b>Intl</b> and
      <b>Date</b> Javascript globals. We can do this using Jest's <a
      href="https://jestjs.io/docs/jest-object#jestspyonobject-methodname">spyOn</a> method
      to temporarily replace the global method with our own implementation. Notice that we setup the
      spy in the <b>beforeEach</b> and reset everything in the
      <b>afterEach</b>. The setup works something like this:
      </p>
      <script
      src="https://gist.github.com/jeffsheets/710d1d6dd2f2acb0125a5d624ae915e4.js?file=timeZoneUtils.test.js"></script>
      <p>But that's it! No need to import an extra library. This is all supplied directly in
      Jest itself!</p>