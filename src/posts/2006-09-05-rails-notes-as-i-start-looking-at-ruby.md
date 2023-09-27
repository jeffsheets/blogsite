---
layout: post
title: Rails notes as I start looking at Ruby
date: '2006-09-05T08:16:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2006-09-05T08:16:08.136-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-115746216804922148
permalink: 2006/09/rails-notes-as-i-start-looking-at-ruby.html
---

I've started working on a Ruby on Rails side project, though I haven't had
      as much time for it as originally hoped. Really, I was up and running and writing code to
      production on an existing Rails app in a # of hours!<br /><br />First,
      ActiveRecord is very nice. From a DAO oriented Java background (with a sprinkling of
      Hibernate), ActiveRecord is simply amazing. I love the Model based finds and the automatic
      find_by_name type methods. These guys have really developed a great framework.<br
      /><br />Rails from a web side is very quick to develop, especially when compared to
      the Eclipse -> Ant -> Weblogic Deploy. You go from accepting a 2-5 minute build-deploy
      cycle to just a few seconds of saving a file in Rails.<br /><br />Capistrano for
      deployments is slick. It's like having a standardized deployment environment across rails
      apps, something that J2EE has never gotten close to. Doing a <code>rake
      remote:deploy</code> and knowing that a backup of your production has already been made
      is wonderful. Rollbacks are as simple as <code>rake remote:rollback</code>.<br
      /><br />I really got bit by subversion a couple weeks ago (though this doesn't deal
      with RoR specifically, it seems to bite a lot of us). I was updating the rails version due to
      the recent security holes, but subversion was coughing up all over it. <a
      href="http://blog.spig.net/articles/tag/subversion">Re-freezing Rails Gems Using
      Subversion</a> saved my day.<br /><br />(Update: It looks like my side
      project has died today, for reasons I cannot control. So hopefully I'll find another one to
      work with soon.)