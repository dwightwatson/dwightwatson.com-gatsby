---
title: "Using Redis with Lumen"
path: /posts/using-redis-with-lumen
author: Dwight Watson
date: 2015-05-21
tags: ["lumen", "php"]
---

It turns out that Redis isn&#039;t exactly supported out of the box when you&#039;re using Lumen, and the docs don&#039;t reflect that. Without the additional dependencies installed, you&#039;re going to see this error when you try and use the cache.

    Fatal error: Class &#039;Illuminate\Redis\RedisServiceProvider&#039; not found in /home/vagrant/lumen/vendor/laravel/lumen-framework/src/Application on line 219

There are in fact an additional dependency in order to get Redis up and running.

You need to include `illuminate/redis` (~5.0) which includes Laravel&#039;s Redis drivers.

    composer require illuminate/redis

Once you&#039;ve installed this dependency you&#039;re good to use Redis on Lumen.

*I&#039;ve made a PR for the Lumen docs to illuminate this dependency.*
