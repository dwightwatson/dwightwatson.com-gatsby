---
title: "Laravel splat routes"
path: /posts/laravel-splat-routes
author: Dwight Watson
date: 2015-01-22
tags: ["laravel", "php"]
---

Recently I had to change one of the slugs for a model on a site I was working on. Because the pages under that model would have had a lot of inbound links we wanted to do a 301 redirect to the new slug. Here's the route I added which I thought would do the trick.

    // Wrong way, only handles the first level of nesting
    Route::get('umelb/{splat?}', function($splat = '') {
        return Redirect::to("unimelb/{$splat}", 301);
    });

However, while this would work for anything one directory under the slug it wouldn't work for anything more nested than that. For example:

* `umelb/subjects` would 301 redirect to `unimelb/subjects`, however;
* `umelb/subjects/mdia1001` would 404 instead.

The fix to this is to let the route know that the splat can literally be any character, so that it will encompass every route underneath.

    // Better way, handles any level of nesting
    Route::get('umelb/{splat?}', function ($splat = '') {
        return Redirect::to("unimelb/{$splat}", 301);
    })->where('splat', '.+');
