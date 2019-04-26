---
title: "Is webpack still compiling?"
path: /posts/is-webpack-still-compiling
author: Dwight Watson
date: 2017-08-12
tags: ["heroku", "ruby on rails", "webpacker"]
---

I’ve just run into this issue using Rails Webpacker on Heroku in production. Everything was worked fine locally but once it was deployed the app just shutdown completely and Bugsnag filled up with these sort of errors.

```
ActionView::Template::Error
Can’t find venn.svg in /app/public/packs/manifest.json. Is webpack still compiling?
```

Looking at the logs Webpacker was actually being run and all looked good under the hood, but for whatever reason the app wasn’t happy. I narrowed down the issue to an NPM module - `webpack-manifest-plugin`. I had updated from `v1.2.1` to `v1.3.0` after which the app immediately broke. When rolling back to the previous version the app was fine.

I created a new blank Rails app that worked fine on Heroku with `webpack-manifest-plugin@v1.3.0` so there’s something funky going on here, but as a quick fix you can roll back and keep moving. Hopefully this issue will be fixed upstream, wherever it may be.
