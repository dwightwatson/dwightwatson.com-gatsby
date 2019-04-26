---
title: "Laravel auth routes without registration"
path: /posts/laravel-auth-routes-without-registration
author: Dwight Watson
date: 2018-03-23
tags: ["laravel"]
---

Laravel&#039;s authentication scaffold is a great way to get your app off the ground quickly - both because of the time it saves you from the get go but also because it&#039;s a common implementation other Laravel developers are familiar with. 

However there may be times you want authentication but you don&#039;t want people to be able to register for your site. It might be a private back-end that you&#039;ll want to create users for manually, or you may have internal tools for inviting new users. Luckily it&#039;s pretty easy to strip registration out of the scaffold.

## Removing the controller

First, you&#039;re going to want to remove `app\Http\Controllers\RegisterController.php`. You can stop here if you want - removing this controller is actually enough to prevent users from registering for your app. The routes are still registered but they won&#039;t work. There&#039;s a second step if you want to remove the routes as well.

## Removing the routes

The call to `Route::auth()` in your routes file is actually calling on `Illuminate\Routing\Router::auth()`. Let&#039;s take a look at how it works under the hood - it literally registers the predefined authentication routes.

```php
/**
 * Register the typical authentication routes for an application.
 *
 * @return void
 */
public function auth()
{
    // Authentication Routes...
    $this-&gt;get(&#039;login&#039;, &#039;Auth\LoginController@showLoginForm&#039;)-&gt;name(&#039;login&#039;);
    $this-&gt;post(&#039;login&#039;, &#039;Auth\LoginController@login&#039;);
    $this-&gt;post(&#039;logout&#039;, &#039;Auth\LoginController@logout&#039;)-&gt;name(&#039;logout&#039;);

    // Registration Routes...
    $this-&gt;get(&#039;register&#039;, &#039;Auth\RegisterController@showRegistrationForm&#039;)-&gt;name(&#039;register&#039;);
    $this-&gt;post(&#039;register&#039;, &#039;Auth\RegisterController@register&#039;);

    // Password Reset Routes...
    $this-&gt;get(&#039;password/reset&#039;, &#039;Auth\ForgotPasswordController@showLinkRequestForm&#039;)-&gt;name(&#039;password.request&#039;);
    $this-&gt;post(&#039;password/email&#039;, &#039;Auth\ForgotPasswordController@sendResetLinkEmail&#039;)-&gt;name(&#039;password.email&#039;);
    $this-&gt;get(&#039;password/reset/{token}&#039;, &#039;Auth\ResetPasswordController@showResetForm&#039;)-&gt;name(&#039;password.reset&#039;);
    $this-&gt;post(&#039;password/reset&#039;, &#039;Auth\ResetPasswordController@reset&#039;);
}
```

You can see how the routes are broken up into three groups - authentication, registration and password reset. Quite simply you just need to copy the routes you want to use into you `routes/web.php` file and ditch the rest. You&#039;ll also need to replace `$this-&gt;` with `Route::`.

Quite simply, you can now remove `Auth::route()` from your routes file and just leave behind the authentication and password reset routes. Registration will no longer be available in your app and the routes that would have linked to it are no longer present.

```php
// Authentication Routes...
Route::get(&#039;login&#039;, &#039;Auth\LoginController@showLoginForm&#039;)-&gt;name(&#039;login&#039;);
Route::post(&#039;login&#039;, &#039;Auth\LoginController@login&#039;);
Route::post(&#039;logout&#039;, &#039;Auth\LoginController@logout&#039;)-&gt;name(&#039;logout&#039;);

// Password Reset Routes...
Route::get(&#039;password/reset&#039;, &#039;Auth\ForgotPasswordController@showLinkRequestForm&#039;)-&gt;name(&#039;password.request&#039;);
Route::post(&#039;password/email&#039;, &#039;Auth\ForgotPasswordController@sendResetLinkEmail&#039;)-&gt;name(&#039;password.email&#039;);
Route::get(&#039;password/reset/{token}&#039;, &#039;Auth\ResetPasswordController@showResetForm&#039;)-&gt;name(&#039;password.reset&#039;);
Route::post(&#039;password/reset&#039;, &#039;Auth\ResetPasswordController@reset&#039;);
```
