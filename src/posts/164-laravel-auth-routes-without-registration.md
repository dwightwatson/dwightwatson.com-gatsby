---
title: "Laravel auth routes without registration"
path: /posts/laravel-auth-routes-without-registration
author: Dwight Watson
date: 2018-03-23
tags: ["laravel"]
---

Laravel's authentication scaffold is a great way to get your app off the ground quickly - both because of the time it saves you from the get go but also because it's a common implementation other Laravel developers are familiar with.

However there may be times you want authentication but you don't want people to be able to register for your site. It might be a private back-end that you'll want to create users for manually, or you may have internal tools for inviting new users. Luckily it's pretty easy to strip registration out of the scaffold.

## Removing the controller

First, you're going to want to remove `app\Http\Controllers\RegisterController.php`. You can stop here if you want - removing this controller is actually enough to prevent users from registering for your app. The routes are still registered but they won't work. There's a second step if you want to remove the routes as well.

## Removing the routes

The call to `Route::auth()` in your routes file is actually calling on `Illuminate\Routing\Router::auth()`. Let's take a look at how it works under the hood - it literally registers the predefined authentication routes.

```php
/**
 * Register the typical authentication routes for an application.
 *
 * @return void
 */
public function auth()
{
    // Authentication Routes...
    $this->get('login', 'Auth\LoginController@showLoginForm')->name('login');
    $this->post('login', 'Auth\LoginController@login');
    $this->post('logout', 'Auth\LoginController@logout')->name('logout');

    // Registration Routes...
    $this->get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
    $this->post('register', 'Auth\RegisterController@register');

    // Password Reset Routes...
    $this->get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
    $this->post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
    $this->get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
    $this->post('password/reset', 'Auth\ResetPasswordController@reset');
}
```

You can see how the routes are broken up into three groups - authentication, registration and password reset. Quite simply you just need to copy the routes you want to use into you `routes/web.php` file and ditch the rest. You'll also need to replace `$this->` with `Route::`.

Quite simply, you can now remove `Auth::route()` from your routes file and just leave behind the authentication and password reset routes. Registration will no longer be available in your app and the routes that would have linked to it are no longer present.

```php
// Authentication Routes...
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

// Password Reset Routes...
Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('password/reset', 'Auth\ResetPasswordController@reset');
```
