---
title: "Using Sentry for log tracking with Laravel"
path: /posts/using-sentry-for-log-tracking-with-laravel
author: Dwight Watson
date: 2014-07-24
tags: ["composer", "php", "sentry"]
---

Damn, this is a hard topic to search for. Any time I went searching for resources on getting the [log management system called Sentry](https://getsentry.com) to work with Laravel, I was instead overwhelmed with resources on the [user authentication system called Sentry](https://github.com/cartalyst/sentry). The trick is to search for [Raven](https://github.com/getsentry/raven-php) with Laravel, Raven being the package that helps Laravel to communicate with the Sentry service. After much sifting to find relevant resources (and ignoring any packages that hook Laravel into Sentry for you, as a package for that seems like unnecessary overheard to me), I&#039;ve got it up and running!

First, you&#039;ll need to install the `raven-php` package. Add the following to your `composer.json` file and run `composer update`.

    &quot;raven/raven&quot;: &quot;0.9.*&quot;
	
Next, you&#039;ll need to register the handler. Luckily Laravel uses Monolog for logging, and Monolog has a handler that supports Raven out of the box! Add the following to your `global.php` file, or pop it in a server provider if that&#039;s your thing. Note that I first check that it&#039;s the production environment before registering the handler, as errors that occur in development or staging don&#039;t really need to make their way to Sentry (and of course you should probably have a different environment set up on Sentry if you want to track other environments anyway).

    if (App::environment(&#039;production&#039;))
	{
	    $handler = new Monolog\Handler\RavenHandler(new Raven_Client(&#039;https://your-unique-url@app.getsentry.com/your-id&#039;));
        $handler-&gt;setFormatter(new Monolog\Formatter\LineFormatter(&quot;%message% %context% %extra%\n&quot;));

        $monolog = Log::getMonolog();
        $monolog-&gt;pushHandler($handler);
	}

Of course, make sure to swap out the URL for your Sentry endpoint (it will be in the project settings in Sentry).

For extra credit, you can also limit the types of logs that get to Sentry. The second parameter you pass to `RavenHandler` will be the minimum error type that will be sent.

    $handler = new Monolog\Handler\RavenHandler($client, Monolog\Logger::ERROR);
	
This, for example, will only send ERRORS and higher log types.

