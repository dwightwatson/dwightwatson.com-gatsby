---
title: "Easily using environment variables with Laravel"
path: /posts/easily-using-environment-variables-with-laravel
author: Dwight Watson
date: 2014-08-05
tags: ["git", "laravel", "php"]
---

One of the good Git lessons isn't always taught very early on and that is being very careful to never commit sensitive data to your repository, and that includes configuration details like usernames and passwords. When you do this the data committed should always be considered compromised and regenerated and the data should be removed from the repository as well, though this [can often be very painful](https://help.github.com/articles/remove-sensitive-data).

One mistake I see often is people commiting their database credentials straight into the repo simply because it is easy to deploy and because they haven't looked into setting up environment variables in their server (or local) environment. Admittedly, this can be annoying and a pain especially when switching between server types, but Laravel makes it really easy to inject these variables (if, of course, you're not using a tool like [Laravel Forge](https://forge.laravel.com/) or [ServerPilot](https://serverpilot.io/) which let you make these changes through their interface). However, Laravel makes this really simple.

Let's take a look at the database configuration for an app I'm working on at the moment.

    'connections' => array(
		'mysql' => array(
			'driver'    => 'mysql',
			'host'      => getenv('DATABASE_HOST'),
			'database'  => getenv('DATABASE_NAME'),
			'username'  => getenv('DATABASE_USERNAME'),
			'password'  => getenv('DATABASE_PASSWORD'),
			'charset'   => 'utf8',
			'collation' => 'utf8_unicode_ci',
			'prefix'    => '',
		),
	),

Of course, I'm going to use different database credentials for production, local development and testing. I could go through and duplicate the `app/config/database.php` file and pop it into `app/config/local/database.php` and `app/config/testing/database.php` with the correct credentials, but let's do it the right way.

For your production environment, create a file called `.env.php` in the root of your project, and have it simply return an associative array.

	return array(
    	'DATABASE_HOST'     => 'localhost',
    	'DATABASE_NAME'     => 'laravel',
    	'DATABASE_USERNAME' => 'laravel',
    	'DATABASE_PASSWORD' => 'secret'
	);

Now you can just place that file on your server and you're good to go in production. What about other environments though? Just as simple - a file called `.env.$environment.php`. For example, here's my `.env.local.php` for my local development environment (using Homestead):

	return array(
    	'DATABASE_HOST'     => 'localhost',
    	'DATABASE_NAME'     => 'dwightwatson',
    	'DATABASE_USERNAME' => 'homestead',
    	'DATABASE_PASSWORD' => 'secret'
	);

Now you can configure your application credentials from just one place for each environment and keep them secure from source control (and anyone that might gain access to your code) really easily!


