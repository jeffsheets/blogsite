---
layout: post
title: Using Struts multibox and radio tags
date: '2005-04-08T13:27:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2006-02-20T23:08:12.450-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-111298487838436332
permalink: 2005/04/using-struts-multibox-and-radio-tags.html
---

I've found a great way to use both the Struts multibox and radio tags, and
      just want to document it here for my future use.<br /><br />The multibox is a tag
      to output multiple linked checkboxes, so the user can select multiple items at once. The radio
      is the same idea, but for a single select.<br /><br />My jsp piece looks like
      this, and it generates a table with a radio button as the first field:<br
      /><code><br /> &lt;c:forEach var="data"
      items="${MyForm.dataList}"&gt;<br /> &lt;tr&gt;<br />
      &lt;td&gt;&lt;html:radio property="selectedData"
      value="${data.id}"/&gt;&lt;/td&gt;<br /> &lt;td&gt;&lt;c:out
      value="${data.name}"/&gt;&lt;/td&gt;<br /> &lt;td&gt;&lt;c:out
      value="${data.location}"/&gt;&lt;/td&gt;<br /> &lt;/tr&gt;<br
      /> &lt;/c:forEach&gt;<br /></code><br /><br />Now, you can
      change it to a multiselect version using the multibox by replacing the html:radio tag with
      this one:<br /><code>&lt;html:multibox property="selectedData"
      value="${data.id}"/&gt;</code><br /><br />In my MyForm, I have a
      <code>public List getDataList()</code> and a <code>public String
      getSelectedData()</code> for the single select with the radio button. For the
      multiselect with the multibox you have to use <code>public String[]
      getSelectedData()</code> instead. (of course, both need the corresponding
      setSelectedData() method...)<br /><br />[edited to remove confusing custom
      rowColor tag, 2/20/2006]