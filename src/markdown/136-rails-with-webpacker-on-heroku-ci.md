---
title: "Rails with Webpacker on Heroku CI"
path: /posts/rails-with-webpacker-on-heroku-ci
author: Dwight Watson
date: 2017-07-31
tags: ["heroku", "testing"]
---

The Ruby buildpack for Heroku is great, especially now it supports Webpacker out of the box. It'll automatically install your Yarn dependencies and compile your assets on every deployment. Flawless. However, it doesn't quite do the same when using Heroku CI.

Node is still available in the buildpack but Heroku CI doesn't know to install your Yarn dependencies before trying to build your assets. That's probably fair as most Rails apps running through Heroku CI won't be using Webpacker. However, it's quite easy to get up and running. You just need to add a `test-setup` command that tells Rails to precompile your assets (and this includes installing Yarn dependencies by default). Here's an excerpt from my `app.json`.

```json
{
  "environments": {
    "test": {
      "buildpacks": [
        {
          "url": "heroku/ruby"
        }
      ],
      "scripts": {
        "test-setup": "bin/rails assets:precompile"
      }
    }
  }
}
```
