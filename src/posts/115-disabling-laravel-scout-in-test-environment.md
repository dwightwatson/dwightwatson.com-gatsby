---
title: "Disabling Laravel Scout in test environment"
path: /posts/disabling-laravel-scout-in-test-environment
author: Dwight Watson
date: 2016-09-13
tags: ["laravel", "scout"]
---

Having just added [Algolia Search](https://www.algolia.com) to my blog with the help of [Laravel Scout](https://laravel.com/docs/5.3/scout) I found that my test suite started failing because the test environment didn't have access to my Algolia configuration.

Laravel Scout also supports a "null" driver which would fit the bill perfectly, but [theres a bit of an issue when trying to set the `SCOUT_DRIVER` to `null` using an environment variable](https://github.com/laravel/scout/issues/34). It seems like Laravel converts the string "null" to be literally `null` and then the Scout engine fails to load at all.

In the meantime, I've just set the default driver in my `config/scout.php` to be `null` and then set `SCOUT_DRIVER=algolia` in my production environment. However once that issue has been looked at, it should be as simple as setting `SCOUT_DRIVER=null` (or whatever other name they come up with) in your `.env` file or other configuration.
