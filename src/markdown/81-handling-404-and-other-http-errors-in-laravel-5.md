---
title: "Handling 404 and other HTTP errors in Laravel 5"
path: /posts/handling-404-and-other-http-errors-in-laravel-5
author: Dwight Watson
date: 2015-01-15
tags: ["laravel", "laravel 5"]
---

In Laravel 4, it was [a little bit tricky](https://stackoverflow.com/questions/26291854/laravel-4-production-site-customize-error-page) to handle all the possible 404 cases in the app and return a nice customised error page. Thankfully Laravel 5 makes it a lot easier to return a specific view for any HTTP error.

If you take a look at `app/Exceptions/Handler` in the development branch of Laravel 5, you&#039;ll spot [this code handling the response](https://github.com/laravel/laravel/blob/develop/app/Exceptions/Handler.php#L37-L47) to an exception.

    if ($this-&gt;isHttpException($e))
    {
        return $this-&gt;renderHttpException($e);
    }

This handly little bit of code leverages this [HTTP handling in the framework](https://github.com/laravel/framework/blob/master/src/Illuminate/Foundation/Exceptions/Handler.php#L77-L104) which simply checks to see if the exception is a HTTP exception, and then if the corresponding view exists in the `errors` view folder. If the view does exist it returns it with the correct HTTP status.

    if (view()-&gt;exists(&#039;errors.&#039;.$e-&gt;getStatusCode()))
    {
        return response()-&gt;view(&#039;errors.&#039;.$e-&gt;getStatusCode(), [], $e-&gt;getStatusCode());
    }

So, to handle a 404 with your own error page, simply create the view `errors/404.blade.php`. Likewise, if you want to handle another sort of error you can just create a view with the appropriate HTTP status code. You may even notice that the framework ships with a `503.blade.php`, which is used when you pop your app into maintenance mode with `php artisan down`.
