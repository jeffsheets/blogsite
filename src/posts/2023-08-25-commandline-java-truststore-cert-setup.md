---
layout: post
title: Commandline Java Truststore Cert Setup
date: '2023-08-25T20:13:00.006-05:00'
author: Jeff Sheets
tags:
- Java
- Security
modified_time: '2023-09-05T20:31:42.150-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-6896574363426635081
permalink: 2023/08/commandline-java-truststore-cert-setup.html
---

<blockquote>Originally posted on the DevObsessed blog at <a
      href="https://www.devobsessed.com/post/commandline-java-truststore-cert-setup">https://www.devobsessed.com/post/commandline-java-truststore-cert-setup</a></blockquote>
      <p>A quick lesson learned in consulting is that most every software organization has
      custom tailored setups in a variety of ways. As consultants on our first days at a new client
      we'll begin gathering environmental information in all forms. We'll see a variety of
      programming languages, API gateways, infrastructure as code utilities, databases, and more. In
      our quest to quickly build confidence and cohesion between ourselves and our new partner team,
      we'll inevitably dive into project onboarding &amp; setup instructions. Our goals are to
      get up and running efficiently while updating the steps involved along the way.
      <p>
      Oftentimes setting up trust for enterprise self-signed certs is one of the initial setup steps
      to connect to APIs, npm/artifactory repositories, and git repos. For JVM based systems (which
      could be using Java, Kotlin, Groovy, or other JVM langs), this requires <a
      href="https://docs.oracle.com/javase/tutorial/security/toolfilex/rstep1.html">configuring
      the local Java Truststore</a>. You'll know that this setup is needed if hitting system
      URLs gives a <a
      href="https://stackoverflow.com/questions/6659360/how-to-solve-javax-net-ssl-sslhandshakeexception-error">dreaded
      Java SSLHandshakeException</a>. The error message received will list a domain URL that
      is not trusted at some point in the cert handshake chain.

      <h2>The Bad</h2>

      How many setup instructions go something like this:
      <p>
      1. Hit some site in a browser
      <br/>
      2. Click on some browser icon to open some cert menu, and click to export the cert to
      somewhere on the file system
      <p>
      Possibly from a Word doc with pictures. Or a wiki page with vague missing pieces. And it is
      almost always hard to follow and brittle.
      <p>
      Then the next step is to import this and other certs into the java cacerts file.
      <p>
      Or maybe one lead developer will get everything setup, and copy/email/share the cacerts file
      around the team. With the added confusion that nobody will now know how to add new certs in
      the future.
      <p>
      At DevObsessed, we’re obsessed with simplifying onboarding steps. We want to avoid documents
      of pictures and instructions to follow, and especially avoid setting things up without
      instructions on how to modify and maintain it in the future.
      ‍
      <h2>The Good</h2>

      Exporting and Importing certs can be done via the command-line. For some reason this is often
      difficult to find and piece together online, so here's the info all in one place to help your
      team improve your onboarding instructions. These steps have been fine-tuned over the past 4-5
      years of use, and are especially helpful on client locked-down Windows laptops.
      <p>
      <b>Step 1</b> - Identify the server/URL for the cert. Often the first site to use
      is the internal NPM/Artifactory repo. For our example we'll use `google.com` but replace this
      with your own servername to load your own certs.
      <p>
      <b>Step 2</b> - Create a folder locally to hold these certs, even if temporarily.
      For example: <pre>mkdir ~/.certs</pre> then <pre>cd ~/.certs</pre>
      <p>
      <b>Step 3</b> - Export the cert to a file using: <pre>openssl s_client
      -servername google.com -connect google.com:443 /dev/null | openssl x509 -inform PEM -outform
      DER -out google.com.cer</pre>
      <p>
      <b>Step 4</b> - Import the cert to the Java cacerts truststore:
      <pre>"$JAVA_HOME"/bin/keytool -keystore "$JAVA_HOME"/lib/security/cacerts -importcert
      -alias google.com -file google.com.cer</pre><br/>
      A couple of notes about this step:
      <ul>
      <li>the default java cacerts password is `changeit`</li>
      <li>if you get an update denied message, and on Windows, then try running in a Git Bash
      prompt As Administrator</li>
      <li>or in Windows File Explorer set security on cacerts file to MODIFY for all
      Users</li>
      <li>or on Mac/Linux use chmod</li>
      <li>if keytool is not found, define a JAVA_HOME environment variable (or replace
      $JAVA_HOME with the full path needed)</li>
      </ul>
      <p>

      <b>Step 5</b> - Restart your IntelliJ/Eclipe/VSCode IDE, and any network tabs, to
      ensure you use the updated cacerts file

      <h2>The Best</h2>

      That's it! And now to leave things in a better spot than when you started:
      <p>
      <b>Step 6</b> - Update your complicated onboarding instructions to these main
      steps 3 &amp; 4 for each unique self-cert / domain in your environment!