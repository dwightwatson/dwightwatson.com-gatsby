---
title: "Running Laravel through Continuous Integration (CI) using CircleCI"
path: /posts/running-laravel-through-continuous-integration-(ci)-using-circleci
author: Dwight Watson
date: 2014-05-03
tags: ["circleci", "laravel", "testing"]
---

Just this week I made the choice to move some of our projects into a continuous integration facility. We didn't have a huge amount of tests written, but they were passing, and I felt like it would be a good starting point to get our team into the swing of writing tests. It was actually pretty good timing with the [TDD fiasco of last week](http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html), as complete TDD wasn't the approach I wanted to start with. I wanted to give my team a starting suite full of examples they could learn from and extend, let them get scared when they break the build and slowly move them into writing tests for critical functionality.

I looked around at a few options including self hosting but a relatively new service called [CircleCI] caught my eye. Affordable, sexy, integrated with GitHub (and apparently plug-and-play) with a free two-week trial. Nothing to lose, so I decided to give it a shot with our largest project and our new upcoming project, both running Laravel 4.1.

Now, it wasn't entirely plug-and-play for us, however I have little to complain about. CircleCI recognised these as PHP projects and would automatically install the Composer dependencies before running the tests, great! The default version of PHP run is 5.3, so I had to change the configuration to use PHP 5.4 (what we run in production), but thankfully CircleCI support up to PHP 5.5 at this time. Once this was fixed, we had a bit of a memory issue with PHPUnit, so a quick look at the docs and I was able to increase the memory limit, allowing our tests to run through.

Here is the `circle.yml` file in addition to the default configuration provided by CircleCI to get our PHPUnit test unit suite up and running:

	// circle.yml
	machine:
	  php:
		version: 5.4.21
	dependencies:
	  pre:
		- echo "memory_limit = 1024M" > ~/.phpenv/versions/5.4.21/etc/conf.d/memory.ini

The next cool thing is that both MySQL and Postgres are installed into the testing environment out of the box. There are [plenty of other database systems you can easily install](https://circleci.com/docs/environment#databases) if required, but this did the job for us. We simply set up the database credentials in our `app/config/testing/database.php` file:

	// app/config/testing/database.php
	...

	'connections' => array(

	'circle' => array(
	'driver'    => 'mysql',
	'host'      => '127.0.01',
	'database'  => 'circle_test',
	'username'  => 'ubuntu',
	'password'  => '',
	'charset'   => 'utf8',
	'collation' => 'utf8_unicode_ci',
	'prefix'    => '',
	),

	...

Easy as that!

The only other snag we hit while setting up one of the projects was that it utilised a Composer package that came from a private repository - it was the [Cartalyst](http://www.cartalyst.com/) package [Sentry Social](https://cartalyst.com/manual/sentry-social). Thankfully, CircleCI have a really good (and quick!) support team that were able to guide me to using GitHub user authentication to allow the project to build using private dependencies. Really easy!

All-in-all, a couple of days in and I'm really happy with CircleCI. Great service, support and priving and really easy to use with Laravel.
