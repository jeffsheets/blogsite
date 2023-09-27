---
layout: post
title: Creating a Spring @StrictDateTimeFormat Annotation
date: '2012-01-19T20:08:00.008-06:00'
author: Jeff Sheets
tags:
modified_time: '2020-11-29T20:12:52.540-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-1716286598963835308
permalink: 2012/01/creating-spring-strictdatetimeformat.html
---


      <p>Spring Formatters and Converters make it easy to annotate fields
      for conversion from Objects to Strings, and are especially useful in web apps. But there is no
      easy or straightforward way to strictly validate the String before parsing into an object,
      without creating a custom Formatter. Here is a reusable solution that uses a
      RegexParserDecorator to decorate any Spring Formatter to apply a regex pattern, in turn
      creating a @StrictDateTimeFormat annotation as an example implementation.</p>
      <p><strong>A little background</strong>: Spring 3.0 brought the <a
      href="http://static.springsource.org/spring/docs/current/spring-framework-reference/htmlsingle/spring-framework-reference.html#format-annotations-api">Converter
      and Formatter framework</a> with a concise <a
      href="http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/format/annotation/DateTimeFormat.html">@DateTimeFormat
      annotation</a>, simplifying the Date to Object conversion that previously took custom
      binders or other wiring code. With @DateTimeFormat you can easily supply a String pattern used
      to parse and print a Date (or joda DateTime) object. However, the annotation does not strictly
      validate the String before converting to a Date. For instance, supplying a MM/dd/yyyy pattern
      does NOT enforce a 4 digit year. Instead a 2 digit year will be accepted and parsed using the
      SimpleDateFormat rules. Similar loose checking goes for 1 digit days and months, and also the
      slash character used as a separator. It would be easy to just throw the <a
      href="http://docs.oracle.com/javaee/6/api/javax/validation/constraints/Pattern.html">@Pattern
      tag</a> onto your Date field except that @Pattern is <a
      href="http://docs.jboss.org/hibernate/validator/4.2/reference/en-US/html/validator-usingvalidator.html#validator-defineconstraints-builtin">only
      allowed on String fields</a>. Combining @Pattern and @DateTimeFormat is what drove the
      creation of @StrictDateTimeFormat:</p>
      <pre><code>
      //sample usage using defaults for regex and pattern
      @StrictDateTimeFormat
      private DateTime birthday;</code></pre>
      <p>Read more below for a discussion and snippets of code, and the entire codeset with
      comments is available on <a
      href="https://github.com/jeffsheets/StrictDateTimeFormat">github</a>.<br
      /><br /><strong>The RegexParserDecorator:</strong> The first step is to
      create a Regex Parser class that will apply a regex pattern to validate a String for us.
      Creating this as a Decorator gives the added benefit that you can easily wrap any Spring
      Formatter to apply Regex patterns. The constructor takes a Parser to wrap and a regex to
      apply; and the parse method first validates against the regex before passing onto the
      decorated Parser:</p>
      <pre><code>
      public RegexParserDecorator(Parser parser, String regex) {
      this.parser = parser;
      this.regexPattern = Pattern.compile(regex);
      }
      public T parse(String text, Locale locale) throws ParseException {
      if (!regexPattern.matcher(text).matches()) {
      throw new IllegalArgumentException("Text does not match regex: " + text);
      }
      return parser.parse(text, locale);
      }
      </code></pre>
      <p><strong>The @StrictDateTimeFormat Annotation: </strong>Next step is to
      setup the annotation interface class. It is very similar to DateTimeFormat but adds the field
      to hold a regex. The default regex allows 1 or 2 digit days and months, requires a forward
      slash as the separator, and enforces a 4 digit year. This can be easily overriden when
      applying the annotation to a field by supplying your own (regex="", pattern="") extension. A
      pattern is still required so make sure your pattern and regex are paired
      appropriately.</p>
      <pre><code>
      @Target({ElementType.METHOD, ElementType.FIELD, ElementType.PARAMETER})
      @Retention(RetentionPolicy.RUNTIME)
      public @interface StrictDateTimeFormat {
      public static final String REGEX_DEFAULT =
      "^(0?[1-9]|1[012])/(0?[1-9]|[12][0-9]|3[01])/dddd$";
      public static final String PATTERN_DEFAULT = "MM/dd/yyyy";
      String regex() default REGEX_DEFAULT;
      String pattern() default PATTERN_DEFAULT;
      }
      </code></pre>
      <p>Spring then requires a StrictDateTimeFormatAnnotationFormatterFactory to wire the
      annotation with the parser. Nothing fancy here as it borrows heavily upon Spring's own
      JodaDateTimeFormatAnnotationFormatterFactory. The getParser method applies our regex to the
      DateTimeFormat functionality:</p>
      <pre><code>
      public class StrictDateTimeFormatAnnotationFormatterFactory implements
      AnnotationFormatterFactory {
      ...
      public Parser getParser(StrictDateTimeFormat annotation, Class fieldType) {
      DateTimeParser parser = new DateTimeParser(forPattern(annotation.pattern()));
      return new RegexParserDecorator(parser, annotation.regex());
      }
      private DateTimeFormatter forPattern(String pattern) {
      return org.joda.time.format.DateTimeFormat.forPattern(pattern);
      }
      ...
      </code></pre>
      <p><strong>Hooking it all together: </strong> Here is the snippet from my
      applicationConfig.xml showing how the annotation is registered into Spring:</p>
      <pre><code>
      &lt;mvc:annotation-driven conversion-service="myConversionService" /&gt;
      &lt;bean id="myConversionService"
      class="org.springframework.format.support.FormattingConversionServiceFactoryBean"&gt;
      &lt;property name="formatters"&gt;
      &lt;list&gt;
      &lt;bean class="jeffsheets.util.format.StrictDateTimeFormatAnnotationFormatterFactory"
      /&gt;
      &lt;/list&gt;
      &lt;/property&gt;
      &lt;/bean&gt;
      </code></pre>
      <p>Hopefully this information is helpful in creating a reusable regex validating
      DateTime formatter for use in your own web
      application.</p><p>&nbsp;<b>Originally published by me on the Object
      Partners blog: </b><a
      href="https://objectpartners.com/2012/01/19/creating-a-spring-strictdatetimeformat-annotation/">https://objectpartners.com/2012/01/19/creating-a-spring-strictdatetimeformat-annotation/</a></p>