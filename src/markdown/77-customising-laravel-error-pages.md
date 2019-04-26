---
title: "Customising Laravel error pages"
path: /posts/customising-laravel-error-pages
author: Dwight Watson
date: 2014-10-24
tags: ["laravel", "php"]
---

In production by default whenever something goes wrong you&#039;ll see a bland grey old screen with the all-too-familiar heading &quot;Whoops, something went wrong.&quot;. This is definitely better than leaving `debug` on and displaying the full stack trace to your user, but there is quite a bit we can do to improve the situation.

First, we want to give users a better idea about what went wrong - was it their fault or ours? Can they do something else to make their request work, or is there something we need to fix up on the server end? Second, we want to give the user some recourse - if they went to a page that did not exist (for example) we want to guide them to finding what they were looking for or otherwise get them to continue to browse the site, rather than bouncing. Finally, we want to make sure that we&#039;re returning the right HTTP status code so that the search engines know what&#039;s up. If we&#039;re talking about missing content, serving a HTTP 5xx response is going to confuse Google when it should be getting a HTTP 404 to let it know the requested content does not exist.

Let&#039;s take a look at `app/start/global.php`:

    App::error(function(Exception $exception, $code)
    {
        Log::error($exception);
    });

Awesome, so when something goes wrong Laravel will log the error and then move on. 

    App::error(function(Exception $exception, $code)
    {
        Log::error($exception);

        if (App::environment(&#039;production&#039;))
        {
            return Response::view(&#039;pages.error&#039;, array(), 500);
        }
    }

Now, the production site will build and return your custom `pages.error` view with a 500 error so your users won&#039;t see the ugly grey error page. Also, it will only run in production so that the debug stack trace will still work in your local development environment. Now let&#039;s talk about missing content.

Usually you&#039;re going to have one of two exceptions when content isn&#039;t found: `Symfony\Component\HttpKernel\Exception\NotFoundHttpException` or `Illuminate\Database\Eloquent\ModelNotFoundException` (which you&#039;ll have if you ever use methods like `findOrFail()` or model route binding). When this occurs you want to return a different view (one that indicates that the content doesn&#039;t exist) with a HTTP 404 status. Unfortunately you&#039;ll need to register two different exceptions seperately - one using the `App::missing()` to handle the `NotFoundHttpException` and another specifically for the `ModelNotFoundException`.

    App::missing(function(Exception $exception)
    {
        return Response::view(&#039;pages.missing&#039;, array(), 404);
    });

    App::error(function(Illuminate\Database\Eloquent\ModelNotFoundException $exception)
    {
        return Response::view(&#039;pages.missing&#039;, array(), 404);
    });

It&#039;s not too hard to get custom error pages for your Laravel application and taking the time to do so provides a better customer experience and helps search engines understand your site. I was able to rid a whole heap of unneccessary crawl errors in Google Webmaster Tools by properly sending back the correct HTTP response code.
