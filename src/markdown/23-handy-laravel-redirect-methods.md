---
title: "Handy Laravel Redirect methods"
path: /posts/handy-laravel-redirect-methods
author: Dwight Watson
date: 2013-09-29
tags: ["laravel", "php"]
---

Laravel Weekly uncovered some [handy methods in the Laravel redirector](https://gist.github.com/driesvints/6681848) which I hadn&#039;t seen before.

## Redirect to a route named &#039;home&#039;
    return Redirect::home();
	
## Redirect to the current URI
    return Redirect::refresh();
