---
title: "Autologin with Laravel 5.6"
path: /posts/autologin-with-laravel-56
author: Dwight Watson
date: 2018-03-22
tags: ["laravel"]
---

Automatically logging in your users when they come back to your app is a great way to keep them engaged. If you can prevent distracting them from the authentication flow where they may have forgotten their password, or even the email address they used to join your site then they can get on with doing what they intended and they'll be happier customers for it.

The most common use-case for this I've worked with is for customer notifications. Whether it be email or text, if you're sending them a private interaction with a link to come back to your site you can set it up to log them back into their account (if they aren't already).

## The old way

It's this very feature I built [`watson/autologin`](https://github.com/dwightwatson/autologin) for - a drop in package to simply generate links that would automatically log users in. This package was backed by a database table which would store expiring URL tokens with the location the link should redirect to and who it should log in.

## The new way

Shipping in Laravel 5.6.12 there's a [great new feature called signed URLS](https://laravel.com/docs/5.6/urls#signed-urls) which will allow you implement this feature really simply and it doesn't require database backing.

Let's take a look at a really simple example of how you could implement this using signed URLs. To start, we'll create an auto login route the uses the `signed` middleware. It's this middleware that will throw an exception if the URL signature doesn't match. In this example we take the user passed in, log them in and redirect them home.

```php
use App\User;
use Illuminate\Support\Facades\Auth;

Route::get('/autologin/{user}, function (User $user) {
  Auth::login($user);

  return redirect()->home();
})->name('autologin')->middleware('signed');
```

Generating this URL is simple as well, you can use the URL facade as you would with any other URL generation.

```php
use App\User;
use Illuminate\Support\Facades\URL;

$user = User::first();

$url = URL::signedRoute('autologin', ['user' => $user]);
```

This will actually generate the URL you expect, but with a nice long "random" signature tacked on as a query parameter. Something like `/autologin/1?signature=someReallyLongString`. When this route is hit by Laravel, because you have used the `signature` middleware it will actually look at your signature to verify that it's valid and will only go ahead if it's correct.

If you want your autologin links to be time sensitive as well this is also available to you right out of the box. Just like that you can have a link that will automatically log your user in but expire after a day.

Mind you, if you're doing this you might strongly consider adding some exception handling `Illuminate\Routing\Exceptions\InvalidSignatureException` (the exception thrown when an unexpected signature is received) and letting your customer know that their link has expired rather than showing them a 500 response.

```php
use App\User;
use Illuminate\Support\Facades\URL;

$user = User::first();

$url = URL::temporarySignedRoute(
  'autologin',
  now()->addDays(1),
  ['user' => $user]
);
```

## How does it work?

It's actually worth diving in (à la Mohamed Said) and taking a look at how this works under the hood because the implementation is really simple. Let's take a look at the `signedRoute` method and ignoring the rest take a special interest in the final line.

```php
/**
 * Create a signed route URL for a named route.
 *
 * @param  string  $name
 * @param  array  $parameters
 * @param  \DateTimeInterface|int  $expiration
 * @return string
 */
public function signedRoute($name, $parameters = [], $expiration = null)
{
    $parameters = $this->formatParameters($parameters);

    if ($expiration) {
        $parameters = $parameters + ['expires' => $this->availableAt($expiration)];
    }

    $key = call_user_func($this->keyResolver);

    return $this->route($name, $parameters + [
        'signature' => hash_hmac('sha256', $this->route($name, $parameters), $key),
    ]);
}
```

This method is really returning the URL you wanted, with an additional query parameter called `signature` tacked onto the end. This query parameter is the route itself (how meta!) that is hashed using SHA-256 *with* the app's encryption key.

This is the `APP_KEY` you set in your environment that is private to your app and used for all internal encryption. Nobody but you should have access to this key, so other people won't be able to generate valid signed URLs to your app by SHA-ing your routes.

That's cool - but what actually happens next?

If we look at the middleware - `Illuminate\Routing\Middleware\ValidateSignature` there's not a whole lot going on, but what is there is very simple and clear.

```php
if ($request->hasValidSignature()) {
    return $next($request);
}

throw new InvalidSignatureException;
```

This middleware asks the request to confirm the signature is valid, and if so calls through to the next middleware in the stack. If it's not a valid signature we instead fall through and the `InvalidSignatureException` is thrown, throwing off any would-be hackers trying to use our fancy URLs.

Finally, let's take a look at the implementation of `hasValidSignature`. There's a little more going on here but again there's only a couple of things we need to focus on.

```php
/**
 * Determine if the given request has a valid signature.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return bool
 */
public function hasValidSignature(Request $request)
{
    $original = rtrim($request->url().'?'.http_build_query(
        Arr::except($request->query(), 'signature')
    ), '?');

    $expires = Arr::get($request->query(), 'expires');

    $signature = hash_hmac('sha256', $original, call_user_func($this->keyResolver));

    return  hash_equals($signature, $request->query('signature')) &&
           ! ($expires && Carbon::now()->getTimestamp() > $expires);
}
```

What this does is rebuild the route without the signature query parameter - just as it would have been done in `signedRoute`. Next it hashes it with SHA-256 again and then simply compares it with the `signature` in the query parameters. If they match then it's a valid signature generated by Laravel for this very request and is allowed to continue through the app.

You can also look to see that it checks to see if there is an `expires` query parameter that would have been passed if you called `temporarySignedRoute` and if so it ensures that it's a timestamp still in the future in addition to the hashes matching.

Thanks Taylor for adding in this really simple feature that is going to be really nice to use, and is actually quite beautiful in implementation.

## One more thing

Did you think it was odd that the middleware called `hasValidSignature()` on the request, when that method is actually on `Illuminate\Routing\UrlGenerator`? Good catch, turns out this is actually set up as a macro in Laravel's `FoundationServiceProvider`.


```php
Request::macro('hasValidSignature', function () {
    return URL::hasValidSignature($this);
});
```

Nice.
