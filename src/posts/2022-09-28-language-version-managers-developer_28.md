---
layout: post
title: Language Version Managers - the Developer Parachutes
date: '2022-09-28T22:00:00.051-05:00'
author: Jeff Sheets
tags:
- Java
- javascript
modified_time: '2023-01-02T11:46:25.803-06:00'
thumbnail: https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVBIPMIyexTfx-l7aL1WdP9-IVNHauxvh7jOnayviQSq2cEHsCoA203_GG3eBtdFafGuMBIOpYLe2nDEl6-2lmUV1oNtW_-j0WZ1glTOPNANhRHf7wg2kgN3byPMe3u8j9S_Sp_qJb5VnkZ13r_Lvyv6kJMGBvh-X_18XWY7QpW2KNKPAqWw/s72-w640-c-h360/parachutes.jpg
blogger_id: tag:blogger.com,1999:blog-6970836.post-1135344485241833615
permalink: 2022/09/language-version-managers-developer_28.html
---


      <blockquote>Originally posted on the DevObsessed blog at <a
      href="https://www.devobsessed.com/blog/2022-09-28-language-version-manager-parachutes/">https://www.devobsessed.com/blog/2022-09-28-language-version-manager-parachutes/</a></blockquote>
      <div class="separator" style="clear: both;"><a
      href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVBIPMIyexTfx-l7aL1WdP9-IVNHauxvh7jOnayviQSq2cEHsCoA203_GG3eBtdFafGuMBIOpYLe2nDEl6-2lmUV1oNtW_-j0WZ1glTOPNANhRHf7wg2kgN3byPMe3u8j9S_Sp_qJb5VnkZ13r_Lvyv6kJMGBvh-X_18XWY7QpW2KNKPAqWw/s1600/parachutes.jpg"
      style="display: block; padding: 1em 0px; text-align: center;"><img alt="" border="0"
      data-original-height="2160" data-original-width="3840" height="360"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVBIPMIyexTfx-l7aL1WdP9-IVNHauxvh7jOnayviQSq2cEHsCoA203_GG3eBtdFafGuMBIOpYLe2nDEl6-2lmUV1oNtW_-j0WZ1glTOPNANhRHf7wg2kgN3byPMe3u8j9S_Sp_qJb5VnkZ13r_Lvyv6kJMGBvh-X_18XWY7QpW2KNKPAqWw/w640-h360/parachutes.jpg"
      width="640" /></a></div>
      <div class="contant">
      <blockquote>
      <p>Installing multiple language versions (e.g. Java 11, Java 19, Java 8 | Node 8, Node
      16 | Python 2, Python 3 |
      etc) on your machine is scary, and not for the faint of heart.
      Conquer your fears with the benefit of a developer parachute, by using a Language Version
      Manager!</p>
      </blockquote>
      <p>As software engineering consultants at DevObsessed, we get asked to help with a
      various assortment of projects – from
      legacy codebases
      running in maybe Java 8 or NodeJS 6, to greenfield creations using the newest versions of Java
      19 or NodeJS 16. This
      isn’t
      only an issue between companies though, as most organizations have various versions of
      languages running at any
      given time too. Managing local installations of Java, Node, Python, Ruby, Elixir, etc can be
      daunting. In the past,
      trying out the latest version to check for bugs could lead to a developer’s machine being down
      for hours at a time. And
      if a rollback to a previous version was needed that could take even longer! Wouldn’t it be
      great if you could have a
      parachute with you on your mission, so that if anything goes wrong you can easily save
      yourself and proceed with
      confidence?
      Language Version Managers are your answer. Many version managers exist, and in this post we’ll
      show you how
      Sdkman for Java, and NVM for Node can provide you the courage to easily utilize multiple
      language versions without
      any worry in the process.</p>
      <h3 id="backstory">Backstory</h3>
      <p>To set the scene, you should know that originally this blogpost was going to be about
      the recent release of
      <a href="https://twitter.com/java/status/1572243891562381313">Java 19</a>. It
      would be a story about the newest and latest Java
      features, maybe how to use them, and probably why they would make it great for you to
      upgrade.</p>
      <p>Without thinking about it, using <a href="https://sdkman.io/">Sdkman</a>
      with a quick
      <code>sdk install java 19-open</code>
      and my MacbookPro was running the newest Java within
      seconds. It was so easy to upgrade to the cutting edge version, that it was summed up easily
      in
      <a href="https://twitter.com/sheetsj/status/1572298842460286980">a single
      tweet</a>:</p>
      <p><a
      href="https://twitter.com/sheetsj/status/1572298842460286980"></a></p><figure><a
      href="https://twitter.com/sheetsj/status/1572298842460286980"><img alt="Tweet saying
      Living on the edge with an image showing sdkman installing Java 19" border="0" width="400"
      data-original-height="1048" data-original-width="1176"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBpSj2WhapZcKVbAgBSPy0bCwred94fTexg5V_NIyyKpr4RGJs1AlQiz_Ljngn6Zqpm2h4PAqnrAkk8vfzpjqrBYVYzBCqMYqHW7Q-KSnB_6MbVx_QIJFR1zlOKsrlhP5FWDoiBI04h9L8eAPQejcbesr4s-qZVFAD8WdV1bSAHf58bbblPQ/s400/sdkman-tweet.png"/></a><figcaption><a
      href="https://twitter.com/sheetsj/status/1572298842460286980">
      </a><p><a href="https://twitter.com/sheetsj/status/1572298842460286980">
      </a><a
      href="https://twitter.com/sheetsj/status/1572298842460286980">[https://twitter.com/sheetsj/status/1572298842460286980]</a></p>
      </figcaption>
      </figure>
      <p></p>
      <p>Not until this moment did <a
      href="https://twitter.com/sheetsj/status/1572324247351197696">I dive in</a> to see
      that Java 19 was
      more of an incremental release. Some bugfixes for sure, but mostly it includes just
      some <a href="https://openjdk.org/projects/jdk/19/">Preview and Incubator
      features</a>
      (hiding behind feature flags) that won’t be fully live until Java 20 or beyond.</p>
      <p>So after a few moments of trying
      out <a href="https://twitter.com/sheetsj/status/1572316099030687744">Gradle</a>
      and <a href="https://twitter.com/sheetsj/status/1572319232096088064">IntelliJ</a>
      support, I quickly reverted back to my previous Java version with <code>sdk default java
      18.0.2.1-open</code>. No fuss and no worry.
      Then it dawned on me how before Sdkman this would have taken me probably many minutes if not
      hours of work to flip back
      and forth of Java installation versions.</p>
      <h3 id="sdkman-for-java">Sdkman for Java</h3>
      <p><a href="https://sdkman.io/"></a></p><figure><a
      href="https://sdkman.io/"><img alt="Sdkman logo" border="0" width="320"
      data-original-height="171" data-original-width="294"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjSjLeCN55WQX4jBPQEu3fbcpgv-owsGNTlMny3nbNjJZbBSyKcOwcZuTX3HbjVnNE8pBOC7oc3-3sDUxgcjpGMH_qhm6CmtmvIkwcpVsM8ApITxJObEBxkfa9DPzsH4FRIkUau9FsRN5FqzWABueWAMnPdMNmr6sHrcDTiRYRijJxnfQa0Lw/s320/sdkman.png"/></a><figcaption><a
      href="https://sdkman.io/">
      </a><p><a href="https://sdkman.io/">
      </a><a href="https://sdkman.io/">[sdkman.io]</a></p>
      </figcaption>
      </figure>
      <p></p>
      <p><a href="https://sdkman.io/">Sdkman</a> is the best Language Version
      manager for Java and all JVM languages, to include Groovy, Kotlin, and more. Don’t
      use <code>brew</code> or Oracle or some other installer on your macbook. Instead,
      install Sdkman and use a few commands to manage
      the version that you use.</p>
      <ul>
      <li>Use the install instructions for Sdkman from <a
      href="https://sdkman.io/">https://sdkman.io/</a></li>
      <li><code>sdk ls java</code> to see the various versions of Java that are
      available</li>
      <li><code>sdk install java 18.0.2.1-open</code> to install the Java18
      OpenJdk version (or <a href="https://sdkman.io/jdks">pick your favorite
      distribution</a> from Azul or Microsoft or Amazon, etc)</li>
      <li>The <code>use</code> keyword can switch the version for a single shell
      window, like <code>sdk use java 19-open</code></li>
      <li>The <code>default</code> keyword will setup a default for your whole
      machine, like <code>sdk default java 18.0.2.1-open</code></li>
      <li>Similarly use the same commands for Groovy <code>sdk ls groovy</code>,
      or Kotlin, or <a href="https://sdkman.io/sdks">any of the 20+ various JVM
      languages</a>!</li>
      </ul>
      <h3 id="nvm-for-nodejs">NVM for NodeJS</h3>
      <p><a href="https://github.com/nvm-sh/nvm"></a></p><figure><a
      href="https://github.com/nvm-sh/nvm"><img alt="NVM logo" border="0" width="320"
      data-original-height="100" data-original-width="283"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_Ozei4-RB0ozu947cflAQpaQT0OAR6B9YnOj0R1QJs1mwqjOBnF8a9tAX25BrI1p2lu_b-EXrQ7tN56AhIoMcJSbNkgC0s1NKdgi9rtG_1HVaAsWYIFz7HnOP88r6mXVWUjViYz4uW0pa9YdudnKuohDCguSNBc-bdAfHhEILLIBDFQXnBg/s320/nvm.png"/></a><figcaption><a
      href="https://github.com/nvm-sh/nvm">
      </a><p><a href="https://github.com/nvm-sh/nvm">
      </a><a
      href="https://github.com/nvm-sh/nvm">[https://github.com/nvm-sh/nvm]</a></p>
      </figcaption>
      </figure>
      <p></p>
      <p>In the Node world, there are a few options like <a
      href="https://github.com/nvm-sh/nvm">NVM</a>, <a
      href="https://github.com/tj/n">N</a>, <a
      href="https://github.com/Schniz/fnm">FNM</a>, and more.
      I’ve been a longtime user of NVM, so we’ll detail those instructions for use here:</p>
      <ul>
      <li>While unofficially supported, nvm can be installed with <a
      href="https://brew.sh/">homebrew</a> using <code>brew install nvm</code>
      <ul>
      <li>Follow any additional instructions to setup your shell in .zsh or .bash_profile or
      whatever shell you use</li>
      <li>Or find other installation instructions at <a
      href="https://github.com/nvm-sh/nvm#install--update-script">https://github.com/nvm-sh/nvm#install–update-script</a></li>
      </ul>
      </li>
      <li><code>nvm ls</code> to see the available Node versions</li>
      <li><code>nvm install --lts</code> to get the latest stable LTS (Long Term
      Support) version</li>
      <li><code>nvm install v8.17.0</code> or similar to get a specific
      version</li>
      <li><code>nvm use v8.17.0</code> or similar to use a specific version in a
      single shell window</li>
      <li><code>nvm alias default v16.17.0</code> or similar to set a default
      version</li>
      </ul>
      <h3 id="wrap-up">Wrap-up</h3>
      <p>There are other various version managers for other languages. Ruby has <a
      href="https://github.com/rbenv/rbenv">rbenv</a> or <a
      href="https://rvm.io/">RVM</a>,
      Python has <a href="https://github.com/pyenv/pyenv">pyenv</a>, Elixir has <a
      href="https://github.com/taylor/kiex">kiex</a>, and many more.
      No matter what language you are on, the key is to find a language installation manager to
      handle the various versions
      that you may need to use.</p>
      <p>In the Java and Node worlds, Sdkman and Nvm are the parachutes you need for
      confidence, courage, and to save you
      from configuration management worry!</p></div>