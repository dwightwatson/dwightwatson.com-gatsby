---
title: "Timezones in Laravel 4"
path: /posts/laravel-4-timezones
author: Dwight Watson
date: 2013-08-05
tags: ["laravel", "php"]
---

Here&#039;s something cool I didn&#039;t know about timezones in Laravel 4 - instead of just providing an offset from UTC you can use the default timezones as provided by PHP.

In your `config/app.php` file, you&#039;ve got the following setting by default:

	/*
	|--------------------------------------------------------------------------
	| Application Timezone
	|--------------------------------------------------------------------------
	|
	| Here you may specify the default timezone for your application, which
	| will be used by the PHP date and date-time functions. We have gone
	| ahead and set this to a sensible default for you out of the box.
	|
	*/

	&#039;timezone&#039; =&gt; &#039;UTC&#039;,
	
Instead of `UTC` you can simply substitute any of the [PHP supported timezones](http://php.net/manual/en/timezones.php). For example, a few of the apps I&#039;ve worked on have `Australia/Sydney` to keep all the times localised here, even through daylight savings.

Of course, if you really wanted you could go ahead and place a call to `date_default_timezone_set()` somewhere in your app boot, but this is build cleanly into Laravel.
