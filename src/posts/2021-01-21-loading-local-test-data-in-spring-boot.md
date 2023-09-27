---
layout: post
title: Loading Local Test Data in Spring Boot
date: '2021-01-21T18:49:00.003-06:00'
author: Jeff Sheets
tags:
- Java
- Data
- Spring Boot
- Spring
modified_time: '2021-01-21T18:56:40.488-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-857995239883841460
permalink: 2021/01/loading-local-test-data-in-spring-boot.html
---

<!--wp:paragraph-->
      <p>When working on an API, it can be nice to load some data locally on startup. This is
      especially true when working on a read-only endpoint where no REST API is available to POST
      any new data. There's a few different ways to load data in Spring Boot, so this post will walk
      you through the options and give my preferred approach.</p>
      <!--/wp:paragraph-->

      <!--wp:paragraph-->
      <p>🚀 Your first step is to look at the <a
      href="https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/">Spring Boot
      Docs</a>, where you see that the recommended approach is to use a <a
      href="https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto-database-initialization">data.sql
      file</a> (or <a
      href="https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto-initialize-a-database-using-hibernate">import.sql</a>
      if you have Hibernate ddl-auto manage your tables). So, thinking that's a good idea, you might
      write up something like:</p>
      <!--/wp:paragraph-->

      <!--wp:preformatted-->
      <code>merge into MY_OBJECTS values ('e166755b-2b99-43e4-bf64-74ddff84d064', 'abc',
      '123');<br>
      merge into MY_OBJECTS values ('bbe14733-6db7-4f15-ab3a-13fd0e29d397', 'def', '456');<br>
      merge into MY_OBJECTS values ('7cebd07b-2334-4c6d-baf9-efe194ae29a5', 'xyz',
      '789');</code>
      <!--/wp:preformatted-->

      <!--wp:paragraph-->
      <p>⚠️ This works fine for small pieces of data, or for very simple tables, but you'll
      notice a few problems that come with this approach:<br />1) Generated IDs and UUID's
      will be complicated<br />2) Any Spring data validation rules will be missed<br
      />3) Enums will not be respected<br />4) Difficult to reference data from other
      tables</p>
      <!--/wp:paragraph-->

      <!--wp:paragraph-->
      <p>☕ Then maybe, like me, you miss the <a
      href="https://grails.org/">Grails</a> way of having a <a
      href="https://guides.grails.org/creating-your-first-grails-app/guide/index.html#bootstrap">Bootstrap.groovy</a>
      class that gets magically called at system startup? Grails would run this script file after
      startup before serving the application, and it was a great place to add test local
      data.</p>
      <!--/wp:paragraph-->

      <!--wp:paragraph-->
      <p>And this is how I felt for a long time, that Spring Boot just didn't have an easy way
      to do something similar. Until I had a <a
      href="https://twitter.com/sheetsj/status/1343962654034042881">Twitter
      conversation</a>, where it was shown to me about using an <a
      href="https://twitter.com/sheetsj/status/1344659401047646209">ApplicationRunner.java</a>
      class.</p>
      <!--/wp:paragraph-->

      <div class="separator" style="clear: both;"><a
      href="https://objectpartners.com/wp-content/uploads/2021/01/image-1024x407.png"
      style="display: block; padding: 1em 0; text-align: center; "><img alt="" border="0"
      width="400" data-original-height="318" data-original-width="800"
      src="https://objectpartners.com/wp-content/uploads/2021/01/image-1024x407.png"/></a></div>
      <!--wp:paragraph-->
      <p>But interestingly when I dove back into the Spring Docs to find more info, there's
      really only an <a
      href="https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-command-line-runner">obscure
      reference to ApplicationRunner.java</a>, and even then there isn't an example of how to
      use it. </p>
      <!--/wp:paragraph-->

      <!--wp:paragraph-->
      <p>📝 So here's my take at using ApplicationRunner to bootstrap some SpringBoot
      data:</p>
      <!--/wp:paragraph-->

      <!--wp:html-->
      <script
      src="https://gist.github.com/jeffsheets/e018277e0ba2257c7d4b6c3c9767b1dd.js?file=LocalDataSetup.java"></script>
      <!--/wp:html-->

      <!--wp:paragraph-->
      <p>This fixes all of my complaints about data.sql from above:<br />1) The ID is
      not specified, so UUID will get auto-generated<br />2) It uses the Repository class to
      save, along with using an Entity Validations<br />3) If this class needed to use an Enum
      we could easily reference it<br />4) We can do other table operations first, like only
      insert the data if the table is empty</p>
      <!--/wp:paragraph-->

      <!--wp:paragraph-->
      <p>❗Note a couple of other things:<br />A) The <a
      href="https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-profiles">@Profile
      annotation</a> specifies to only run this for the <code>local</code> and
      <code>test</code> profiles. These are fairly common custom profiles to have, but
      you'll need to setup your application to use these (or others) if you don't have them
      already.<br />B) I'm using <a
      href="https://projectlombok.org/features/constructor">Lombok</a> to auto generate the
      constructor. You don't have to use Lombok, if you love typing lots of boilerplate, so you can
      remove that annotation and write your own constructor.</p>
      <!--/wp:paragraph-->

      <!--wp:paragraph-->
      <p>This certainly isn't for every application, so just take it as a tool to add to your
      toolbox. But I'm mostly writing this because I was surprised that the concept was around for
      many years now and somehow I had just never stumbled upon it, until now!</p>
      <!--/wp:paragraph-->
      <p>Cross-published on the <a
      href="https://objectpartners.com/author/jsheets/">Object Partners blog</a></p>