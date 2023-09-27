---
layout: post
title: Converting Arrays to Lists in Java 5
date: '2005-12-13T14:15:00.000-06:00'
author: Jeff Sheets
tags:
modified_time: '2005-12-14T09:19:01.756-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-113450492936807494
permalink: 2005/12/converting-arrays-to-lists-in-java-5.html
---

I'm trying to write some Java 5 (or 1.5, whatever) code for the first time.
      This is how I used to convert an array to a List in 1.4:<br /><code>List list =
      Arrays.asList(intArray);</code><br />However, Java 5 gives me an error as
      Arrays.asList(intArray) actually returns a List&lt;int[]>. That's right, a list of int
      arrays with a size of 1 instead of a List&lt;Integer>, List of ints with size
      intArray.length.<br /><br />So is this correct? Does Arrays.asList(intArray) no
      longer work for my needs?<br /><br />For now I am forced to use the following,
      unless someone can show me the light:<br /><code><br
      />List&lt;Integer> list = new ArrayList&lt;Integer>();<br />for
      (Integer i : intArray) list.add(i);<br /></code><br /><br
      /><blockquote>Update:<br />j yu has helped me to understand the issue at hand,
      as I have noted in the comments below. Here is the logic for easier viewing...<br
      /><br />Under 1.4, you will receive a compile time error for asList(int[]), but under
      1.5 asList(int[]) is acceptable with the varargs implementation. 1.5 accepts the array as an
      object and creates a List&lt;int[]> instead of the List&lt;Integer> that I had
      expected through autoboxing.<br /><br />Try this for yourself:<br
      /><code>int[] intArray = new int[] { 1, 2, 3, 4, 5, 6 };<br
      />System.out.println(Arrays.asList(intArray).size());<br /><br />Integer[]
      integerArray = new Integer[] { 1, 2, 3, 4, 5, 6 };<br
      />System.out.println(Arrays.asList(integerArray).size());</code><br /><br
      />Your output will be:<br /><code>1<br />6</code><br />Since
      the asList works very differently with int[] and Integer[].<br /><br />Maybe this
      should be a warning in Eclipse? It is confusing for both expert and novice users. Or should
      this even be the correct approach? Shouldn't the Arrays.asList(int[]) autobox the int's into a
      Integer[] for you?<br /><br />Or is there still an easier solution for me? Maybe
      through casting or generics? I stumbled upon this while converting int[] to List during a
      Topcoder event, after updating my jdk from 1.4 to 1.5<br /></blockquote><br
      /><blockquote><br />Update #2:<br />In a normal app, it would be easy for
      me to import the Apache Lang jar, and use <a
      href="http://jakarta.apache.org/commons/lang/api/org/apache/commons/lang/ArrayUtils.html#toObject(int[])">ArrayUtils.toObject(intArray)</a>.
      However I'm trying to do this inside of the Topcoder arena applet, so I can't include any
      external jars. That's why I was looking for an api level solution.<br
      /></blockquote>