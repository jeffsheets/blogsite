---
layout: post
title: Minimal Jenkinsfile for a Gradle Build
date: '2021-01-25T16:57:00.001-06:00'
author: Jeff Sheets
tags:
- Java
- Jenkins
- Gradle
- Spring Boot
modified_time: '2021-01-25T17:32:22.708-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-603961630687853841
permalink: 2021/01/minimal-jenkinsfile-for-gradle-build.html
---

<p>Starting work on a new project for a client, and their devops
      organization is off working on some new framework for CI/CD deploys. So in the meantime we
      just need a super minimal Jenkins build.&nbsp;</p><p>The requirements I have
      for this are: <br /></p><ol style="text-align: left;"><li>Run the
      build&nbsp;</li><li>Run the tests&nbsp;</li><li>Display test
      report&nbsp;</li><li>Execute on every push to git, including PR
      branches&nbsp;</li><li>Email
      failures&nbsp;</li></ol><p>With that in mind, here is a quite minimal
      Jenkins script for our gradle build:<br /></p>
      <script
      src="https://gist.github.com/jeffsheets/60effa1b85b7fcc1d084f214427a5975.js?file=Jenkinsfile"></script>
      <p>I'm not 100% sure if that last email block is needed, but it worked and I don't feel
      like messing with it.&nbsp;</p><p>Also our builds are running against
      BitBucket using a Jenkins plugin, and even though we have it setup without needing polling, we
      still needed that Bitbucket poll hack. So here you go!</p>
