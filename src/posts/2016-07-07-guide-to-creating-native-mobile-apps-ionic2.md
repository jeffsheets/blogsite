---
layout: post
title: Guide to Creating Native Mobile Apps with Ionic2
date: '2016-07-07T16:29:00.001-05:00'
author: Jeff Sheets
tags:
- iOS
- Ionic
- e85
- Ethanol
- Angular
- Android
- GasPumpr
modified_time: '2021-01-25T17:35:06.592-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-8107650580065920186
permalink: 2016/07/guide-to-creating-native-mobile-apps-ionic2.html
---

Over the last few years I've had a nice little side project called <a
      href="http://gaspumpr.com/">GasPumpr.com</a>. It is an ethanol efficiency calculator
      that determines the equivalent price-per-gallon of different ethanol blends. I use it to
      decide which gas is the most economical to purchase when standing at a pump that has different
      blends (no-ethanol, e10, e15, e85). You can read all about how it works and why at <a
      href="http://gaspumpr.com/about.html">http://gaspumpr.com/about.html</a>, but the
      TLDR is that ethanol has a lower energy output than gasoline so it needs to be cheaper to make
      it worth the reduced miles-per-gallon that it provides.<br />
      <br />
      It works great as a responsive mobile site, but I wanted to create a native app to make it
      available without a network connection. This is where <a
      href="http://ionicframework.com/docs/v2/">Ionic2</a> steps in. Ionic2 uses Angular2
      on top of Apache Cordova to generate native iOS and Android apps. It essentially allows for
      html/css/JS/AngularJS (which I know well) to be used instead of ObjectiveC/Swift (which I know
      very little).<br />
      <br />
      The purpose of this post is to roughly document the process that I went through to
      install/build/run/publish the GasPumpr Ionic2 application. There are many Ionic2 guides out
      there that I used as reference, so I'm using this post to mostly document any gaps along the
      way. All of the source is on GitHub in the <a
      href="https://github.com/jeffsheets/gaspumpr-ionic2">gaspumpr-ionic2</a>
      project.<br />
      <br />
      <h3>Installation</h3>Installation is covered well in the Ionic2 <a
      href="http://ionicframework.com/docs/v2/getting-started/installation/">Getting Started
      Guide</a><br />
      <ul><li><code>npm install -g ionic@beta</code></li>
      <li><code>ionic start gaspumpr --v2</code> {generates a default app with the
      'tabs template'}</li>
      <li><code>cd gaspumpr</code></li>
      <li><code>ionic serve</code><br />
      </li>
      </ul>The `ionic serve` runs the app in a browser in livereload mode. So any changes to
      the source will be noticed and rebuilt quickly and refreshed automatically into the browser. A
      simple thing, but if you've never used livereload you'll quickly find it irreplaceable. Now go
      into Chrome DevTools and enable the Device Toolbar by clicking the phone-icon on the top left
      of the toolbar. Now you can pick a phone size to easily see how the app will look on various
      browsers. <br />
      <h3>Device Emulators</h3>Before going further I wanted to see the app running in
      Android and iOS emulators.<br />
      <ul><li>Install Cordova - needed to run on the emulators</li>
      <ul><li><code>sudo npm install -g cordova</code><br />
      </li>
      </ul><li>Android Emulator</li>
      <ul><li><code>ionic platform add android</code></li>
      <li>Install Android Studio from&nbsp;<a
      href="https://developer.android.com/studio/index.html">https://developer.android.com/studio/index.html</a></li>
      <ul><li>After installing, launch it once and open project in
      platforms/android</li>
      <li>Then close Android Studio</li>
      </ul><li>Genymotion Android Emulator - free</li>
      <ul><li>Install from <a
      href="https://www.genymotion.com/">https://www.genymotion.com/</a></li>
      <ul><li>This requires creating an account</li>
      </ul><li>Launch Genymotion and create a Virtual Device (I chose the Samsung Galaxy
      S6)</li>
      <li>Now run the Virtual Device</li>
      </ul><li><code>ionic run android</code><br />
      </li>
      <li>At this point I received an error like <code>Warning:Gradle version 2.10 is
      required. Current version is 2.2.1. If using the gradle wrapper, try editing the
      distributionUrl in gaspumpr\gradle\wrapper\gradle-wrapper.properties to
      gradle-2.10-all.zip</code><br />
      <br />
      I think I got it because I had an older AndroidStudio previously installed before I did the
      `add android` command. In any case, the fix is to edit
      <code>platforms/android/cordova/lib/builders/GradleBuilder.js</code> and change
      the distributionUrl gradle wrapper to be 2.10 <a
      href="https://github.com/jeffsheets/gaspumpr-ionic2/commit/5e8abe13780e06660fb64c34b187d4e25eadc4a1/platforms/android/cordova/lib/builders/GradleBuilder.js">like
      this</a>.<br />
      <br />
      Next I had an error like <code>Error executing "adb devices": ADB server didn't ACK *
      failed to start daemon *</code>. Fix this by going into Genymotion settings for ADB and
      select custom Android SDK and select your SDK location (mine is
      /users/jeffsheets/Library/Android/sdk). Thanks to <a
      href="http://gonehybrid.com/build-your-first-mobile-app-with-ionic-2-angular-2-part-7/">this
      tutorial</a> for the fix.<br />
      <br />
      After fixing this and running <code>ionic run android</code> I could see the app
      in the android emulator.<br />
      </li>
      </ul><li>iOS Emulator</li>
      <ul><li>Install/update XCode on your Mac</li>
      <li><code>ionic emulate ios</code> {this will launch in the default emulator
      - iPhone 6s Plus for me}<br />
      </li>
      <li><code>ionic emulate ios --target="iPhone-6s, 9.3"</code> {for running on
      6s, similar for 5s}<br />
      </li>
      <ul><li>Note: Supposedly you can run ionic emulate ios with --livereload to see
      file changes quickly in the emulator. But I couldn't get it to work, so after any file change
      I'd have to rerun this command to see the changes.</li>
      </ul></ul></ul><h3>Development</h3>At this point I roughly
      copied all of the html source from GasPumpr.com into the page1.html and page2.html files.
      Along with the styles into the appropriate style files.<br />
      <br />
      Only a couple of notes on development.<br />
      <ul><li>It wasn't clear where to add images that were used in the app. I settled
      on adding them in <code>www/img</code> folder and then in the css referenced the
      location like <code>background-image:
      url(../../img/gas-icon.png);</code>.</li>
      <li>I wanted to select a Tab via a separate button click. &nbsp;This <a
      href="http://stackoverflow.com/a/36482774/1469525">StackOverflow answer</a> helped me
      out.</li>
      </ul><h3>Ionic View</h3>The Ionic team has provided an <a
      href="http://ionicframework.com/docs/cli/uploading_viewing.html">Ionic View</a> app
      that can render your app on device by basically just pushing the html/JS/css to the device. It
      is REALLY SIMPLE to get working so this is an easy step to quickly see your app running on iOS
      or Android. (And as a friend pointed out, it is a great way to have your kids create apps and
      easily share them with friends and family!)<br />
      <ul><li>The <a
      href="http://ionicframework.com/docs/cli/uploading_viewing.html">tutorial steps</a>
      are mostly correct</li>
      <ul><li>Signup for an account on&nbsp;<a
      href="https://apps.ionic.io/signup">https://apps.ionic.io/signup</a></li>
      <li>Run command <code>ionic upload</code> and enter username and
      password<br />
      </li>
      <ul><li>At this point I had a weird error that wasn't very helpful in google. The
      answer is to change the ID of the app because it is using the default tabs template ID. So go
      into config.xml and change the widget ID to something unique for your app. I chose
      <code>com.sheetsj.gaspumpr</code> for mine. This is also a good time to edit the
      name/description/author details. Then run `ionic upload` again</li>
      </ul><li>Install and run the Ionic View app from the App/Play Store</li>
      <ul><li>Login to app and you should see your application. Run it!</li>
      </ul></ul><li>Note: when doing this, ionic creates a .io-config.json file
      that holds your Ionic View api-key. This file is not in .gitignore by default, but I added it
      so that the api-key is not uploaded to github. Feels like a best practice that everyone should
      follow.</li>
      </ul><h3>Test on iOS Device</h3>Testing directly on my iPhone SE was fairly
      easy too. It is also free to test on your device now with the latest iOS versions. (sorry no
      steps for testing on Android because I didn't have one available)<br />
      <br />
      I mostly followed these StackOverflow steps to <a
      href="http://stackoverflow.com/a/4952845/1469525">Deploy to your own iOS
      device</a>.<br />
      <br />
      <ul><li>In XCode go into Preferences and add your Apple ID</li>
      <li>Open the project from platforms/ios in XCode</li>
      <li>In the Scheme Selector (next to the Play and Stop buttons in toolbar) select your
      application</li>
      <li>Plug your phone into Mac via USB cable</li>
      <li>Select your phone in the Device Selector (next to Scheme Selector)</li>
      <ul><li>I think I had certificate messages at this point. I clicked a 'fix' button
      in XCode which generated certs.</li>
      </ul><li>Now click the Run button</li>
      <ul><li>First time I got a message to go onto Phone &gt; Settings and enable
      the app to be executed. Just follow the steps and it worked fine.</li>
      </ul><li>See the app on the phone!</li>
      <ul><li>I was surprised to see the app stays on the phone when disconnected. I
      didn't realize till now that you can create and run and keep your own apps on your iPhone for
      free. Pretty cool. (yeah, Android people can roll your eyes here)</li>
      </ul></ul><h3>Setup App Icons</h3>Ionic has a nice <a
      href="http://ionicframework.com/docs/cli/icon-splashscreen.html">`resources`
      utility</a> that can generate App Icons and Splashscreens of all sizes for iOS and
      Android for you. For icons just add a 192x192 pixel PNG named icon.png to the resources
      folder. Then run <code>ionic resources</code> and it will upload your image to an
      ionic server and process and download icons for you into the correct folders.<br />
      <br />
      Now you can push the app to iPhone and see the real icon on the phone!<br />
      <h3>Publish to Android Play Store</h3>Following the <a
      href="http://ionicframework.com/docs/guide/publishing.html">ionic guide</a> worked
      perfectly to <a
      href="https://play.google.com/store/apps/details?id=com.sheetsj.gaspumpr&amp;hl=en">deploy
      to the Play Store</a>.<br />
      <br />
      <ul><li>The most time consuming part was taking screenshots from the emulators and
      saving them to the random pixel sizes required by the Play Store submission
      process.</li>
      <li>Also it needed a Privacy Policy link on the web. So I just created a simple <a
      href="https://github.com/jeffsheets/gaspumpr-ionic2/blob/master/privacyPolicy.txt">privacyPolicy.txt</a>
      file, added it to GitHub, and linked to the <a
      href="https://raw.githubusercontent.com/jeffsheets/gaspumpr-ionic2/master/privacyPolicy.txt">raw
      version</a>.</li>
      </ul><h3>Publish to Kindle Store</h3>The process to publish to the Kindle
      Store was easy once the .apk was already built for the Android Google Play Store. Just fill
      out the Kindle Store Publishing info, upload the same .apk file, and generate some more
      screenshots of random pixel ratios. And like that it is also <a
      href="https://www.amazon.com/Madison-Sheets-GasPumpr/dp/B01I27SAEA/ref=sr_1_1?s=mobile-apps&ie=UTF8&qid=1467926673&sr=1-1&keywords=gaspumpr">published
      to the Kindle Store</a>.<br />
      <br />
      <h3>Publish to iOS Apple App Store</h3>I also plan to publish this to the Apple
      App Store using <a href="http://ionicframework.com/docs/guide/publishing.html">these
      instructions</a>. I'm just waiting because of the high $100 price tag! Once completed
      I'll update with any progress here.<br />
