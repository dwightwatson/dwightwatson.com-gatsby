---
title: "UrlRoutable in Laravel 5"
path: /posts/urlroutable-in-laravel-5
author: Dwight Watson
date: 2015-03-21
tags: ["laravel", "laravel 5", "php"]
---

Laravel 5 includes a great new feature (biased as I may be) that I made the initial pull request for. It&#039;s the new `Illuminate\Contracts\Routing\UrlRoutable` interface to be used with Eloquent models. It makes generating routes just a little bit simpler and keeps your code DRYer. Let&#039;s take a look at how it works.

    &lt;?php namespace App;

    use Illuminate\Database\Eloquent\Model;

    class Post extends Model 
    {
        //
    }

Previously, if we wanted to route to a post we would need to do something like this.

    // We have to pass the model&#039;s ID.
    URL::route(&#039;posts.show&#039;, $post-&gt;id);

If we decided we&#039;d rather use a post&#039;s slug instead of it&#039;s ID to make the site prettier we would need to change every URL on the site to reflect this.

    URL::route(&#039;posts.show&#039;, $post-&gt;slug);

However, in Laravel 5 this is now handled by the model. The `UrlRoutable` contract includes a method called `getRouteKeyName()` which returns the model&#039;s key (usually &#039;id&#039;). It means now you can simply pass the model to the `route()` method to get the URL generated.

    // Works just the same as before.
    URL::route(&#039;posts.show&#039;, $post);

And now, if you want to use a slug instead of the primary key you can simply override that method in your model.

    &lt;?php namespace App;

    use Illuminate\Database\Eloquent\Model;

    class Post extends Model 
    {
        /**
         * Get the route key for the model
         *
         * @return string
         */
        public function getRouteKeyName()
        {
            return &#039;slug&#039;;
        }
    }

