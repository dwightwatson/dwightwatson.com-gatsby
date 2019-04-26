---
title: "Getting the controller and action in Laravel 4"
path: /posts/getting-the-controller-and-action-in-laravel-4
author: Dwight Watson
date: 2013-08-17
tags: ["codeigniter", "laravel", "php"]
---

In my old [CodeIgniter](http://ellislab.com/codeigniter) days, it was really easy to get the current controller and action for a request. Of course, it was a little bit easier becauce in CodeIgniter *every* request is routed to a controller action. Here is an excerpt from [Studious](https://www.studiousapp.com) when it was running on CodeIgniter:

    	&lt;body class=&quot;&lt;?= $this-&gt;router-&gt;fetch_class() ?&gt;-&lt;?= $this-&gt;router-&gt;fetch_method() ?&gt;&quot;&gt;
		
This simply put a class like `post-show` on the body tag, which could be used for custom styling or script hooks.

In Laravel 4, I haven&#039;t quite found a solution that totally satisfies me, but I&#039;ll share what I&#039;m using at the moment. It makes use of `Route::currentRouteAction()` and `Str::parseCallback()` which you should look into if you want to write up your own solution.

	class Helpers
	{
		public static function routeClass()
		{
			$routeArray = Str::parseCallback(Route::currentRouteAction(), null);
			
			if (last($routeArray) != null) {
				// Remove &#039;controller&#039; from the controller name.
				$controller = str_replace(&#039;Controller&#039;, &#039;&#039;, class_basename(head($routeArray)));
				
				// Take out the method from the action.
				$action = str_replace(array(&#039;get&#039;, &#039;post&#039;, &#039;patch&#039;, &#039;put&#039;, &#039;delete&#039;), &#039;&#039;, last($routeArray));
				
				return Str::slug($controller . &#039;-&#039; . $action);
			}
			
			return &#039;closure&#039;;
		}
	}
	
I&#039;ve put this up as a [function on Gist](https://gist.github.com/dwightwatson/6200599), note that I&#039;ve used the PHP 5.4 syntax there. You might prefer to extend the existion `Route` class to add the function, or use a separate `Helper` class as I&#039;ve opted to above.
