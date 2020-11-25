---
title: "Logout current device only with Laravel 6"
path: /posts/logout-current-device-only-with-laravel-6
author: Dwight Watson
date: 2019-09-24
tags: ["laravel"]
---

Recently I discovered that the default logout functionality in Laravel actually logs the user out from *all their devices*. This is because upon logout it cycles their remember token, invalidating other logged in sessions. To me this is really strange behaviour and I think it ends up being a pretty poor user experience. Considering that Laravel also provides a `logoutOtherDevices()` method to keep them logged in on their current device but logout others, I felt there was a good argument for a `logoutCurrentDevice()` method. So much so [that I opened a PR to add `logoutCurrentDevice`](https://github.com/laravel/framework/pull/29397) that shipped in Laravel 6.0.

Going about implementing this is relatively easy - you just override `logout` in the default `LoginController` provided by the framework. We're effectively running the same code under the hood but calling `logoutCurrentDevice()` instead of `logout()`.

```php
class LoginController extends LoginController
{
    use AuthenticatesUsers;

    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $this->guard()->logoutCurrentDevice();

        $request->session()->invalidate();

        return $this->loggedOut($request) ?: redirect('/');
    }
}
```

Using `logoutCurrentDevice()` is a simple way to improve the user experience for apps that a user might login to from multiple devices, and is generally the behaviour they would expect. It would be quite confusing (and frustrating) if logging out from a site on your phone suddenly meant you were logged out on your computer as well.
