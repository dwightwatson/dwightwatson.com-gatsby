---
title: "Consistent caching in Laravel"
path: /posts/consistent-caching-in-laravel
author: Dwight Watson
date: 2014-03-13
tags: ["laravel", "php"]
---

During the development of [StudentVIP](https://studentvip.com.au) we discovered that different parts of the team were using the handy `remember()` method on database queries and Eloquent models to cache the results for a certain period of time, but with completely different and inconsistent intervals. In order to bring these cache timeouts into line and to allow them to be mode configurable from a application level when required we decided to place standardised cache times in a config file. That way, when the site was expecting or under heavy load we could simply edit the config file and increase the caching site-wide.

In `app/config/cache.php` we added the following:

    /*
    |--------------------------------------------------------------------------
    | Cache length
    |--------------------------------------------------------------------------
    |
    | Access these cache lengths when opting to remember query results so
    | that they may be controlled globally without having to change a number
    | of files.
    |
    */

    &#039;tiny&#039; =&gt; 5,

    &#039;short&#039; =&gt; 60,

    &#039;medium&#039; =&gt; 720,

    &#039;long&#039; =&gt; 1440
	
Of course, you may want to change these values. Tiny is 5 minutes, short is 1 hour, medium is 12 hours and long is 24 hours. Now, there are two ways to access this config values throughout your application:

## Facade

The first way is to use the facade. It&#039;s a Laravel facade so still perfectly easy to test, but up to you as to how you want to go.

    // Get tiny cache length
    $tinyCacheLength = Config::get(&#039;cache.tiny&#039;);
	
	// Cache all users for 5 minutes.
	$users = User::remember($tinyCacheLength)-&gt;all();
	
## Dependency injection

The second way, the way we do it, is by injecting the dependency into the controller that requires access to these configuration values.

    &lt;?php
	
	use Illuminate\Config\Repository;
	
	class UsersController extends BaseController
	{
		/**
		 * Config repository.
		 *
		 * @var \Illuminate\Config\Repository
		 */
		 protected $config;
		 
		 public function __construct(Repository $config)
		 {
		 		$this-&gt;config = $config;
		 }
		 
		 public function index()
		 {
		 		// Of course, you&#039;ll probably want to inject the User model too, but we&#039;ll
				// keep it simple for now.
				$users = User::remember($this-&gt;config-&gt;get(&#039;cache.medium&#039;))-&gt;all();
				
				return View::make(&#039;users.index&#039;, compact(&#039;users&#039;));
		 }
	}
	
Now, probably not the most foolproof way, but when we were in a total rush to get this thing out the front door it was an acceptable solution.
