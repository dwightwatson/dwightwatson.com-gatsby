---
title: "Testing Laravel with PHPUnit"
path: /posts/testing-laravel-with-phpunit
author: Dwight Watson
date: 2014-09-09
tags: ["circleci", "laravel", "php", "phpunit", "testing"]
---

For a while I&#039;ve been debating the best way to test Laravel apps. From unit testing models, functional testing controllers and integration testing your experience there are a number of tools that can help you automate this process. I&#039;ve done a lot of reading on the matter, including the well-known (and soon to be replace, I believe) [Laravel Testing Decoded](https://leanpub.com/laravel-testing-decoded) by Jeffrey Way. While I&#039;d love for an all-in-one testing solution it doesn&#039;t seem like we&#039;re quite there yet. 

[PHPUnit](https://phpunit.de/) is probably the de-facto PHP testing package, but it doesn&#039;t support integration testing. [PHPSpec](http://www.phpspec.net/) has a really refined way of doing unit testing, but there&#039;s no great way to functional test your Laravel controllers (you could unit test them, but eh). Finally [Codeception](http://codeception.com/) provides unit testing through PHPUnit, a really great integration testing library that supports Laravel, but the funtional testing is shot (I could go on about this, but functional and acceptance tests in Codeception hardly differ, it&#039;s stupid).

# PHPUnit for Laravel models and controllers

At the moment I&#039;m foregoing the use of integration testing, and simply testing my models and controllers through PHPUnit. One of the biggest problems I came across when getting into the testing of Laravel was the ability to look through an existing (real-world) codebase that was tested. It&#039;s for this reason, I&#039;ve left [this very blog open-source](https://github.com/dwightwatson/neontsunami) so that people inteterested in learning to test Laravel with PHPUnit can have a browse through and learn from it.

I was going to go ahead and test the blog with all three frameworks, but PHPUnit just wasn&#039;t going to play nicely with Laravel. I might consider adding a Codeception testing suite to this blog as well just for the sake of it but we&#039;ll see.

## [Neon Tsunami and it&#039;s PHPUnit tests](https://github.com/dwightwatson/neontsunami)

You might notice that I don&#039;t unit test my models - I use [TestDummy](https://github.com/laracasts/TestDummy) to hit my database and actually test the application. Maybe it&#039;s just my Rails background, but I want to hit the database and make sure the app is responding as I expect.

See the builds on [CircleCI](https://circleci.com/gh/dwightwatson/neontsunami) (with a huge shout-out to them for adding free builds for public repos).
