---
layout: post
title: Pooling Web Service Connections in Grails
date: '2014-06-11T21:07:00.001-05:00'
author: Jeff Sheets
tags:
modified_time: '2020-11-29T21:10:10.925-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-3543479852823726812
permalink: 2014/06/pooling-web-service-connections-in.html
---

<p>&nbsp;</p><p>Apache <a
      href="http://commons.apache.org/proper/commons-pool/">Commons Pool</a> is a great
      tool to easily configure an object pool on the JVM. Having a pool of created objects helps
      when you need to reuse connection objects that are expensive to create (LDAP, Web Service,
      etc).</p>
      <p>While improving the performance of a Grails application, I noticed that 2 to 4
      seconds were being consumed simply creating a connection to a specific JAX-WS Java Web Service
      that we used to retrieve Rules for building data grid columns. The perfect opportunity to
      install an object pool. Along the way I ran into <a
      href="http://stackoverflow.com/questions/22824889/apache-pool-cant-return-object-in-spring-controller-service">some
      issues pooling the JAX-WS Port Proxy stub object</a>, and I'll show you the simple work
      around here.</p>
      <p>First, install the commons-pool2 jar dependency in BuildConfig.groovy<br
      /><script
      src="https://gist.github.com/jeffsheets/f049f463ba53a7c3f768.js?file=BuildConfig.groovy"></script></p>
      <p>Next create a <a
      href="https://commons.apache.org/proper/commons-pool/apidocs/index.html?org/apache/commons/pool2/BasePooledObjectFactory.html">BasePooledObjectFactory</a>
      that Apache Commons Pool will use to create an object to be placed in the pool. You'll need a
      create() method to build your object, and a wrap() method that wraps your object with a
      PooledObject implementation for stats and pool maintenance purposes. This code uses a legacy
      Java RuleServiceClientFactory to build the ruleService JAX-WS Port Proxy stub object, yours
      should probably inject a factory or service.<br /><script
      src="https://gist.github.com/jeffsheets/f049f463ba53a7c3f768.js?file=RuleServiceFactory.groovy"></script></p>
      <p>The factory is then wired into a GenericObjectPool in resources.groovy so we can
      easily inject the ConnectionPool into our Service objects. Here is where you can configure the
      pool properties.<br /><script
      src="https://gist.github.com/jeffsheets/f049f463ba53a7c3f768.js?file=resources.groovy"></script></p>
      <p>See how the ruleConnectionPool is used in this sample GridService. The getGridRules()
      uses an available pooled WS Connection.<br /><script
      src="https://gist.github.com/jeffsheets/f049f463ba53a7c3f768.js?file=GridService.groovy"></script></p>
      <p>The PoolHelper.withCommonsPool is a convenience closure that I use to wrap the
      handling of the pool. This method handles invalidating and returning objects to the pool, much
      like how Groovy Sql methods will wrap the closing and transaction handling of a JDBC
      Connection. It frees up the GridService from knowing the API of Apache Commons Pool.<br
      /><script
      src="https://gist.github.com/jeffsheets/f049f463ba53a7c3f768.js?file=APoolHelper.groovy"></script></p>
      <p>Finally, you may have noticed that the RuleServiceFactory is using a JaxwsPortProxy
      object to wrap the connection. Apache Pool2 requires each item in the pool to be unique via
      the equals method, but the <a
      href="http://stackoverflow.com/questions/22824889/apache-pool-cant-return-object-in-spring-controller-service">JAX-WS
      port proxy object does not play well with this</a>. So using a <a
      href="http://groovy.codehaus.org/api/groovy/util/Proxy.html">simple Groovy Proxy
      wrapper</a> with UUID's to id the objects can get around the problem.<br
      /><script
      src="https://gist.github.com/jeffsheets/f049f463ba53a7c3f768.js?file=JaxwsPortProxy.groovy"></script></p>
      <p>Hopefully this shows how easy it is to pool web service connections in Groovy. It
      should also be noted that all of this is pure Groovy besides the simple helpers that the
      Grails BuildConfig and resources.groovy files provide. So you can use this pattern in any
      Groovy/Java project even if Grails is not your current framework of
      choice.</p><p><b>Cross-published on the Object Partners blog:
      </b><a
      href="https://objectpartners.com/2014/06/11/pooling-web-service-connections-in-grails/">https://objectpartners.com/2014/06/11/pooling-web-service-connections-in-grails/</a>
      <br /></p>