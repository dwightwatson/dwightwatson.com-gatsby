---
title: "\"Too many connections\" using PHPUnit for testing Laravel 5.1"
path: /posts/too-many-connections-using-phpunit-for-testing-laravel-51
author: Dwight Watson
date: 2015-07-30
tags: ["laravel 5", "php", "phpunit", "testing"]
---

I wrote a post a year or so ago about dealing with the [too many connections error when testing Laravel 4](https://www.dwightwatson.com/posts/too-many-connections-using-phpunit-for-testing-laravel-4-on-circleci). Now having just migrated a project to Laravel 5.1 I've found that my solution there no longer works, and we need to hook into Laravel's test callback system in order to actually disconnect from the database after a test.

Simply add the following `tearDown()` method to your `TestCase`, which will queue up a database disconnect to be performed during a tear down.

    public function tearDown()
    {
        $this->beforeApplicationDestroyed(function () {
            DB::disconnect();
        });

        parent::tearDown();
    }
