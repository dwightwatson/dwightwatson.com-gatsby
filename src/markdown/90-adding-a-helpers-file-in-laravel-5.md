---
title: "Adding a helpers file in Laravel 5"
path: /posts/adding-a-helpers-file-in-laravel-5
author: Dwight Watson
date: 2015-03-21
tags: ["laravel", "laravel 5", "php"]
---

I still like to use a `helpers.php` in my Laravel 5 projects, just to throw some simple functions in there that I can use around the place. Luckily, it&#039;s just as simple to set this up through Composer. First, update your `composer.json` file,a round the `autoload` key.

    &quot;autoload&quot;: {
        &quot;classmap&quot;: [
            &quot;database
        ],
        &quot;psr-4&quot;: {
            &quot;App\\&quot;: &quot;app/&quot;
        },
        &quot;files&quot;: [
            &quot;app/Support/helpers.php&quot;
        ]
    }

Then, just create a PHP file at `app/Support/helpers.php`. I create and use a `Support` directory in my app, sort of to march the convention used my the framework. You&#039;re free to place it wherever you like, even just `app/helpers.php` if that&#039;s what floats your boat.
