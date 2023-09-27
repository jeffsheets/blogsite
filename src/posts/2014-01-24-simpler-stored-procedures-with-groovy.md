---
layout: post
title: Simpler Stored Procedures with Groovy
date: '2014-01-24T20:56:00.025-06:00'
author: Jeff Sheets
tags:
modified_time: '2020-11-29T21:05:40.424-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-3908312511034837132
permalink: 2014/01/simpler-stored-procedures-with-groovy.html
---

<p>&nbsp;</p><p>(note: This feature has now been
      added to the Groovy language itself, see the SQL <a
      href="https://docs.groovy-lang.org/latest/html/api/groovy/sql/Sql.html#callWithRows(groovy.lang.GString,groovy.lang.Closure)">callWithRows</a>
      and <a
      href="https://docs.groovy-lang.org/latest/html/api/groovy/sql/Sql.html#callWithAllRows(groovy.lang.GString,groovy.lang.Closure)">callWithAllRows</a>
      methods!) <br /></p><p>Using Groovy almost makes calling Stored Procedures
      an enjoyable process. More like a less painful adventure. But since many large enterprises
      have thousands of stored procedures lying around, at least we can make calling them and using
      them a bit simpler than the <a
      href="http://docs.oracle.com/javase/tutorial/jdbc/basics/storedprocedures.html">Java
      counterpart</a> of <a
      href="http://dev.mysql.com/doc/refman/5.5/en/connector-j-usagenotes-statements-callable.html">registering
      inputs and outputs</a>.</p>
      <p>The <a href="http://groovy.codehaus.org/api/groovy/sql/Sql.html">Groovy Sql
      class</a> has <a href="http://groovy.codehaus.org/Database+features">many
      features</a> and we'll focus on two methods of interest for stored procedures: <a
      href="http://groovy.codehaus.org/api/groovy/sql/Sql.html#call(groovy.lang.GString,
      groovy.lang.Closure)">call()</a> to handle output parameters, and <a
      href="http://groovy.codehaus.org/api/groovy/sql/Sql.html#rows(groovy.lang.GString,
      groovy.lang.Closure)">rows()</a> to handle ResultSet rows.</p>
      <p>Calling an example GetACount stored proc on schema ABC with a lastName input and
      handling the output parameters is as simple as:<br /><script
      src="https://gist.github.com/jeffsheets/8461540.js?file=GroovySqlWithOutputsExample.groovy"></script></p>
      <p>Calling a similar FindByFirst that copies the ResultSet rows into a List of
      GroovyRowResult objects is also straight forward:<br /><script
      src="https://gist.github.com/jeffsheets/8461540.js?file=GroovySqlWithResultSetRows.groovy"></script></p>
      <p>Unfortunately the Sql class does not have a method to handle both output parameters
      AND a ResultSet in the same closure. <a
      href="http://jira.codehaus.org/browse/GROOVY-3048">GROOVY-3048</a> has been an open
      feature request since 2008. Until that feature is complete, I've created a simple SqlHelper
      class that adds a callWithRows() method.</p>
      <p>First, showing how to use callWithRows() to get the rows and output parameters in a
      closure. Notice that callWithRows() returns the result of the closure to the original caller
      for you.<br /><script
      src="https://gist.github.com/jeffsheets/8461540.js?file=GroovySqlWithOutputsAndResultSetRows.groovy"></script></p>
      <p>Now here is the source for SqlHelper.groovy. As an extension of Sql.groovy it can
      reuse many protected helper methods from the super class.<br /><script
      src="https://gist.github.com/jeffsheets/8461540.js?file=SqlHelper.groovy"></script></p>
      <p>Hopefully this was helpful in showing multiple Groovy ways of dealing with the burden
      of calling Stored Procedures.</p><p><b>Cross-published on the Object
      Partners blog:&nbsp; </b><a
      href="https://objectpartners.com/2014/01/24/simpler-stored-procedures-with-groovy/">https://objectpartners.com/2014/01/24/simpler-stored-procedures-with-groovy/</a><br
      /></p>