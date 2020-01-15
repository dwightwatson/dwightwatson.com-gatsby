---
title: "\"Too many connections\" using PHPUnit for testing Laravel 4 on CircleCI"
path: /posts/too-many-connections-using-phpunit-for-testing-laravel-4-on-circleci
author: Dwight Watson
date: 2014-05-06
tags: ["circleci", "laravel", "testing"]
---

Starting to get a big test suite here on one of our projects, and our CI tool CircleCI just threw a wonky towards the end of the game because the database was refusing any more connections. Clearly an issue with the `max_connections` setting for MySQL (or whatever database you might be using). Unfortunately, I couldn't find a way to easily adjust this setting in our CircleCI testing environment. However, there is another way - simply close the database connection after each test. It adds a tiny bit of overhead to your testing, but hey, whatever gets the job done.

In your `app/tests/TestCase.php` add the following:

	public function tearDown()
	{
		DB::disconnect();
	}

EDIT: Just got word from CircleCI with details on how to up the `max_connections` and it's super simple with this command (thanks Gordon!):

 	SET GLOBAL max_connections = <new value>;

EDIT 2: I’ve now written another post about [solving the “too many connections” issue when testing Laravel 5.1](https://www.dwightwatson.com/posts/too-many-connections-using-phpunit-for-testing-laravel-51).
