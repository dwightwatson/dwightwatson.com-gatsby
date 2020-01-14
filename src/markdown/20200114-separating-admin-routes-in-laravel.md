---
title: "Separating admin routes in Laravel"
path: /posts/separating-admin-routes-in-laravel
author: Dwight Watson
date: 2020-01-14
tags: ["laravel"]
---

A number of projects I've worked on have required custom admin panels that are custom enough that I can't get away with [using Laravel Nova](https://nova.laravel.com). When this happens it's easy to pop in a new route group and some simple authorization just to isolate this part of your app.

```php
Route::prefix('admin')->namespace('Admin')->middleware('can:admin')->group(function () {
    // Admin routes go here.
});
```

However as this part of your app grows it can lead to a very messy `routes/web.php` file that can be difficult to parse - even if you move all your admin routes to the top or bottom of the file.

## Following conventions

Luckily Laravel provides a really nice convention for separating groups of routes - just check out `routes/api.php`. We can use this approach to separate admin routes as well. First, go to the `map` method of your `app/Providers/RouteServiceProvider.php`.

```php
public function map()
{
    $this->mapApiRoutes();

    $this->mapWebRoutes();

    $this->mapAdminRoutes();

    //
}
```

Add a call to an additional method `mapAdminRoutes` - you can place it before or after your other route groups depending on the required specificity. Then we can go ahead and define that method further down following the pattern of the other default groups.

```php
/**
 * Define the "admin" routes for the application.
 *
 * @return void
 */
protected function mapAdminRoutes()
{
    Route::prefix('admin')
         ->middleware('web', 'can:admin')
         ->namespace($this->namespace.'\Admin')
         ->name('admin.')
         ->group(base_path('routes/admin.php'));
}
```

There's a few things to notice here: -

* We apply the `web` middleware - because these routes were previously defined within the `web` routes they already had this middleware applied, but now we need to apply it ourselves.
* We also use `can:admin` to authorize the user - but you can replace this with your preferred authorization mechanism.
* We need to refer to `$this->namespace` when providing the fully qualified namespace of the route group.

Of course you can apply any other route group configuration you need here, as you would if it was a regular route group.

Now you just need to create `routes/admin.php` and dump your routes there.

## tl;dr

Move your routes to `routes/admin.php` and configure the route group in your `RouteServiceProvider`.

Keep in mind this is a good solution for any route groups - like legacy routes, or redirects - not just admin routes.
