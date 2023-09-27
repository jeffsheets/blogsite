---
layout: post
title: Custom sort key with Ext JS Grids
date: '2008-02-28T21:37:00.004-06:00'
author: Jeff Sheets
tags:
modified_time: '2008-02-28T22:28:49.066-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-7780134736018746240
permalink: 2008/02/custom-sort-key-with-ext-js-grids.html
---

I've begun using <a href="http://extjs.com/">Ext JS</a> in the
      last few days. I'm very impressed by the professionalism and api documentation, but there is
      still a lot to be desired as far as installation and initial setup docs.<br /><br
      />Anyway... I spent a couple hours trying to track down a way to sort a column in my
      GridPanel by a value other than its text. That is, I want the column to sort on a keyed index
      that is different than just alphabetically sorting the text value. This seemed like something
      that should be built into the framework, like with <a
      href="http://displaytag.sourceforge.net/11/displaytag/tagreference.html#column">Displaytag</a>,
      but unfortunately it is not!<br /><br />Finally, after digging through the API
      docs, google searches, and ext forum searches, I <a
      href="http://extjs.com/forum/showthread.php?p=126479#post126479">found a
      solution</a>.<br /><br />Basically you have to define a custom sortType on
      the Record. Here is my example code that sorts cities on an arbitrary "FavoriteCity"
      index:<br /><code><br />function sortFavoriteCities(cityName) {<br
      />var sortOrder = {'New York':0, 'London':1, 'Chicago':2, 'Paris':3};<br />return
      sortOrder[cityName];<br />}<br /><br />var reader = new
      Ext.data.ArrayReader({}, [<br />{name: 'city', sortType: sortFavoriteCities},<br
      />{name: 'state'},<br />{name: 'country'}<br />]);<br
      /></code><br /><br />I just hope that this helps someone else save a few
      hours! And, it would be very nice if the Ext JS developers would add a helper method where we
      could just pass the "sortOrder" array into the sortType field as a custom sort order. <br
      /><code><code> {name: 'city', sortType: </code><code>{'New York':0,
      'London':1, 'Chicago':2, 'Paris':3}</code><code>}</code></code><br
      />Or extend that a step farther and allow sortType to use a different record as the sort
      key, like <code><br />{name: 'city', sortType: 'cityIndex'}, {name:
      'cityIndex'}</code>