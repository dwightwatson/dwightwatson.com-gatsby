---
title: "A different kind of asset pipeline for Laravel"
path: /posts/a-different-kind-of-asset-pipeline-for-laravel
author: Dwight Watson
date: 2013-10-01
tags: ["laravel", "php"]
---

I've been using [Basset](https://github.com/jasonlewis/basset) with Laravel 4 ever since the betas, and though I was never in *love* with it, it was a great solution over configuring [Assetic](https://github.com/kriswallsmith/assetic) it did still leave me a little underwhelmed. Although it was extremely configurable and did everything it needed to, it had a few sore points. One, I didn't like having my assets in my `public` folder, after all only the compiled, minified assets should be available to the users. And it just put them all another directory up, out of reach in Sublime Text. Furthermore, having played with Rails over the past few months I had learned to love it's asset pipeline.

Thankfully, I've come across **[Asset Pipeline](https://github.com/CodeSleeve/asset-pipeline)** in a few places, which is fantastic. It lets you keep all your assets in `app/assets` (where I feel they belong) and away from where the compiled versions go. Futhermore it has a Sprokets-like interface for ordering your assets, just like Rails, and it's beautiful. While I'm not really keen on having to use `.css.less` as opposed to just `.less` (this is configurable though), it's so much nicer to use and I've now switched a number of projects to using the asset pipeline over Basset.
