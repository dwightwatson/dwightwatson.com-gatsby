---
title: ".gitignore for Laravel Mix build artifacts"
path: /posts/gitignore-for-laravel-mix-build-artifacts
author: Dwight Watson
date: 2018-03-24
tags: ["laravel", "mix"]
---

Many Laravel developers will build their front-end assets locally before deploying a new release and the framework ships out-of-the-box to support this. However sometimes you may rather to build your assets as part of your CI process or on production itself.

If you're going to be building your production assets elsewhere then you don't want your repo tracking the assets you create during development. There's no point filling it up with files that can be rebuilt easily at any time, and a `public/mix-manifest.json` that is going to change every single time.

All you need to do is add some additional lines to your app's `.gitignore` file which will simply tell Git to ignore these directories going forward. If you already have any of these directories tracked then you can go ahead and delete them after updating the ignore file.

```
/public/js
/public/css
/public/build
/public/mix-manifest.json
```
