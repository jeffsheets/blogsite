---
layout: post
title: REST Client Testing With MockRestServiceServer
date: '2013-01-09T20:17:00.007-06:00'
author: Jeff Sheets
tags:
modified_time: '2020-11-29T20:29:52.251-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-2476788976296005092
permalink: 2013/01/rest-client-testing-with.html
---

<p>&nbsp;</p><p>Functionally testing a REST Client is
      simple with the new MockRestServiceServer if you are using Spring’s RestTemplate to power the
      client. This is <a
      href="http://static.springsource.org/spring/docs/3.2.x/spring-framework-reference/html/testing.html#spring-mvc-test-client">a
      new feature in Spring 3.2.x</a> but was available via the <a
      href="https://github.com/SpringSource/spring-test-mvc">spring-test-mvc project</a>
      starting with Spring 3.1.x (extra spring-test-mvc.jar required). The documentation is a little
      light in the spring reference manual so hopefully this example can help you piece it
      together.</p>
      <p>Previously you might have had unit tests that mocked the RestTemplate but didn’t
      fully test the calls and error handling provided with the framework. Or you created an
      elaborate fake server environment just to spit back valid and invalid responses. <a
      href="http://static.springsource.org/spring/docs/3.2.x/javadoc-api/index.html?org/springframework/test/web/client/MockRestServiceServer.html">MockRestServiceServer</a>
      takes the approach of mocking the server and allowing you to specify expected behavior and
      responses in your junit test class. This allows you to fully test your handling of the
      RestTemplate client and server exception classes.</p>
      <p>This example only shows how the mock server works. In a real environment you’d
      probably use <a
      href="http://static.springsource.org/spring/docs/3.2.x/javadoc-api/index.html?org/springframework/web/client/RestTemplate.html">RestTemplate</a>
      with Jackson for object to json mapping and possibly Spring @Async for asynchronous
      calls.</p>
      <p>SimpleRestService is a sample REST client that makes a call to a URL and handles
      successes and errors by returning them in the result string. We'll use this as an example for
      our junit test cases:<br /><code></code></p>
      <p><code><code></code></code></p>
      <pre>@Service
      public class SimpleRestService {
      @Autowired
      private RestTemplate restTemplate;

      public String getMessage() {
      String result;
      try {
      String httpResult = restTemplate.getForObject("http://google.com",
      String.class);
      result = "Message SUCCESS result: " + httpResult;
      } catch (HttpStatusCodeException e) {
      result = "Get FAILED with HttpStatusCode: " + e.getStatusCode()
      + "|" + e.getStatusText();
      } catch (RuntimeException e) {
      result = "Get FAILEDn" + ExceptionUtils.getFullStackTrace(e);
      }
      return result;
      }
      }
      </pre>
      <p><code></code></p>
      <p>The only real setup you need for testing is to configure your IDE to find the static
      imports. In Eclipse this is in Java&gt;Editor&gt;Content Assist&gt;Favorites. Add
      these to go along with the hamcrest CoreMatchers and junit Assert that you probably already
      have.<br />If using Spring 3.2.x:<br
      />org.springframework.test.web.client.match.MockRestRequestMatchers<br
      />org.springframework.test.web.client.response.MockRestResponseCreators<br />If using
      Spring 3.1.x, the static import classes are named differently:<br
      />org.springframework.test.web.client.match.RequestMatchers<br
      />org.springframework.test.web.client.response.ResponseCreators</p>
      <p>Each test will chain expect() and respond() methods. <a
      href="http://static.springsource.org/spring/docs/3.2.x/javadoc-api/index.html?org/springframework/test/web/client/match/MockRestRequestMatchers.html">MockRestRequestMatchers</a>
      offers many hamcrest matchers to check your request URL, headers, HTTP method, and even json
      and xpath matchers to check body content. <a
      href="http://static.springsource.org/spring/docs/3.2.x/javadoc-api/index.html?org/springframework/test/web/client/response/MockRestResponseCreators.html">MockRestResponseCreators</a>
      allows you to easily build both success and error responses.</p>
      <p>Also, each test must call mockServer.verify() after the RestTemplate call is made to
      run the Mock Server assertions.</p>
      <p>Setup the MockRestServiceServer in the setUp method:<br
      /><code></code></p>
      <p><code><code></code></code></p>
      <pre> @Before
      public void setUp() {
      mockServer = MockRestServiceServer.createServer(restTemplate);
      }
      </pre>
      <p><code></code></p>
      <p>testGetMessage() verifies our URL, GET HttpMethod, and returns a 200 Success with a
      text message of resultSuccess:<br /><code></code></p>
      <p><code><code></code></code></p>
      <pre> @Test
      public void testGetMessage() {
      mockServer.expect(requestTo("http://google.com"))
      .andExpect(method(HttpMethod.GET))
      .andRespond(withSuccess("resultSuccess", MediaType.TEXT_PLAIN));

      String result = simpleRestService.getMessage();

      mockServer.verify();
      assertThat(result, allOf(containsString("SUCCESS"),
      containsString("resultSuccess")));
      }
      </pre>
      <p><code></code></p>
      <p>testGetMessage_404() shows a response with the specific 404 Not Found client http
      status code:<br /><code></code></p>
      <p><code><code></code></code></p>
      <pre> @Test
      public void testGetMessage_404() {
      mockServer.expect(requestTo("http://google.com"))
      .andExpect(method(HttpMethod.GET))
      .andRespond(withStatus(HttpStatus.NOT_FOUND));

      String result = simpleRestService.getMessage();

      mockServer.verify();
      assertThat(result, allOf(containsString("FAILED"),
      containsString("404")));
      }
      </pre>
      <p><code></code></p>
      <p>testGetMessage_500() shows usage of the withServerError() convenience method:<br
      /><code></code></p>
      <p><code><code></code></code></p>
      <pre> @Test
      public void testGetMessage_500() {
      mockServer.expect(requestTo("http://google.com"))
      .andExpect(method(HttpMethod.GET))
      .andRespond(withServerError());

      String result = simpleRestService.getMessage();

      mockServer.verify();
      assertThat(result, allOf(containsString("FAILED"),
      containsString("500")));
      }
      </pre>
      <p><code></code></p>
      <p>Additional matcher test examples can be found in the <a
      href="https://github.com/SpringSource/spring-framework/tree/master/spring-test-mvc/src/test/java/org/springframework/test/web/client/samples">spring-test-mvc</a>
      section of the spring 3.2.x github repo.</p>
      <p>Hopefully the new mock server in Spring helps you as much as it helped me, by
      cleaning up and reducing the amount of testing code required in both a reusable and standard
      fashion. The full java code from these examples are on <a
      href="https://github.com/jeffsheets/MockRestServiceServerExample">my github
      page</a>.</p><p><b>Cross-published on the Object Partners blog:
      </b><a
      href="https://objectpartners.com/2013/01/09/rest-client-testing-with-mockrestserviceserver/">https://objectpartners.com/2013/01/09/rest-client-testing-with-mockrestserviceserver/</a><br
      /><b></b></p>