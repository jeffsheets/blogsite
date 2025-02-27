---
title: 'Record and Replay External APIs for Kotlin SpringBoot'
description: 'Local dev with WireMock for 3rd Party APIs'
date: '2024-06-03T09:00:00.000-05:00'
tags:
- WireMock
- Kotlin
- Spring Boot
- Spring
---

Developing against brittle APIs from a different team (or 3rd party) can be frustrating, as you cannot control their availability. Using WireMock during development at runtime, we can easily record API interactions. We can then replay the APIs as mocks when developing locally. All of this can be configured with SpringBoot using Kotlin (or Java) and the setup is surprisingly minimal.

---

## Backstory and Options

For a recent frontend React + Kotlin project, we had a large amount of APIs to call from other teams within the organization. Most of the time this worked fine for local development, but for a few days a month other teams would be down or unavailable. We couldn't just stop development, and even worse -- if there was a production issue we needed a way to run locally using fake data from some of these API boundaries to reproduce and fix any issues. We called many APIs and trying to mock out all of the calls individually would have given great control but also taken much more time than we wanted to spend.

I remember years ago using the [Betamax Grails Groovy](https://github.com/betamaxteam/betamax) project to record/replay APIs which was based on [VCR from the Ruby on Rails](https://github.com/vcr/vcr) world. I wanted something similar, so we could record many different APIs at once.

We needed to mock not only for our React frontend, but also for our Kotlin SpringBoot APIs running on our local servers. Also, the APIs we call sometimes require our local Java truststores to be configured with certs ^[I've got you covered, if you need an easy way to [setup Java truststores](/2023/08/commandline-java-truststore-cert-setup) on commandline]. So a Java-based solution would mean we wouldn't have to re-configure the certs, vs using Node or Ruby or other and setting up certs in that tool.

Three main options kept popping up as possibilities:
1. [WireMock](https://wiremock.org)
    - Java based. Lots of documentation and blog helpers. Has a [record/playback option](https://wiremock.org/docs/record-playback/). Figured out how to wire it into a spring boot project and startup servers for multiple recorded APIs quickly.
2. [Mockserver](https://www.mock-server.com)
    - Java based. Appears like it could work too, though I didn't see a quick way to spin up multiple servers to host for multiple 3rd party APIs.
3. [Proxay](https://github.com/airtasker/proxay)
    - Javascript / Node based. Super easy to get running from a npm file. However, I didn't want to have to reconfigure our 3rd party certs for use by Node since they were already running in the Java truststore local world.

## The Wiremock Approach 💻

We're going to run Wiremock in a separate SpringBoot server locally, hosting multiple APIs on separate ports, and point our main dev server URLs to use the new endpoints ^[Thanks to [Recording APIs with WireMock](https://hceris.com/recording-apis-with-wiremock/) for the dev idea!].

We'll run the API server in 2 modes:
- In Record (proxy) mode: Wiremock will basically be a pass-thru proxy. Every API will call the real dev API endpoint, but Wiremock will record the calls. When the server shutsdown it will save the recordings to json files.
- In Playback mode: Wiremock will reply with any matched API calls that were previously recorded.

You can also modify the saved recorded files to match with wildcards, regular expressions, or any other technique the wiremock supports.

## Project Setup ⚙️

1. Let's create a new project using spring initializr ^[Thanks to [sublimit's blog](https://medium.com/@sublimit/avoid-unavailability-of-third-party-apis-with-a-simple-wiremock-service-ac5411615507) for the setup help!]
2. Go to the API Keys page at [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
3. Create a new secret key, and copy that value to your clipboard
4. Then either A) store that in a new env variable `export SPRING_AI_OPENAI_API_KEY=<your-key-here>` or B) you could paste it in the application.properties file, but that's pretty dangerous as you don't want to commit that file.
5. Also in application.properties, you need to set the model, which I have defaulted to `spring.ai.openai.chat.options.model=gpt-4`

## Create a controller to call ChatGPT ⌨️

I'm doing this in Kotlin, but you could use Groovy or Java or any other JVM language that works with Spring Boot here. You can see I've created two endpoints, one for a simple haiku, and one for a quote:

```kotlin
@RestController
class ChatController(val chatClient: ChatClient) {

    @GetMapping("/haiku")
    fun haiku(@RequestParam(defaultValue = "write a haiku about software engineering") message: String): String {
        return chatClient.call(message)
    }

    @GetMapping("/quote")
    fun quote(): String {
        val message = """
          Give me a random one-line quote from a famous computer scientist or software developer. 
          To help make it random, the first letter of the last name should coincide with 
            the current second of the current minute of time.
          Include a newline at the end of the quote
            """
        return chatClient.call(message)
    }
}
```

## Test it! 🚀

- `./gradlew bootRun` to launch the API, be default at localhost port 8080
- `curl localhost:8080/quote` and you'll see some inspirational quote like:
```
"Premature optimization is the root of all evil." - Donald Knuth
```
- `curl localhost:8080/haiku` to see something beautiful like:
```
Code lines intertwine,
Creating digital life,
In software, we find.
```

