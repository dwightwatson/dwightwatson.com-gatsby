---
title: "Benchmarking tests in Homestead"
path: /posts/benchmarking-tests-in-homestead
author: Dwight Watson
date: 2014-09-12
tags: ["homestead", "laravel", "php", "phpunit", "testing"]
---

This is pretty anecdotal but I thought it was interesting enough to post. I&#039;ve been working on a new package recently and using PHPUnit to test it all. I decided to run the tests both from within Homestead and on my local machine and was surprised to see the difference. Sure, Homestead is a virtualised machine with less memory that my actual machine but was surprised to find that not using Homestead was almost 13 times faster.

    Homestead
    Time: 681ms, Memory: 6.65Mb

    Local
    Time: 50 ms, Memory: 6.00Mb

It makes a lot of sense in hindsight, but it&#039;s definitely something you should keep in mind. Might be a good idea to run your development apps through Homestead but do all your testing locally. The time savings from running the suite each time will definitely add up, and if you have a larger suite (the one in my example was only 20 tests, very small) it could add up very quickly.
