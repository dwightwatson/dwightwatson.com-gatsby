---
title: "Daily log files in Laravel 4"
path: /posts/daily-log-files-in-laravel-4
author: Dwight Watson
date: 2014-01-23
tags: ["laravel", "php"]
---

With Laravel 4.1 all the application logs started being saved to a single log file called `laravel.log`. This change is great if you want to tail the logs (plus there's the new handly artisan command `php artisan tail`, which you can also use with remote servers), but not so great if you intend to have a big log file. Now, hopefully this isn't because your application has a lot of errors, but you might want to log events that occur just for safekeeping or to keep a history of what is happening. For example, one application I'm woking on logs out all hits to our registration API endpoint, to have a record of the data passed just in case something horrific goes wrong.

Anyway, have a look in your `app/start/global.php` file. If you started with Laravel 4.1 (or updated completely from 4.0), you'll see something like this:

	Log::useFiles(storage_path().'/logs/laravel.log');

However, to get daily log files instead, simply update the code to this:

	$logFile = 'log-'.php_sapi_name().'.txt';

	Log::useDailyFiles(storage_path().'/logs/'.$logFile);

Now, every day you'll have a unique log file that includes the server name that is running your app. Easy!

Of course, if you want to change the names that are used, simply edit the `$logFile` variable.
