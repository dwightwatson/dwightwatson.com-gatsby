---
title: "Easily using environment variables with Laravel"
path: /posts/easily-using-environment-variables-with-laravel
author: Dwight Watson
date: 2014-08-05
tags: ["git", "laravel", "php"]
---

One of the good Git lessons isn&#039;t always taught very early on and that is being very careful to never commit sensitive data to your repository, and that includes configuration details like usernames and passwords. When you do this the data committed should always be considered compromised and regenerated and the data should be removed from the repository as well, though this [can often be very painful](https://help.github.com/articles/remove-sensitive-data). 

One mistake I see often is people commiting their database credentials straight into the repo simply because it is easy to deploy and because they haven&#039;t looked into setting up environment variables in their server (or local) environment. Admittedly, this can be annoying and a pain especially when switching between server types, but Laravel makes it really easy to inject these variables (if, of course, you&#039;re not using a tool like [Laravel Forge](https://forge.laravel.com/) or [ServerPilot](https://serverpilot.io/) which let you make these changes through their interface). However, Laravel makes this really simple.

Let&#039;s take a look at the database configuration for an app I&#039;m working on at the moment.

    &#039;connections&#039; =&gt; array(
		&#039;mysql&#039; =&gt; array(
			&#039;driver&#039;    =&gt; &#039;mysql&#039;,
			&#039;host&#039;      =&gt; getenv(&#039;DATABASE_HOST&#039;),
			&#039;database&#039;  =&gt; getenv(&#039;DATABASE_NAME&#039;),
			&#039;username&#039;  =&gt; getenv(&#039;DATABASE_USERNAME&#039;),
			&#039;password&#039;  =&gt; getenv(&#039;DATABASE_PASSWORD&#039;),
			&#039;charset&#039;   =&gt; &#039;utf8&#039;,
			&#039;collation&#039; =&gt; &#039;utf8_unicode_ci&#039;,
			&#039;prefix&#039;    =&gt; &#039;&#039;,
		),
	),    
	
Of course, I&#039;m going to use different database credentials for production, local development and testing. I could go through and duplicate the `app/config/database.php` file and pop it into `app/config/local/database.php` and `app/config/testing/database.php` with the correct credentials, but let&#039;s do it the right way.

For your production environment, create a file called `.env.php` in the root of your project, and have it simply return an associative array.

	return array(
    	&#039;DATABASE_HOST&#039;     =&gt; &#039;localhost&#039;,
    	&#039;DATABASE_NAME&#039;     =&gt; &#039;laravel&#039;,
    	&#039;DATABASE_USERNAME&#039; =&gt; &#039;laravel&#039;,
    	&#039;DATABASE_PASSWORD&#039; =&gt; &#039;secret&#039;
	);    
	
Now you can just place that file on your server and you&#039;re good to go in production. What about other environments though? Just as simple - a file called `.env.$environment.php`. For example, here&#039;s my `.env.local.php` for my local development environment (using Homestead):

	return array(
    	&#039;DATABASE_HOST&#039;     =&gt; &#039;localhost&#039;,
    	&#039;DATABASE_NAME&#039;     =&gt; &#039;neontsunami&#039;,
    	&#039;DATABASE_USERNAME&#039; =&gt; &#039;homestead&#039;,
    	&#039;DATABASE_PASSWORD&#039; =&gt; &#039;secret&#039;
	);
	
Now you can configure your application credentials from just one place for each environment and keep them secure from source control (and anyone that might gain access to your code) really easily!


