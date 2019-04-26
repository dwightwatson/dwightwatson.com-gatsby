---
title: "Composer update in Laravel with services providers"
path: /posts/composer-update-in-laravel-with-services-providers
author: Dwight Watson
date: 2013-09-11
tags: ["composer", "laravel", "php"]
---

If you&#039;re working in a team environment where other developers are adding dependancies to your Laravel 4 project and registering service providers in your app, it can get really frustrating when you try and run `composer update` to get the new packages in. Usually, you&#039;ll get an ugly error in the terminal, something like this:

    {&quot;error&quot;:{&quot;type&quot;:&quot;Symfony\\Component\\Debug\\Exception\\FatalErrorException&quot;,&quot;message&quot;:&quot;Class &#039;Cartalyst\\Sentry\\SentryServiceProvider&#039; not found&quot;,&quot;file&quot;:&quot;\/Users\/Dwight\/Sites\/studious\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/ProviderRepository.php&quot;,&quot;line&quot;:123}}
	
	Script php artisan clear-compiled handling the pre-update-cmd event returned with an error
	
Normally, you could just go to your `app.php` file and comment out the service providers, run `composer update` and then uncomment them and you&#039;d be good to go. Thankfully, there&#039;s an easier way!

    composer update --no-scripts
	
Using that switch on the command will run the update without running the hooks into Laravel which runs several checks, so it&#039;s perfect to use when you need to run an update when your app&#039;s providers have changed!
