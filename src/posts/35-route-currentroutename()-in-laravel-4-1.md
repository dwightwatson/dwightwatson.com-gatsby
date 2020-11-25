---
title: "Route::currentRouteName() in Laravel 4.1"
path: /posts/route-currentroutename()-in-laravel-4-1
author: Dwight Watson
date: 2013-12-04
tags: ["laravel", "php"]
---

Worth noting that `Route::currentRouteName()` is no longer available in Laravel 4.1, likely a result of an Illuminate router replacing the Symfony router of the previous version. However, not all is lost! The new Illuminate router provides a lot of flexbility and while it might be a little more difficult to get the named route now there are a ton of new methods available to find out more about the route.

    Route::current()->getName(); // Laravel 4.1's Route::currentRouteName();

So, `Route::current()` returns an instance of `Illuminate\Routing\Route` (from the `Illuminate\Routing\Router`/`Route` facade). It is definitely worth having a look through the API of both these classes to see what helpers are available (like `Route::currentRouteNamed()` to see if the current route is the one you specify) and to see what information you can access about the current route.
