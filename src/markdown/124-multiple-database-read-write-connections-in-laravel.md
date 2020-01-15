---
title: "Multiple database read/write connections in Laravel"
path: /posts/multiple-database-read-write-connections-in-laravel
author: Dwight Watson
date: 2017-03-29
tags: ["laravel"]
---

This post follows up on my previous post [Multiple read-only database slaves in Laravel](https://www.dwightwatson.com/posts/multiple-read-only-database-slaves-in-laravel) after I got a helpful comment from [Ezequiel Russo](https://disqus.com/by/ezequielrusso/) who showed me an even better way to use multiple database read/write connections in Laravel - one that works with Laravel's config caching.

It turns out that Laravel will automatically pick a database connection at random if provided with an array, so there's no need to pick a random connection yourself. This makes it really easy to define your connections and have it work with `php artisan config:cache`.

```php
'mysql' => [
    'driver' => 'mysql',
    'read' => [
        'host' => ['193.168.1.1', '194.168.1.1']
    ],
    'write' => [
        'host' => '196.168.1.2'
    ],
    //
]
```
