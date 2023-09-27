---
layout: post
title: Format groovy StreamingMarkupBuilder XML
date: '2008-09-30T13:22:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2008-09-30T13:22:52.016-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-1298753186339803051
permalink: 2008/09/format-groovy-streamingmarkupbuilder.html
---

Playing with groovy this week, and specifically the MarkupBuilder and
      StreamingMarkupBuilder classes to create XML documents. MarkupBuilder is simple but doesn't
      handle namespaces in a DSL friendly way. StreamingMarkupBuilder handles namespaces nicely but
      doesn't pretty-print format the xml in the output. And finding information on how to pretty
      print xml from StreamingMarkupBuilder is rather difficult on Google and the like, so here is
      the solution that I found using the Transformer class that ships with the JDK.<br
      /><br /><code><br />String indentXml(xml) {<br /> def factory =
      TransformerFactory.newInstance()<br /> factory.setAttribute("indent-number", 2);<br
      /><br /> Transformer transformer = factory.newTransformer()<br />
      transformer.setOutputProperty(OutputKeys.INDENT, 'yes')<br /> StreamResult result = new
      StreamResult(new StringWriter())<br /> transformer.transform(new StreamSource(new
      ByteArrayInputStream(xml.toString().bytes)), result)<br /> return
      result.writer.toString()<br />}<br /></code><br />xml is the output
      from the .bind call on StreamingMarkupBuilder. And the setAttribute call on TransformerFactory
      is needed to get around a JDK bug.