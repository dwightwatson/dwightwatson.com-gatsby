---
title: "Skipping controller filters in Laravel 4"
path: /posts/skipping-controller-filters-in-laravel-4
author: Dwight Watson
date: 2014-08-25
tags: ["laravel", "php"]
---

Filters are a great way to introduce controller-level checks before every request in your controller without repeating yourself. You might often find that your `BaseController` has `$this-&gt;beforeFilter(&#039;auth&#039;)` right there in the constructor, to ensure that only logged-in users have access to your applicaiton. You might also use something like `$this-&gt;beforeFilter(&#039;csrf&#039;, [&#039;on&#039; =&gt; [&#039;post&#039;, &#039;put&#039;, &#039;patch&#039;, &#039;delete&#039;]])` to check the CSRF token on any non-idempotent requests (in case you didn&#039;t notice, I&#039;m a fan of registering my filters in controllers rather than the `routes.php` file).

However, what if a filter you registered in your `BaseController` isn&#039;t going to work in one of it&#039;s child controllers. For example, you want your entire application to have the `auth` filter, but that isn&#039;t going to work on your `SessionsController` which manages the login process. Fortunately, it&#039;s really easy to &quot;forget&quot; filters in your constructors to make sure they don&#039;t interfere with the expected response.

    class BaseController extends Controller {
	    public function __construct()
		{
		    $this-&gt;beforeFilter(&#039;auth&#039;);
		}
	}
	
	class SessionsController extends BaseController {
		public function __construct()
		{
			parent::__construct();
			
			$this-&gt;forgetBeforeFilter(&#039;auth&#039;);
		}
	}
	
It&#039;s also worth noting that the same thing exists for after filters, with the `forgetAfterFilter()` method.
