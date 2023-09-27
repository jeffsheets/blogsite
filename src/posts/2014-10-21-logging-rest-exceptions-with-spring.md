---
layout: post
title: Logging REST Exceptions with Spring
date: '2014-10-21T21:13:00.005-05:00'
author: Jeff Sheets
tags:
modified_time: '2020-11-29T21:16:38.203-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-755467090828814512
permalink: 2014/10/logging-rest-exceptions-with-spring.html
---

<p>&nbsp;</p><p>To enable logging for REST errors in
      Spring when using a <a
      href="http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/servlet/mvc/method/annotation/ResponseEntityExceptionHandler.html">ResponseEntityExceptionHandler</a>
      just enable debug on ExceptionHandlerExceptionResolver</p>
      <p><script
      src="https://gist.github.com/jeffsheets/8b73620e0912afd95aa0.js?file=restResponseLog4j.properties"></script></p>
      <p>Without setting debug to true, your errors will still be handled perfectly but you
      will not receive any messages in your server logs about the handled error.</p>
      <p>Of course, there’s also a <a
      href="http://spring.io/blog/2013/11/01/exception-handling-in-spring-mvc">complicated way to
      register</a> an extended <a
      href="http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/servlet/mvc/method/annotation/ExceptionHandlerExceptionResolver.html">ExceptionHandlerExceptionResolver</a>
      and set the warnLogCategory. But that is too much work when you can just enable debug logging
      to get a nice message like this:</p>
      <p><em style="font-style: italic;">DEBUG 15 Oct 2014 09:03:58,391
      (AbstractHandlerExceptionResolver.java:134) - Resolving exception from handler [null]:
      org.springframework.web.bind.UnsatisfiedServletRequestParameterException: Parameter conditions
      "startDay" not met for actual request parameters: </em></p>
      <p>And if you aren’t already using it, you can easily handle any REST exceptions from
      your Spring Controllers with a @ControllerAdvice annotated class that extends
      ResponseEntityExceptionHandler. Here is an example RestResponseEntityExceptionHandler that I
      use:</p>
      <p><script
      src="https://gist.github.com/jeffsheets/8b73620e0912afd95aa0.js?file=RestResponseEntityExceptionHandler.java"></script></p><p><b>Cross-published
      on the Object Partners blog:&nbsp; </b><a
      href="https://objectpartners.com/2014/10/21/logging-rest-exceptions-with-spring/">https://objectpartners.com/2014/10/21/logging-rest-exceptions-with-spring/</a><br
      /></p>