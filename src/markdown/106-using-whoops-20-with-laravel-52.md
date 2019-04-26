---
title: "Using Whoops 2.0 with Laravel 5.2"
path: /posts/using-whoops-20-with-laravel-52
author: Dwight Watson
date: 2016-01-22
tags: ["laravel", "laravel 5"]
---

Installing the new Whoops 2.0 in Laravel 5.2 is a little bit different to how it was installed in Laravel 5.1. The render method in Laravel&#039;s exception handler actually handles a number of default exceptions for you, like the validation HTTP exception or the ModelNotFoundException. In these instances you might actually want the page to render with the validation errors or the 404, so it&#039;s better to let them be handled that way. Instead, you can override the method in app/Exceptions/Handler.php that generates the Symfony exception response and instead use Whoops.

```
/**
 * Create a Symfony response for the given exception.
 *
 * @param  \Exception  $e
 * @return mixed
 */
protected function convertExceptionToResponse(Exception $e)
{
    if (config(&#039;app.debug&#039;)) {
        $whoops = new \Whoops\Run;
        $whoops-&gt;pushHandler(new \Whoops\Handler\PrettyPageHandler);

        return response()-&gt;make(
            $whoops-&gt;handleException($e),
            method_exists($e, &#039;getStatusCode&#039;) ? $e-&gt;getStatusCode() : 500,
            method_exists($e, &#039;getHeaders&#039;) ? $e-&gt;getHeaders() : []
        );
    }

    return parent::convertExceptionToResponse($e);
}
```

If you&#039;re building an API instead of a web app you might consider returning the `\Whoops\Handler\JsonResponseHandler` which will provide a better output for those types of requests.
