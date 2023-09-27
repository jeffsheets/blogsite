---
layout: post
title: Using MariaDB4j for a Spring Boot Embedded Database
date: '2017-06-19T21:40:00.001-05:00'
author: Jeff Sheets
tags:
- Java
- Data
- Spring Boot
- Spring
modified_time: '2021-01-25T17:35:28.343-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-4965695385024304292
permalink: 2017/06/using-mariadb4j-for-spring-boot.html
---

<p>&nbsp;</p><p>MariaDB4j is an embedded Java wrapper
      for spinning up a MariaDB instance for local development or continuous integration testing
      purposes. Using an embedded (or in-memory) database is extremely beneficial when developing a
      Java application. Traditional embedded DB options are H2, HSQLDB, and Derby. <a
      href="https://github.com/vorburger/MariaDB4j">MariaDB4j</a> provides a local DB
      perfect for a project that deploys to MySQL or MariaDB in production.</p>
      <h3>MariaDB</h3>
      <p>First a quick aside, if you are unfamiliar with <a
      href="https://mariadb.com/">MariaDB</a> -- it was built by the original developers of
      <a href="https://www.mysql.com/">MySQL</a> as a completely open source successor.
      MariaDB is billed as a <a
      href="https://mariadb.com/kb/en/mariadb/mariadb-vs-mysql-compatibility/">Drop In
      replacement for MySQL</a>.</p>
      <h3>Why use an Embedded DB?</h3>
      <p>A few reasons. To have a full application database for local development. To spin up
      a separate clean DB for integration testing. Easy setup -- no need for each developer to
      maintain local database servers. It provides the convenience of being able to develop an app
      completely off-network; it eliminates the need to connect to a shared development
      database.</p>
      <h3>Why use MariaDB4j?</h3>
      <p>We started our <a href="https://projects.spring.io/spring-boot/">Spring
      Boot</a> project using the default <a
      href="http://www.h2database.com/html/main.html">H2</a> database. It is very fast, and
      usually what I prefer. However our project had a large amount of complex <a
      href="https://flywaydb.org/">Flyway</a> SQL Database Migration scripts that were
      written by our DBA for use on the dev/staging/prod MariaDB database. At first we started to
      manually modify the SQL to work in a DB-agnostic fashion, but this was very time consuming and
      tedious. So we toyed with the idea of running a local DB inside a <a
      href="https://www.docker.com/">Docker</a> container. Neither was as easy as running
      an embedded database, so after some searching we found MariaDB4j.</p>
      <h3>About MariaDB4j</h3>
      <p>MariaDB4j can be used in any JVM environment (java, groovy, kotlin, etc...), and it
      has a nice convenience wrapper for Spring. On startup of your application it will install a DB
      instance in a tmp folder and start it. Depending on your configuration -- on shutdown it can
      leave the DB persistent on disk, or you can tell it to destroy the DB.</p>
      <h3>Install MariaDB4j</h3>
      <p>Just add the following to your Gradle file (or use the Maven equivalent):<br
      /><span style="font-family: monospace; font-size: .8em;">compile
      "ch.vorburger.mariaDB4j:mariaDB4j:2.2.3"</span></p>
      <h3>Spring Boot Configuration</h3>
      <p>The config here can be used for Local and Integration Tests, and is switched on using
      Spring Profiles. You'll need a separate PersistenceConfig running under a normal profile for
      dev/staging/prod that wires up your normal LocalContainerEntityManagerFactoryBean
      configuration.<br /><script
      src="https://gist.github.com/jeffsheets/780819e09654077db4fe4087f378e78d.js?file=EmbeddedMariaDbConfig.groovy"></script></p>
      <p>And some sample properties files, one for local development running on the same port
      every time, and data persistent to the file system. And the other for integrationTests that
      picks a random port and is stored in the tmp directories.</p>
      <p><script
      src="https://gist.github.com/jeffsheets/780819e09654077db4fe4087f378e78d.js?file=application-local.properties"></script><br
      /><script
      src="https://gist.github.com/jeffsheets/780819e09654077db4fe4087f378e78d.js?file=application-integrationTest.properties"></script></p>
      <h3>MariaDB4j tips</h3>
      <p>- I recommend the persistent disk DB for local development, but using a separate test
      DB config that is destroyed after integration tests.<br />- Configure the local db to
      live in a /data folder in your project. Then if you need to recreate it you can easily
      <span style="font-family: monospace; font-size: .8em;">rm -Rf ./data</span><br
      />- You can use a DB tool, like the built-in DB viewer in IntelliJ, to connect to the
      running DB. Your app will need to be running to access the server, unlike how the H2 driver
      can connect directly to the filesystem. One drawback compared to H2.<br />- The startup
      time is slower than H2. Around 35 seconds on my machine, but worth it to catch any errors we
      wouldn't see by using H2.<br />- You may get an error (<a
      href="https://github.com/vorburger/MariaDB4j/issues/48">Github Issue</a>) when first
      using MariaDB4j like<br /><span style="font-family: monospace; font-size:
      .8em;">Library not loaded: /usr/local/opt/openssl/lib/libssl.1.0.0.dylib</span><br
      />That is caused by something in the Embedded MariaDB that expects the SSL lib in a
      non-standard place. Try running:<br /><span style="font-family: monospace; font-size:
      .8em;">sudo mkdir -p /usr/local/opt/openssl<br />sudo ln -s /usr/lib
      /usr/local/opt/lib</span><br />And that might fix it. If it doesn't, give this a
      shot. Install homebrew, then run the following command:<br /><span
      style="font-family: monospace; font-size: .8em;">brew install
      openssl</span></p>
      <h3>Conclusion</h3>
      <p>Hopefully this helps you run MariaDB4j on your own project. Let me know if you have
      any issues. The maintainers of MariaDB4j are very receptive to comments and feedback, and have
      a very welcoming community, so you can also reach out to their <a
      href="https://github.com/vorburger/MariaDB4j">github page</a> for more info. All the
      code here is published on a <a
      href="https://gist.github.com/jeffsheets/780819e09654077db4fe4087f378e78d">Github
      Gist</a>.</p><p><b>Cross-published on the Object Partners
      blog:&nbsp; </b><a
      href="https://objectpartners.com/2017/06/19/using-mariadb4j-for-a-spring-boot-embedded-database/">https://objectpartners.com/2017/06/19/using-mariadb4j-for-a-spring-boot-embedded-database/</a><br
      /></p>