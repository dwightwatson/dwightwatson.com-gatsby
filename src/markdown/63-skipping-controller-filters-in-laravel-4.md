---
title: "Skipping controller filters in Laravel 4"
path: /posts/skipping-controller-filters-in-laravel-4
author: Dwight Watson
date: 2014-08-25
tags: ["laravel", "php"]
---

Filters are a great way to introduce controller-level checks before every request in your controller without repeating yourself. You might often find that your `BaseController` has `$this->beforeFilter('auth')` right there in the constructor, to ensure that only logged-in users have access to your applicaiton. You might also use something like `$this->beforeFilter('csrf', ['on' => ['post', 'put', 'patch', 'delete']])` to check the CSRF token on any non-idempotent requests (in case you didn't notice, I'm a fan of registering my filters in controllers rather than the `routes.php` file).

However, what if a filter you registered in your `BaseController` isn't going to work in one of it's child controllers. For example, you want your entire application to have the `auth` filter, but that isn't going to work on your `SessionsController` which manages the login process. Fortunately, it's really easy to "forget" filters in your constructors to make sure they don't interfere with the expected response.

    class BaseController extends Controller {
	    public function __construct()
		{
		    $this->beforeFilter('auth');
		}
	}

	class SessionsController extends BaseController {
		public function __construct()
		{
			parent::__construct();

			$this->forgetBeforeFilter('auth');
		}
	}

It's also worth noting that the same thing exists for after filters, with the `forgetAfterFilter()` method.
