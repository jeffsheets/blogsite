---
layout: post
title: Jetty JTA via JNDI with Spring
date: '2012-12-28T11:38:00.000-06:00'
author: Jeff Sheets
tags:
- Java
- JNDI
- Jetty
- Spring
modified_time: '2012-12-28T11:38:59.168-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-4014588881224443493
permalink: 2012/12/jetty-jta-via-jndi-with-spring.html
---

Finally got Jetty 8 to have JTA transactions available to Spring via JNDI
      lookup using Atomikos 3.8 after a lot of trouble. I'm not 100% sure if this is correct but it
      seems to be working for me.<br />
      <br />
      My main driver was not wanting to have Atomikos classes hardcoded in the spring config.
      Instead we can just register the Atomikos UserTransactionManager and UserTransactionImp
      classes in JNDI and have Spring look them up, just like if we were using Websphere, Weblogic,
      etc. Now I can use Jetty for local development instead of Websphere without any change to my
      actual code base. (Be warned that I'm not using this in prod.)<br />
      <br />
      Steps:<br />
      1) Jetty 8 install<br />
      &nbsp; &nbsp;&nbsp;<a
      href="http://download.eclipse.org/jetty/">Download</a>, unzip, setup JETTY_HOME var
      for IntelliJ to use<br />
      2) Atomikos 3.8 install<br />
      &nbsp; &nbsp;&nbsp;<a href="http://www.atomikos.com/">Download</a>,
      unzip<br />
      &nbsp; &nbsp;&nbsp;copy from the Atomikos lib/ directory into Jetty
      lib/ext/:<br />
      &nbsp; &nbsp;&nbsp;geronimo-j2ee-connector_1.5_spec.jar<br />
      &nbsp; &nbsp;&nbsp;geronimo-jms_1.1_spec.jar<br />
      &nbsp; &nbsp;&nbsp;geronimo-jta_1.0.1B_spec.jar<br />
      &nbsp; &nbsp;&nbsp;copy all the JARs from the Atomikos dist/ directory into Jetty
      lib/ext/.<br />
      &nbsp; &nbsp;&nbsp;(Hat tip to this <a
      href="http://www.parttimepolymath.net/masthead/archives/231">blogpost for
      helping</a>)<br />
      3) Jetty config for JTA (<a
      href="http://jetty.4.n6.nabble.com/Jetty-and-Atomikos-JTA-td28650.html">Ref
      posting</a> that helped)<br />
      <script src="https://gist.github.com/4399922.js"></script><br />
      4) Spring JTA lookup<br />
      &nbsp; &nbsp;&nbsp;Spring will lookup using standard JNDI locations of
      java:/TransactionManager and java:comp/UserTransaction<br />
      &nbsp;
      &nbsp;&nbsp;<code>&lt;tx:jta-transaction-manager/&gt;</code><br
      />
