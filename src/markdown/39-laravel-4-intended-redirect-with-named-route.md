---
title: "Laravel 4 intended redirect with named route"
path: /posts/laravel-4-intended-redirect-with-named-route
author: Dwight Watson
date: 2014-01-12
tags: ["laravel", "php"]
---

We had a hiccup recently where we had changed the URI of the page a user would be redirected to after logging in. Because we had been using `return Redirect::intended(&#039;/home&#039;)` we didn&#039;t initially catch that if no intended path was in the session, logged in users would be redirected to the hard-coded path instead of a named route. I made a pull request to add a new method called `intendedWithRoute()` which would also allow you to pass a named route and parameters, but it was not merged.

Instead, Taylor suggested this option which was a silly oversight on my part. I wrote about this solution for others the might come across the same problem.

    // Use the route() helper function to generate the route path for the intended() method.
    return Redirect::intented(route(&#039;home&#039;));
