---
title: "Getting current routes, controllers and action names in Laravel 4"
path: /posts/getting-current-routes-controllers-and-action-names-in-laravel-4
author: Dwight Watson
date: 2014-03-08
tags: ["laravel", "php"]
---

In a lot of the projects I work on we use a customised version of Bootstrap to get the core layout work out of the way. Because of this, we often use the `active` class on various navigational elements to indicate which child should be highlighted. There are a couple of ways you could go about this, like comparing the current path to a given value, comparing the named route or inspecing the controller/action name that is in use. After using our own little helpers for a bit and later using the [digithis/activehelper](https://github.com/digithis/activehelper) package, I was inspired to build [Active](https://github.com/dwightwatson/active) with tests.

Active helps you determine whether you&#039;re on a given route or not. For example, you can test to see if you&#039;re on a certain path:

	Active::is(&#039;posts/1&#039;); // true
	
Simple. Now, what if you want to return a class name instead of a boolean value?

	Active::path(&#039;posts/1&#039;); // &#039;active&#039;
	
	Active::path([&#039;posts/1&#039;, &#039;users/1&#039;]); //active
	
And if you want to use a custom class?
 
	Active::path(&#039;posts/1&#039;, &#039;ready&#039;); // &#039;ready&#039;
	
Finally, all the same works for if you&#039;d like to use named routes instead.

	Active::route(&#039;posts.show&#039;, &#039;chickens&#039;); // &#039;chickens&#039;
	
Put together, it&#039;s really easy to create links that are active if the user is currently on that page.

	&lt;a href=&quot;{{ URL::route(&#039;posts.index&#039;) }}&quot; class=&quot;{{ Active::route(&#039;posts.index&#039;) }}&quot;&gt;All posts&lt;/a&gt;
	
## Helpers

Active also ships with two helpers for getting the current controller and/or action name. This only works of course if you&#039;re in a controller/action, and not a closure.

    // FooController@getBar
    $controller = controller_name(); // foo
	$action = action_name(); // bar
	
Let me know what you think of the package and if there is anything I can do to improve it. Open to suggestions and pull requests!
