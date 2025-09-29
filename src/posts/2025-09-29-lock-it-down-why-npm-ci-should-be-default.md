---
title: 'TIL: How NPM Lockfiles Actually Work'
description: 'And why your CI/CD should use npm ci'
date: '2025-09-29T10:00:00.000-05:00'
tags:
- npm
- javascript
- devops
---

> And why your CI/CD should use npm ci

**TIL that I've been misunderstanding how npm lockfiles work!**

I always thought `npm install` would automatically update to the latest versions within your semver ranges, but that's not quite right. Though it was plausibly right for old versions of npm but changed a few years ago...

## How NPM Install _Actually_ Works

Here's the key insight I missed: `npm install` will **only** update packages if your `package.json` doesn't match your `package-lock.json`.

So if you have:
- `package.json` says: `"react": "^18.0.0"`
- `package-lock.json` has: `"react": "18.2.0"`

Then `npm install` will use `18.2.0` from the lockfile, not go fetch `18.3.1` (or whatever the latest 18.x version is).

The problems only happen when:
1. Someone modifies `package.json` but doesn't commit the updated lockfile
2. The lockfile is missing entirely
3. There's a mismatch between the two files

## 🚨 The Hidden Problem: CI/CD Misconfigurations

As a consultant, I've seen this pattern **way too many times**:

**Jenkins pipeline or GitHub Actions doing:**
```bash
npm install
npm run build
```

**Instead of:**
```bash
npm ci
npm run build
```

This is a **huge** difference!:

- `npm install` will try to "fix" any mismatches between package.json and lockfile
- `npm ci` will **fail fast** if there are any mismatches
- `npm ci` is safest because it uses the lockfile exactly as-is, ensuring reproducible builds

## War Stories

I've debugged so many "works on my machine" issues that trace back to:

1. Add a package locally: `npm install --save lodash` (or commited package.json by hand editing and not with the cli npm install command)
2. commits `package.json` but missed committing `package-lock.json`
3. **CI/CD** runs `npm install` and gets a different version of lodash than we did
4. **Production** breaks because of subtle differences 😬

Or:
1. **CI/CD** uses `npm install` instead of `npm ci`
2. **New vulnerability** gets published in a dependency
3. **CI/CD** automatically pulls the latest "safe" version with the vulnerability because lockfile was out of sync
4. **Security incident** happens

## My workflow today

### Initial project clone:
- Use `npm ci` to verify lockfile is correct and modules are expected

### For Local Dev:
- Use `npm ci` except if I know I want to modify dependencies, out of habit
- Use `npm install --save` if I want to add/update a specific package
- **Always commit both** `package.json` AND `package-lock.json` together

### For CI/CD Pipelines:
- **Always use `npm ci`** instead of `npm install`
- This guarantees your build uses exactly what's in the lockfile
- It fails fast if someone forgot to commit the lockfile

## 🤝 Building on Great Ideas

The recent [CrowdStrike-themed npm supply chain attack](https://socket.dev/blog/ongoing-supply-chain-attack-targets-crowdstrike-npm-packages) is a perfect example of why lockfiles matter in the npm world today. But there are other ideas on how to improve it all:

This whole learning journey was sparked by some timely blogs. [Jim Nielsen's post](https://blog.jim-nielsen.com/2025/run-software-on-software-youve-never-run/) about running software combinations that have never been tested together really resonated. And [Niki@tonsky's deep dive](https://tonsky.me/blog/lockfiles/) into how Maven/Gradle have worked for years **without** lockfiles in Java land.

The Maven approach of deterministic dependency resolution is arguably cleaner than the NPM lockfile system. But until the npm ecosystem evolves, we need to use the tools we have **correctly**.

## 🚀 TL;DR for your CI/CD

- Use `npm ci` instead of `npm install`
- Always commit both `package.json` and `package-lock.json`
- lockfiles are a necessary evil (even if they're confusing)

I'm sure I'm wrong in here somewhere, but at least now I documented how _i think_ it all works so I can re-read this later when I learn I'm wrong again 😅

---

Side note: [My original confused idea of npm ci - on Mastodon](https://hachyderm.io/@jeffsheets/115225375335762223)

