---
title: "Overriding Laravel authentication controllers"
path: /posts/overriding-laravel-authentication-controllers
author: Dwight Watson
date: 2017-08-10
tags: ["laravel"]
---

I spent a couple of hours over the weekend re-writing the authentication controllers that run [StudentVIP](https://studentvip.com.au). They were written a long time ago in the early Laravel 4 days (and originally ran on the now-defunct Sentry package). It was time to bring them back into line with the default scaffolding that ships with Laravel to make it easier for everyone that works on the app.

I noticed that the logout method doesn’t really provide any hooks for you to customise what happens. In my use-case we needed to customise this a little bit, but still wanted to defer the core logging-out logic back to the framework.

```php
/**
 * Log the user out of the application.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return \Illuminate\Http\Response
 */
public function logout(Request $request)
{
    $this->guard()->logout();

    $request->session()->invalidate();

    return redirect('/');
 }
```

Turns out that PHP allows you to import methods from a trait with an alias, which lets you write a method of the same name and then call it. This is helpful because it effectively allows you to override methods provided by a trait and still use them, much like `parent::` would let you call a parent classes method.

```php
class LoginController extends Controller
{
    use AuthenticatesUser {
        logout as parentLogout;
    }
}
```

With the alias in place you can then call that alias on the class and it it will work as you expect.

```php
class LoginController extends Controller
{
    public function logout(Request $request)
    {
        dispatch(new RecordLogout($request->user());

        return $this->parentLogout($request);
    }
}
```
