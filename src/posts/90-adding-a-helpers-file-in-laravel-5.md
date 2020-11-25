---
title: "Adding a helpers file in Laravel 5"
path: /posts/adding-a-helpers-file-in-laravel-5
author: Dwight Watson
date: 2015-03-21
tags: ["laravel", "laravel 5", "php"]
---

I still like to use a `helpers.php` in my Laravel 5 projects, just to throw some simple functions in there that I can use around the place. Luckily, it's just as simple to set this up through Composer. First, update your `composer.json` file,a round the `autoload` key.

    "autoload": {
        "classmap": [
            "database
        ],
        "psr-4": {
            "App\\": "app/"
        },
        "files": [
            "app/Support/helpers.php"
        ]
    }

Then, just create a PHP file at `app/Support/helpers.php`. I create and use a `Support` directory in my app, sort of to march the convention used my the framework. You're free to place it wherever you like, even just `app/helpers.php` if that's what floats your boat.
