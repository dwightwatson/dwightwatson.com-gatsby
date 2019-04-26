---
title: "UrlRoutable in Laravel 5"
path: /posts/urlroutable-in-laravel-5
author: Dwight Watson
date: 2015-03-21
tags: ["laravel", "laravel 5", "php"]
---

Laravel 5 includes a great new feature (biased as I may be) that I made the initial pull request for. It's the new `Illuminate\Contracts\Routing\UrlRoutable` interface to be used with Eloquent models. It makes generating routes just a little bit simpler and keeps your code DRYer. Let's take a look at how it works.

    <?php namespace App;

    use Illuminate\Database\Eloquent\Model;

    class Post extends Model
    {
        //
    }

Previously, if we wanted to route to a post we would need to do something like this.

    // We have to pass the model's ID.
    URL::route('posts.show', $post->id);

If we decided we'd rather use a post's slug instead of it's ID to make the site prettier we would need to change every URL on the site to reflect this.

    URL::route('posts.show', $post->slug);

However, in Laravel 5 this is now handled by the model. The `UrlRoutable` contract includes a method called `getRouteKeyName()` which returns the model's key (usually 'id'). It means now you can simply pass the model to the `route()` method to get the URL generated.

    // Works just the same as before.
    URL::route('posts.show', $post);

And now, if you want to use a slug instead of the primary key you can simply override that method in your model.

    <?php namespace App;

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
            return 'slug';
        }
    }

