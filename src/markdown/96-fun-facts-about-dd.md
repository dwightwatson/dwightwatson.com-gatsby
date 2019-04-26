---
title: "Fun facts about dd()"
path: /posts/fun-facts-about-dd
author: Dwight Watson
date: 2015-05-12
tags: ["laravel", "php", "phpunit"]
---

Here are some things I learnt about Laravel's little "dump and die" function `dd()` this week.

First, the function actually takes as many parameters as you want, and it will dump them all out for you. I'm sure a couple of times I've had to request a page twice, dumping a different variable each time just to see the state of each of them (I really should just get some breakpoint stuff going).

    // As many parameters as you like...
    dd($user, $request);

    // ...or an array
    dd([$user, $post]);

The next cool thing is that the functionality of `dd()` is going to change a little in Laravel 5.1. If you take a look at [this accepted PR](https://github.com/laravel/framework/pull/8688) you can see that the function will now quit with a return code of 1 (instead of 0, previously). This is a great change for when you're testing, as previously it was possible for `dd()`s to exist in your code, get run in your PHPUnit test suite and not break anything. Now that they return 1 they'll force your tests to fail.


