---
title: "Laravel migrate and seed in one command"
path: /posts/laravel-migrate-and-seed-in-one-command
author: Dwight Watson
date: 2014-09-07
tags: ["laravel", "php"]
---

A neat little trick for when you want to migrate your database and immediately seed it, Artisan provides you with the option!

    php artisan migrate --seed

Might not be terribly useful but handy when you&#039;re putting together a new environment for a large app that take a little while to migrate and seed everything.
