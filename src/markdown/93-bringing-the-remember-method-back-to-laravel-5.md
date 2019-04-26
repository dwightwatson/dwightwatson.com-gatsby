---
title: "Bringing the remember() method back to Laravel 5"
path: /posts/bringing-the-remember-method-back-to-laravel-5
author: Dwight Watson
date: 2015-03-27
tags: ["laravel", "laravel 5", "php"]
---

Laravel 4 had a great feature that unfortunately was removed from the latest version and that was the `remember()` method on the query builder. This made it stupidly simple to cache the results of your database queries to give your app that little extra performance boost. It may not have been the pinnacle of structured application development, and this might explain why it was eventually removed, but it was such a pleasure to just throw it on a query and be done with it. It&#039;s for that reason that I decided to bring it back to Laravel 5 in the form of a package.

[Rememberable: query caching for Laravel 5](https://github.com/dwightwatson/rememberable)

A quick `composer require watson/rememberable` and the use of a trait will bring the `remember()` method back to your Eloquent models. You&#039;re then able to pass the number of minutes you want to cache a query to the method and any subsequent calls to that query will be pulled from the cache rather than hitting the database again. It&#039;s super simple!

    // Cache the number of users for a day.
    $users = User::remember(1440)-&gt;count();

    // Cache the most popular posts for an hour.
    $posts = Post::popular()-&gt;remember(60)-&gt;get();

In the future I&#039;ll look to bring it back to the standard Laravel query build too (I had this functionality in an earlier commit if you&#039;re really keen, but it required using a service provider as well as a trait). I&#039;d also like to have it cache the result of relationship queries too, for example when you call `with()` on an Eloquent query chain.
