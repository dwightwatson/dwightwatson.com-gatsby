---
title: "Handy Laravel Redirect methods"
path: /posts/handy-laravel-redirect-methods
author: Dwight Watson
date: 2013-09-29
tags: ["laravel", "php"]
---

Laravel Weekly uncovered some [handy methods in the Laravel redirector](https://gist.github.com/driesvints/6681848) which I hadn't seen before.

## Redirect to a route named 'home'
    return Redirect::home();

## Redirect to the current URI
    return Redirect::refresh();
