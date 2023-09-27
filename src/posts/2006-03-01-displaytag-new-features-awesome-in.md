---
layout: post
title: Displaytag new features awesome (in theory)
date: '2006-03-01T10:06:00.000-06:00'
author: Jeff Sheets
tags:
modified_time: '2006-03-02T08:28:41.703-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-114122921990383342
permalink: 2006/03/displaytag-new-features-awesome-in.html
---

I was pumped to upgrade <a
      href="http://displaytag.sourceforge.net/">displaytag</a> yesterday from 1.0 to 1.1.
      We needed the new feature to <a href="http://jira.codehaus.org/browse/DISPL-245">include
      the caption and footer in an export</a>, along with some of the other <a
      href="http://displaytag.sourceforge.net/11/changes-report.html">new features</a> that
      are included in 1.1.<br /><br />First step was to download and install the
      displaytag.jar. I also installed the displaytag-export-poi.jar so I could use the <a
      href="http://jira.codehaus.org/browse/DISPL-162">new Excel POI support</a>.<br
      /><br />Then I had to upgrade our commons-lang, commons-beanutils, and
      commons-collections jars to the latest versions because of an update of the dependencies for
      displaytag. No big deal...<br /><br />Started up my server, and everything looked
      good so far. My displaytag table showed up and I thought I was good to go.<br /><br
      />Then I tried to export... Property not found... In displaytag 1.0 I used a decorator by
      simply saying decorator="my.MyDecorator" in the display:table tag. But now I get errors on the
      export because each export doesn't use my default decorator. So now I have to add <br
      /><blockquote>&lt;display:setProperty name="export.excel.decorator"
      value="my.MyDecorator"/><br /> &lt;display:setProperty
      name="export.csv.decorator" value="my.MyDecorator"/><br />
      &lt;display:setProperty name="export.pdf.decorator" value="my.MyDecorator"/><br
      /> &lt;display:setProperty name="export.xml.decorator"
      value="my.MyDecorator"/></blockquote><br />to every jsp that I'm using a
      decorator. I submitted a <a href="http://jira.codehaus.org/browse/DISPL-295">jira
      issue</a> to the displaytag team for this.<br /><br />Now my exports are
      working, but the <a
      href="http://www.jamesgood.com:8080/displaytag-examples-1.1-SNAPSHOT/example-new-export.jsp">caption
      and footer</a> were still not included, even though the release notes and jira issues
      say that this is fixed. I tried tweaking a few properties but nothing has worked. Anybody know
      the answer?<br /><br />Next I wanted to switch the Excel export to use the new POI
      support. The one comment in the changelog says to <br /><blockquote>configure it
      into your displaytag.properties using
      'export.excel.class=org.displaytag.export.ExcelHssfView'</blockquote><br
      />...Oops, I get a message saying that ExcelHssfView is not found. So I explode the jar and
      see that the package is incorrect. I changed to this<br
      /><blockquote>export.excel.class=org.displaytag.export.excel.ExcelHssfView</blockquote><br
      />and now my Excel exports look pretty :-)<br /><br />Lastly I wanted to add
      the new RTF export feature (which is <a
      href="http://jira.codehaus.org/browse/DISPL-245">very vaguely documented</a>, but has
      a <a
      href="http://www.jamesgood.com:8080/displaytag-examples-1.1-SNAPSHOT/example-new-export.jsp">cool
      demo</a>). Here is what I added to my displaytag.properties:<br
      /><blockquote>export.types=csv excel xml pdf rtf<br
      />export.rtf.class=org.displaytag.export.DefaultRtfExportView<br
      />export.rtf=true</blockquote><br />It seems like it starts to go, but then I
      get an exception during the RTF export. I'm wondering if this deals with my usage of the <a
      href="http://displaytag.sourceforge.net/11/export_filter.html">export
      filter</a>?<br /><br />I really love displaytag, and I'd really like these
      new features to work! Please fill me in, if anyone has gotten these items working. I added
      comments to the displaytag jira for each of these, and I'll update this post if I hear back
      from anyone...<br /><br />[Update 11:27] Thanks to Jorge for <a
      href="http://jira.codehaus.org/browse/DISPL-245?page=comments#action_59812">responding so
      quickly on the jira issue</a> for rtf exporting and caption/footer exporting. I'm
      working with him to see if we can get these two working...<br />[/Update]<br
      /><br />[Update 15:31] I've found some progress on <a
      href="http://jira.codehaus.org/browse/DISPL-245#action_59832">my issue</a>:<br
      />For the caption/footer issue:<br />I had to setup the new export classes for
      PDF/Excel in my displaytag.properties file like this:<br
      /><blockquote>export.pdf.class=org.displaytag.export.DefaultPdfExportView<br
      />export.excel.class=org.displaytag.export.excel.DefaultHssfExportView</blockquote><br
      />Apparently only these new classes will display the caption/footer? I didn't realize this
      before...<br /><br />Secondly, the new classes only work when I remove my
      Decorator. So I'm going to look into my decorator and see why it fails on the exporting. My
      decorator works fine for any of the old export classes, but not the new ones that were added
      for the caption/footer. It throws the previous stack trace with the new export classes for
      RTF, Excel, and PDF.<br /><br />For the RTF issue:<br />My setup from before
      works for RTF when I don't use my Decorator. There must be something that has changed in the
      new export classes that is different from the old for Decorator's.<br /><br
      />Thanks again to Jorge for helping me out....<br />[/Update]<br /><br
      />[Update March 2: 08:23] After some more trial and error, <a
      href="http://jira.codehaus.org/browse/DISPL-245#action_59839">and a little help from
      Jorge</a>, I found that the new export classes require your Decorator to implement
      <blockquote>org.displaytag.decorator.hssf.DecoratesHssf for Excel and<br
      />org.displaytag.render.ItextTableWriter.ItextDecorator for PDF and
      RTF</blockquote><br /><br />I just left the implemented methods blank, since
      I don't need them. But they need to be there for everything to work...<br />[/Update]