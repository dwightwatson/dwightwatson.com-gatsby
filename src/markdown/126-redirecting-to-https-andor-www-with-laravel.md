---
title: "Redirecting to HTTPS and/or www with Laravel"
path: /posts/redirecting-to-https-andor-www-with-laravel
author: Dwight Watson
date: 2017-07-12
tags: ["laravel"]
---

You&#039;re often going to want to redirect your root domain or the `www.` subdomain to one or the other, rather than having both point to the same site. If they both display the same site then Google will interpret them as duplicate content and it can affect your ratings. The same goes for serving your site over HTTP and HTTPS - you&#039;re best to perform a permanent redirect to the URL and scheme you want your customers to use.

Generally it&#039;s faster to get this sort of thing up and running in your web server config (Apache or nginx), however it&#039;s often easier to handle it in your app code. It&#039;s also much more portable and transparent, meaning you can deploy the app whereever and it will work the way you expect and it&#039;s easier for developers to see where the action happens.

Here&#039;s the middleware I use to redirect Laravel requests from HTTP to HTTPS, and from the root URL to the `www.` subdomain. It&#039;s easy to invert this if you prefer to redirect from `www.` to just the root domain too if that&#039;s your thing. Note that we use a `301` - a permanent redirect which tells Google that this ain&#039;t changng.

```php
&lt;?php

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
        if (app()-&gt;environment(&#039;production&#039;)) {
            if (substr($request-&gt;header(&#039;Host&#039;), 0, 4)  !== &#039;www.&#039;) {
               $request-&gt;headers-&gt;set(&#039;Host&#039;, &#039;www.neonstunami.com.au&#039;);

               return redirect()-&gt;secure($request-&gt;path(), 301);
            }

            if (! $request-&gt;secure()) {
                return redirect()-&gt;secure($request-&gt;path(), 301);
            }
        }

        return $next($request);
    }
}
```
