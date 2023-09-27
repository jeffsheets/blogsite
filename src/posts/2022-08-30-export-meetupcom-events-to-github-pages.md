---
layout: post
title: Export Meetup.com Events to a Github Pages Jekyll site
date: '2022-08-30T22:49:00.001-05:00'
author: Jeff Sheets
tags:
- GraphQL
- JSON
- Groovy
modified_time: '2022-08-30T22:49:13.699-05:00'
thumbnail: https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibNQtfIEnCCuFo4w2Sz8Kk6odhmA2PcxuWYfYPnhm9QW3ZbJVCKSQD1Mq_nzOo5MhjW5IPG08WFmV29jUd3whUb-yGFmGa_am6saZ2ltRXR2c4CVJUws6aIPEr4OA9PI9lgTKvMqIuzsJ7iaItbait3LEMYuaI-NhyLodZI2SCtnl5xyilZw/s72-c/ojug.png
blogger_id: tag:blogger.com,1999:blog-6970836.post-7390795077058089997
permalink: 2022/08/export-meetupcom-events-to-github-pages.html
---

For a long time, our main Omaha Java Users Group communication has been
      through <a href="https://www.meetup.com/omahajava/">meetup.com/omahajava/</a>,
      however we do still have an <a href="http://ojug.org/">ojug.org</a> website too.
      At first, we would nicely copy the event to both Meetup and OJUG.org, however within a few
      months you can see that we simply stopped duplicating effort and the events on <a
      href="http://ojug.org/">ojug.org</a> quickly got out of date. Not a big deal at the
      time. But it would be nice to archive our past events to the ojug.org site (especially as we
      explore Meetup.com alternatives in the near future <a href="#footnote1">[1]</a>).
      <p>
      (if you want the TL&amp;DR: see all the details at <a
      href="https://github.com/jeffsheets/ojug-meetup-export">https://github.com/jeffsheets/ojug-meetup-export</a>.)
      </p>
      <p>
      <h3>Exporting Events from Meetup.com</h3>
      The first step was to find a way to export <a
      href="https://www.meetup.com/omahajava/events/past/">our past events</a>. I had hoped
      for a CSV export through the admin UI, but didn't see anything. I then thought it might take
      some web scraping, or maybe some network dev tools api call watching. But noticed that there
      was a grayed out setting in the admin UI for the Meetup API 🤔. A quick google found the <a
      href="https://www.meetup.com/api/playground/#graphQl-playground">Meetup GraphQL API
      Playground</a> page. And to my surprise, sending a test query just worked! 🎉

      After a little trial and error from their API docs, and increasing the result count to 100 to
      get all of our events without paging, I was able to export all of the past events to JSON
      with:
      <pre><code class="language-graphql"> query($meetupId: String!) {
      groupByUrlname(urlname: $meetupId) {
      description
      pastEvents(input: {first: 100}) {
      count
      edges {
      node {
      title
      description
      dateTime
      going
      }
      }
      }
      }
      }
      </code></pre>
      And some inputs of:
      <pre><code class="language-json"> {"meetupId":"omahajava"}
      </code></pre>
      Which gave <a
      href="https://github.com/jeffsheets/ojug-meetup-export/blob/main/src/meetup-events-export-2022-08-25.json">a
      nice JSON result</a>, like this:
      <pre><code class="language-json">{
      "data": {
      "groupByUrlname": {
      "description": "Omaha's Java User Group [@omahajug](https://twitter.com/omahajug/). yadda
      yadda yadda",
      "pastEvents": {
      "count": 65,
      "edges": [
      {
      "node": {
      "title": "Angular JS for Java Developers",
      "description": "This month //etc etc etc",
      "dateTime": "2014-05-20T17:30-05:00",
      "going": 27
      }
      },
      .....
      </code></pre>
      </p>
      <p>
      <h3>ojug.org Tech</h3>
      Before showing you how the event blog post pages were generated, a quick note on the tech for
      ojug.org (src at <a
      href="https://github.com/OJUG/ojug.github.io">https://github.com/OJUG/ojug.github.io</a>).
      It is running on a standard <a
      href="https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll">Github
      Pages Jekyll workflow</a> stack. While we have thoughts to move that over to <a
      href="https://www.11ty.dev/">11ty</a>, for now <a
      href="https://jekyllrb.com/docs/posts/">Jekyll</a> is working fine. Create a new
      markdown file in the <a
      href="https://github.com/OJUG/ojug.github.io/tree/master/_posts">_posts folder</a>,
      merge to the main branch, and the workflow auto-kicks off and redeploys our ojug.org site like
      magic.
      </p>
      <p>
      <h3>Generating Meetup event Jekyll posts</h3>
      With this in mind, the blog needs .md files generated for each event in the events JSON. Using
      a little Groovy, this was done pretty quickly with a GSP template, some functions to prettify
      date formats, and a filename creation function. The groovy <a
      href="https://github.com/jeffsheets/ojug-meetup-export/blob/main/src/post.gsp">post.gsp
      template</a> looks like:
      <pre><code>---
      layout: post
      title: "&lt;%= longDate %> &lt;%= title %>"
      ---

      &lt;%= description %>

      (This past event was exported from Meetup.com)
      (&lt;%= attended %> people had RSVP'd to this event in Meetup)</code></pre>
      Then the code that generates the template for each JSON event is in <a
      href="https://github.com/jeffsheets/ojug-meetup-export/blob/main/src/PostGenerator.groovy">PostGenerator.groovy</a>:
      <pre><code class="language-groovy"> void generatePosts() {
      def events = new
      JsonSlurper().parse(getClass().getResource(SRC_JSON)).data.groupByUrlname.pastEvents.edges
      events.each {
      def event = it.node
      def filename = makeFilename(event.title, event.dateTime)
      def outfile = new File("$DEST_FOLDER/$filename")
      def filecontents = new SimpleTemplateEngine()
      .createTemplate(getClass().getResource('/post.gsp'))
      .make([
      title : event.title.replaceAll('"', '\"'),
      description: event.description,
      longDate : convertToLongDate(event.dateTime),
      attended : event.going
      ])
      .toString()
      outfile.write filecontents
      }
      }</code></pre>
      When executed, nice markdown files are generated in the output directory, similar to <a
      href="https://github.com/OJUG/ojug.github.io/blob/master/_posts/2014-05-20-angular-js-for-java-developers.md">2014-05-20-angular-js-for-java-developers.md</a>:
      <pre><code class="language-markdown">---
      layout: post
      title: "May 20, 2014 Angular JS for Java Developers"
      ---

      This month //etc etc etc

      (This past event was exported from Meetup.com)
      (27 people had RSVP'd to this event in Meetup)</code></pre>
      The last step was to copy all of the new markdown files into the _posts directory, create a
      PR, merge it, and see the final results up at <a
      href="http://ojug.org/">ojug.org</a>!
      <div class="separator" style="clear: both;"><a
      href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibNQtfIEnCCuFo4w2Sz8Kk6odhmA2PcxuWYfYPnhm9QW3ZbJVCKSQD1Mq_nzOo5MhjW5IPG08WFmV29jUd3whUb-yGFmGa_am6saZ2ltRXR2c4CVJUws6aIPEr4OA9PI9lgTKvMqIuzsJ7iaItbait3LEMYuaI-NhyLodZI2SCtnl5xyilZw/s1600/ojug.png"
      style="display: block; padding: 1em 0; text-align: center; "><img alt="" border="0"
      width="800" data-original-height="1150" data-original-width="2064"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibNQtfIEnCCuFo4w2Sz8Kk6odhmA2PcxuWYfYPnhm9QW3ZbJVCKSQD1Mq_nzOo5MhjW5IPG08WFmV29jUd3whUb-yGFmGa_am6saZ2ltRXR2c4CVJUws6aIPEr4OA9PI9lgTKvMqIuzsJ7iaItbait3LEMYuaI-NhyLodZI2SCtnl5xyilZw/s1600/ojug.png"/></a></div>
      </p>
      <p>
      <h3>Wrap up</h3>
      And that's it! Writing this blogpost probably took longer than the process to export Meetup to
      JSON, and generate new markdown files for the Jekyll blog! You can view all of the full source
      on my github at <a
      href="https://github.com/jeffsheets/ojug-meetup-export">https://github.com/jeffsheets/ojug-meetup-export</a>
      </p>
      <p id="footnote1">
      [1] - A quick footnote, about Meetup.com... Over the years Meetup has been great for
      advertising our group, attracting new members, having a great user interface, and easily
      collecting RSVP's for events. We've always been lucky enough to have great sponsors to pay the
      ever increasing fee, which is now up to $197.98/year. However Meetup's decision to not allow
      us (or any group) to "freeze" the account, means that our sponsor has been paying that fee for
      2.5 years with little benefit. Talking to other local tech meetup organizers, it became
      apparent that many of us are pondering ways to free ourselves from these fees. Our sponsors
      could throw some pretty great user group parties with the savings! There's a lot of
      functionality we'd have to replicate though, so I'll leave that full discussion for another
      time...
      </p>
