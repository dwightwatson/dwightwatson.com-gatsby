---
title: "How to solve PHPUnit exiting without errors"
path: /posts/how-to-solve-phpunit-exiting-without-errors
author: Dwight Watson
date: 2013-10-23
tags: ["phpunit", "testing"]
---

I've been getting into testing a little bit recently, and after writing about 30 tests or so, found that running `phpunit` would run a bunch of tests, then just silently quit. No error messages or anything, there'd just be a string of `.`'s representing the tests, then back to the prompt. For me, this turned to be an issue with PHP's memory limit being hit.

I solved the problem using PHP's `display_errors` and `memory_limit` settings, which you could adjust in your development `php.ini` if you like, but I've opted to use it on the command line. If you've got PHPUnit installed through Composer, try this:

    php -d display_errors=On vendor/bin/phpunit

Now, when you run PHPUnit instead of it silently failing you should get an error. In my case, it was something like this:

    Fatal error: Allowed memory size of 33554432 bytes exhausted (tried to allocate 8960 bytes) in ../app/breadcrumbs.php on line 227

Pretty much just hit the memory limit. Again, easily fixed with a flag:

    php -d display_errors=On -d memory_limit=768M vendor/bin/phpunit

I ended up just aliasing `phpunit` to run the above command for me, though I could just have easily changed those two options for PHP globally. Feel free to do whatever feels more right to you, but at least this will get PHPUnit back up and running!
