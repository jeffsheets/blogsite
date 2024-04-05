---
title: 'Calling OpenAI GPT-4 from Kotlin with Spring-AI'
description: 'A DIY GenAI Quote and Haiku Generator REST API'
date: '2024-04-05T09:00:00.000-05:00'
tags:
- GenAI
- ChatGPT
- Kotlin
- Spring Boot
- Spring
---

Generative AI is all the hype lately, so why not show how to call the OpenAI GPT-4 ChatGPT API from Kotlin using Spring-AI?!? It can be done with a surprisingly small amount of upfront setup. So here is an example REST API that returns either a Quote or a Haiku written by the all-knowing genie of GenAI itself -- GPT-4.

---

## The Goal 🤔

- Create a `localhost:8080/quote` endpoint that can give a random quote from a computer scientist.
- And for fun, another endpoint at `localhost:8080/haiku` to add some joy to your life.

> TL&DR; Time is short -- If you only want the code, jump to the src in Github at [github.com/jeffsheets/genai](https://github.com/jeffsheets/genai)

## The Setup 💻

You can jumpstart the journey by generating a Spring Kotlin project from the [Spring Initializr](https://start.spring.io). Add dependencies of `Spring Web` and `OpenAI`. Then download the artifact and open your project in IntelliJ. (Or clone my repo from [github.com/jeffsheets/genai](https://github.com/jeffsheets/genai))

This will pull in the [Spring-AI library](https://docs.spring.io/spring-ai/reference/api/clients/openai-chat.html) project that is part of Spring Boot, including the adapters utilized for communicating with OpenAI.

{% imagePlaceholder "./src/assets/images/posts/genai-spring-initializer.png", "Spring Initializer with OpenAI starter options" %}

## OpenAI Key Setup 🔐

1. You'll need an OpenAI ChatGPT account, so go do the free signup now if you haven't already
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

### That's it???

I know right?!? This simple integration is all it takes to call into the GenAI world and have some genie answer like they are from the future. Hopefully this distills some of the hype. The real magic lies in figuring out how best to harness this in a meaningful way in your own software. Also a big thanks to Dan Vega for inspiring this demo from the [Spring AI Intro video](https://www.youtube.com/watch?v=yyvjT0v3lpY)
-- Cheers!
