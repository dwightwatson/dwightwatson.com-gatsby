---
title: "[LogicException] Unable to prepare route for serialization. Uses Closure."
path: /posts/logicexception-unable-to-prepare-route-for-serialization-uses-closuer
author: Dwight Watson
date: 2015-03-21
tags: ["laravel", "laravel 5", "php"]
---

Ran into this little issue when trying to use `route:cache` on Laravel 5.

    Route cache cleared!
    [LogicException]
    Unable to prepare route [posts/laravel&#039;s-new-forelse-construct] for serialization. Uses Closure.

The exception is pretty clear, but it&#039;s worth noting that closure type routes will not be compatible when trying to use the `route:cache` command. You have a couple of options: forgo cached routing and the speed improvement or move your routes into a controller. I did the latter.

    // Previously
    Route::get(&#039;posts/laravel&#039;s-new-forelse-construct&#039;, function()
    {
        return Redirect::to(&#039;posts/laravels-new-forelse-construct&#039;, 301);
    });

    // Currently
    Route::get(&#039;posts/laravel&#039;s-new-forelse-construct&#039;, &#039;RedirectsController@getPostsLaravelsNewForelseConstruct&#039;);

Now that your routing is handled by a controller instead of a closure you&#039;ll be able to cache your routes as you want.


