---
title: "Redirecting to HTTPS and/or www with Laravel"
path: /posts/redirecting-to-https-andor-www-with-laravel
author: Dwight Watson
date: 2017-07-12
tags: ["laravel"]
---

You're often going to want to redirect your root domain or the `www.` subdomain to one or the other, rather than having both point to the same site. If they both display the same site then Google will interpret them as duplicate content and it can affect your ratings. The same goes for serving your site over HTTP and HTTPS - you're best to perform a permanent redirect to the URL and scheme you want your customers to use.

Generally it's faster to get this sort of thing up and running in your web server config (Apache or nginx), however it's often easier to handle it in your app code. It's also much more portable and transparent, meaning you can deploy the app whereever and it will work the way you expect and it's easier for developers to see where the action happens.

Here's the middleware I use to redirect Laravel requests from HTTP to HTTPS, and from the root URL to the `www.` subdomain. It's easy to invert this if you prefer to redirect from `www.` to just the root domain too if that's your thing. Note that we use a `301` - a permanent redirect which tells Google that this ain't changng.

```php
<?php

namespace App\Http\Middleware;

use Closure;

class SecureRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (app()->environment('production')) {
            if (substr($request->header('Host'), 0, 4)  !== 'www.') {
               $request->headers->set('Host', 'www.neonstunami.com.au');

               return redirect()->secure($request->path(), 301);
            }

            if (! $request->secure()) {
                return redirect()->secure($request->path(), 301);
            }
        }

        return $next($request);
    }
}
```
