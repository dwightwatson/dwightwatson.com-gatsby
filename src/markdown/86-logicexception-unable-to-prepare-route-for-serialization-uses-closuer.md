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
    Unable to prepare route [posts/laravel's-new-forelse-construct] for serialization. Uses Closure.

The exception is pretty clear, but it's worth noting that closure type routes will not be compatible when trying to use the `route:cache` command. You have a couple of options: forgo cached routing and the speed improvement or move your routes into a controller. I did the latter.

    // Previously
    Route::get('posts/laravel's-new-forelse-construct', function()
    {
        return Redirect::to('posts/laravels-new-forelse-construct', 301);
    });

    // Currently
    Route::get('posts/laravel's-new-forelse-construct', 'RedirectsController@getPostsLaravelsNewForelseConstruct');

Now that your routing is handled by a controller instead of a closure you'll be able to cache your routes as you want.


