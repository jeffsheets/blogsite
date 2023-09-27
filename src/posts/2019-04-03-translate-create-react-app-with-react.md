---
layout: post
title: Translate Create React App with React-Intl
date: '2019-04-03T21:52:00.001-05:00'
author: Jeff Sheets
tags:
- javascript
- React
- i18n
modified_time: '2021-01-25T17:32:47.357-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-7623818450225667121
permalink: 2019/04/translate-create-react-app-with-react.html
---

<p>&nbsp;</p><p>The <a
      href="https://reactjs.org/">React ecosystem</a> is good at many things, including
      being able to quickly spin-up a solid dev stack with <a
      href="https://facebook.github.io/create-react-app/docs/getting-started">Create React
      App</a>. CRA provides a great core set of features (webpack, build scripts, jest tests,
      etc...) and solid documentation to easily create a production-ready application. The ecosystem
      is also understandably un-opinionated when it comes to choosing various libraries: like
      routing, css-in-js, state management, and in our case internationalization. This can leave
      each project team with an overwhelming array of choices that must be evaluated when setting up
      i18n.</p>
      <p><a
      href="https://www.w3.org/International/questions/qa-i18n">Internationalization</a>
      (i18n) is basically language translations -- a framework to extract text to easily have
      different language-packs for the same code base (e.g. English, Spanish, German, etc...). There
      are three main i18n react libraries to choose from: <a
      href="https://github.com/yahoo/react-intl">react-intl</a> (most popular), <a
      href="https://react.i18next.com/">react-i18next</a> (alternative), and <a
      href="https://lingui.js.org/index.html">LinguiJS</a> (newest). This post will skip
      the trade-study and assume you've come to the same conclusion as the popular and opinionated
      <a
      href="https://github.com/react-boilerplate/react-boilerplate/blob/master/docs/js/i18n.md">React
      Boilerplate</a> project, to use react-intl.</p>
      <p>Great, you have a framework, but now how to configure it without ejecting from Create
      React App? There are numerous blog posts and stackoverflows and github issues that try to
      explain how this can work. Some require ejecting from CRA, some require custom scripts per
      project, and some require complicated non-developer friendly coding patterns. The <a
      href="https://medium.com/@shalkam/create-react-app-i18n-the-easy-way-b05536c594cb">best
      post I found</a> comes close but uses a deprecated <a
      href="https://github.com/evenchange4/react-intl-cra">react-intl-cra
      framework</a>.</p>
      <p>So here are my 4 requirements for i18n to make it simple:</p>
      <ol><li>10 minute setup</li><li>Use Create React App without
      ejecting</li><li>Default language inline in the source</li><li>Easy
      i18n key extraction into translation files</li></ol>
      <p>For the TL;DR - you can jump straight to the <a
      href="https://gist.github.com/jeffsheets/b465a174eaccd7bd81c075964c0a9c5d">full code gist
      on github</a>.</p>
      <h3>⚙️ Install</h3>
      <p>Install react-intl, <a
      href="https://github.com/evenchange4/react-intl.macro">react-intl.macro</a>, and
      <a
      href="https://github.com/GertjanReynaert/react-intl-translations-manager">react-intl-translations-manager</a>
      with yarn.</p>
      <pre lang="bash">yarn install react-intl
      yarn install react-intl.macro
      yarn install --dev react-intl-translations-manager
      </pre>
      <p>Add a couple of commands to your package.json scripts block:</p>
      <pre lang="javascript">{
      "scripts": {
      "i18n:extract": "MESSAGE_DIR='./.messages' react-scripts build",
      "i18n:manageTranslations": "node ./translationRunner.js"
      }
      }
      </pre>
      <p>And add a small ./translationRunner.js file in the project root folder<br
      /><script
      src="https://gist.github.com/jeffsheets/b465a174eaccd7bd81c075964c0a9c5d.js?file=translationRunner.js"></script></p>
      <h3>🌎 Setup react-intl</h3>
      <p>In your top-level index.js, setup React-Intl to use a default language of en for
      English. The trick to not having a separate en.json translations file is in the
      defaultLocale="en" line. Since that matches the localeProp it will tell react-intl to just use
      the defaultMessages of each FormattedMessage key.<br /><script
      src="https://gist.github.com/jeffsheets/b465a174eaccd7bd81c075964c0a9c5d.js?file=src-index.js"></script></p>
      <p>The beauty is that now when coding you don't have to put a key in your src and go
      update a resource bundle to update the text of each component in separate files. The English
      text is in the component src making the dev workflow fairly simple. Note the magic of
      importing FormattedMessage from the react-intl.macro library (not from react-intl directly)
      this is to aid in extracting message id's later.<br /><script
      src="https://gist.github.com/jeffsheets/b465a174eaccd7bd81c075964c0a9c5d.js?file=src-components-App.js"></script></p>
      <p>Lastly set-up a small src/i18n/locales.js file. Ours has settings for Spanish, but
      you would add any additional languages here too.<br /><script
      src="https://gist.github.com/jeffsheets/b465a174eaccd7bd81c075964c0a9c5d.js?file=src-i18n-locales.js"></script></p>
      <p>This is all you need to start using i18n while coding! The next steps are only needed
      down the road you when you are finally ready to extract your keys for translation and deploy
      to production.</p>
      <h3>🔍 Extract message id's</h3>
      <p>React-intl.macro behind the scenes uses <a
      href="https://github.com/kentcdodds/babel-plugin-macros">babel-plugin-macros</a> and
      <a
      href="https://github.com/yahoo/babel-plugin-react-intl">babel-plugin-react-intl</a>
      to scan the static source for usages of FormattedMessage. It will then extract all the id's
      and defaultMessages into separate .message/*.json files. (Note: add the .message dir to your
      .gitignore file, as these are just transitional generated throw-away files)</p>
      <pre lang="bash">yarn i18n:extract
      </pre>
      <h3>✍️ Manage Translations</h3>
      <p>Now you have one simple "yarn i18n:manageTranslations" command to run that will
      bundle all of those ./message/*.json files into individual language files. For this example we
      are just translating to Spanish so a single es.json file will be created. The beauty of <a
      href="https://github.com/GertjanReynaert/react-intl-translations-manager">react-intl-translations-manager</a>
      is that it will also merge any new keys it finds into your existing es.json, AND tell you
      about any "Untranslated keys" that are still set to the English default so you know EXACTLY
      what keys need to be translated!</p>
      <pre lang="bash">yarn i18n:manageTranslations
      </pre>
      <p>The Spanish src/i18n/translations/es.json output file will look similar to this
      (notice how it has the default English values still before manually translating). You'll want
      to commit this file to your git repo after translating the values:</p>
      <pre lang="javascript"> {
      "app.title": "Sample App",
      "app.hello.user": "Hello {username}! Welcome!"
      }
      </pre>
      <p>Sample translated file might be like:<br /><script
      src="https://gist.github.com/jeffsheets/b465a174eaccd7bd81c075964c0a9c5d.js?file=src-i18n-translations-es.json"></script></p>
      <h4>👋 Wrap Up</h4>
      <p>There are so many areas of i18n that we didn't discuss, like localization (l10n),
      globalization (g11n), pluralization, date formats, etc... There are also performance
      improvement opportunities like dynamically loading language files on demand, or code-splitting
      the language files, that could especially be worthwhile if your app supports many languages.
      Oh and don't forget to internationalize our Bootstrap, Material-UI, or AntD components too!
      However hopefully this post can get you up and running quickly, within 10-15 minutes, so you
      can spend more time writing code and less time worrying about how to extract translation
      messages in the future.</p><p><b>Cross-published on the Object Partners
      blog:&nbsp; </b><a
      href="https://objectpartners.com/2019/04/03/translate-create-react-app-with-react-intl/">https://objectpartners.com/2019/04/03/translate-create-react-app-with-react-intl/</a><br
      /></p>