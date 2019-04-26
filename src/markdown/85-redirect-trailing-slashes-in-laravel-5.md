---
title: "Redirect trailing slashes in Laravel 5"
path: /posts/redirect-trailing-slashes-in-laravel-5
author: Dwight Watson
date: 2015-02-05
tags: ["laravel", "laravel 5", "php"]
---

Laravel 5 is finally here! 

And my first task on the fresh new framework is to redirect away from trailing slashes. Laravel provides you with a `.htaccess` file to handle this for you if you&#039;re using Apache, but it&#039;s not handled for Nginx users. Furthermore, neither Homestead nor Forge will handle it for you. You could go edit your Nginx config, but I find that a pain when I&#039;ve got an app deployed over multiple servers (I like to think of my Forge instances as always replaceable, so I&#039;d rather keep configuration in my app as much as possble).

Here&#039;s my first middleware, `RedirectTrailingSlash`. Simply fix the namespace, pop it into your Laravel 5 project and then add it to your kernel. Too easy. Now any URL that ends in `/` will be 301 redirected to the path without the trailing slash, keeping things clean and simple!

    &lt;?php namespace App\Http\Middleware;

    use Closure;
    use Illuminate\Support\Facades\Redirect;
    use Illuminate\Support\Str;

    class RedirectTrailingSlash {

        /**
         * Handle an incoming request.
         *
         * @param  \Illuminate\Http\Request  $request
         * @param  \Closure  $next
         * @return mixed
         */
        public function handle($request, Closure $next)
        {
            if (preg_match(&#039;/.+\/$/&#039;, $request-&gt;getRequestUri()))
            {
                return Redirect::to(rtrim($request-&gt;getRequestUri(), &#039;/&#039;), 301);
            }

            return $next($request);
        }

    }

