---
title: "Partial conventions in Laravel"
path: /posts/partial-conventions-in-laravel
author: Dwight Watson
date: 2014-09-02
tags: ["laravel", "php"]
---

I&#039;ve been doing a couple of [Laracasts](https://laracasts.com/) videos, specifically the recent series on building Larabook, and noticed something he was doing that I&#039;m sure will influence a lot of new Laravel developers. I thought I&#039;d propose an alternative, one that I use in my personal and professional life when working with Laravel.

It seems that often, partials are simply being placed in a `partials` folder:

    // Location of the footer partial
    layouts/partials/footer.blade.php

However, I prefer to take a more Rails-like approach, whereby instead of having a directory for partials we simply prefix the view with an underscore.

    // My preferred location of the footer partial
    layouts/_footer.blade.php

This convention carries on for any other kind of partial too. Say you use a partial for displaying a user, maybe for search results or something like that. You&#039;d underscore and singularise the model name.

    // Model view partials typically go in their directory, also prefixed
    users/_user.blade.php

Again, these are Rails conventions (though other frameworks might use them too). I like them a lot, and think they&#039;re a lot better than having a `partials` directory hidden under each of your views folders. But it&#039;s a good option that I think should be more widely considered.
