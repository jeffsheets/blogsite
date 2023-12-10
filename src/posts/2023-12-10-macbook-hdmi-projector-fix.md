---
title: 'Macbook HDMI Projector Fix'
description: 'Carry a HDMI USB-C Adapter in your bag, just in case'
date: '2023-12-10T09:00:00.000-05:00'
tags:
- Lifehack
- Apple
- Macbook
---

TL&DR -- pack an HDMI -> USB-C adapter in your bag to help connections to old projectors, even though your Macbook 
Pro already has an HDMI output port.

{% imagePlaceholder "./src/assets/images/posts/macbook-hdmi-adapter.jpg", "macbook hdmi usb-c adapter" %}

---

## Backstory 😰

We had a large extended family birthday party last night, and for the occasion I was put in charge of producing and 
projecting a slideshow video onto a screen in a rented banquet hall. Connecting to projectors can always be tricky 
-- in that **"the demo always fails"** kind of way -- as learned from many years of assisting and organizing 
presentations in various office spaces, user groups, and conferences. I was super thankful that we were able to do a 
test run the day before. My still very new Macbook Pro 2021 running the latest software shouldn't have much issue 
connecting to desktop monitors, ApplePlay screen sharing devices, and even iPads. But connecting to *random old 
projectors* in halls without the latest tech, while various family members in charge of the event planning anxiously 
watch for the results, is absolutely the most stressful kind of demo! 

No matter how many times we let them know that software engineering has nothing to do with random hardware 
connections to old devices, it won't matter because we were picked because *"we know computers"*. The real answer is we 
are picked because **"engineers are creative at figuring things out"** and this is the skill that comes in handy the 
most often!

So here is my friendly reminder to my future self on how to get through the sticky situation, when I forget 5 years 
from now how we got things working...

---

## The Problem 😨

I got to the hall, and quickly was happy to see an HDMI connection in the wall that connects to the projector. Plug 
and play was my hope. (quick aside: remember when [plug-n-play](https://en.wikipedia.org/wiki/Plug_and_play) meant 
not having to fiddle with jumpers and IRQ bus channels?)

{% imagePlaceholder "./src/assets/images/posts/macbook-hdmi-static.png", "projector background static" %}

Plugged in the Macbook to the projector, and briefly saw the screen appear on the projector! Success! Everyone doing 
room setup is super excited! But then, as demos go, the screen went away and became some background static. 

---

## The Solution ☺️

I had come prepared for various situations just in case the **"don't worry we have a projector for you ready to go"**
guarantee didn't pan out. I brought my own projector, speakers, hdmi cables, and more, just in case. But I *really
really* didn't want to have to resort to the backup plan. Luckily just then someone in the crowd said, **"hey I 
remember one
time with my mac I had to use a dongle for a projector"** -- which then stirred some long deep memory of having this
occur in the past to me too. And as luck would have it, *even though I hadn't planned it*, I still had an HDMI ->
USB-C adapter in my bag!

{% imagePlaceholder "./src/assets/images/posts/macbook-hdmi-adapter.jpg", "macbook hdmi usb-c adapter" %}

This little guy saved the day. I'm still not 100% clear as to "why". After various google searches, I land on 
explanations about test signals sent infrequently from the mac, or older projectors wanting more power to come from 
the hdmi signal than what he modern laptops use. But in the end, the demo (***ahem** family video) works and that's 
all that matters 😅