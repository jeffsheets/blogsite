---
layout: post
title: Weather XML, the new frontier?
date: '2004-05-18T14:21:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2004-05-18T14:21:41.400-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-108490810139912302
permalink: 2004/05/weather-xml-new-frontier.html
---

Today my quest has been to find some standards for disseminating weather
      data over the web. My initial reaction is, of course, that RSS would be a perfect fit!
      Technically we'd need to extend RSS to handle the weather data in XML format, but the basis is
      there. We just need to receive the weather anytime a sensor changes and display it to the
      user.
      <br />
      <br />The <a href="http://www.nws.noaa.gov/">National Weather Service</a>
      along with <a href="http://www.noaa.gov/">NOAA</a> (National Oceanic and
      Atmospheric Administration) have put up an <a
      href="http://www.nws.noaa.gov/alerts/">"Experimental" XML site</a>. From here I can
      grab an RSS 2.0 feed or a <a
      href="http://www.nws.noaa.gov/cgi-bin/nwsexit.pl?url=http://www.incident.com/cap/what-why-how.html">CAP</a>
      (Common Alerting Protocol) feed. Now CAP is interesting because it was very recently approved
      by OASIS as a <a
      href="http://www.oasis-open.org/news/oasis_news_05_05_04.php">standard</a>.
      <br />
      <br />To my point... CAP seems to be a great standard for Weather Alerts, but what about
      normal weather data? If I just want to know the wind speed / temp / humidity / etc, then
      where's the Weather XML standard? I found a couple posts about WeatherML but that was from
      2000 and looked abandoned. I'd like our sensors to output a standard markup, but only if we
      can find one. We just might have to right our own schema for this. Any ideas?
      <br />