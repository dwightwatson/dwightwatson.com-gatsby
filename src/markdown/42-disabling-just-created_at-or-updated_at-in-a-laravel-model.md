---
title: "Disabling just created_at or updated_at in a Laravel model"
path: /posts/disabling-just-created_at-or-updated_at-in-a-laravel-model
author: Dwight Watson
date: 2014-02-07
tags: ["laravel", "php"]
---

Had an issue today where we wanted to store each time a user logged in into a `logins` table. We wanted a `created_at` timestamp, but not a `updated_at` timestamp as it was unlikely these records would ever be updated. While it&#039;s very easy to create the migration without the `updated_at` column, Eloquent would still try and set that timestamp when creating records.

By setting the class constant of `UPDATED_AT` to `null` on the models you wish to disable that column, Laravel will no longer attempt to set the column automatically.

    class User extends Model 
    {
        /**
         * The name of the &quot;updated at&quot; column.
         *
         * @var string
         */
        const UPDATED_AT = null;
    }

**Below is the older solution for this issue.**

I thought that overriding the `getDates()` method would do the trick, but alas. My solution to disabling one or the other of the default timestamps is to [write a mutator](http://laravel.com/docs/eloquent#accessors-and-mutators) for that column.

    public function setUpdatedAt($value)
    {
        // Do nothing.
    }

Of course, if you wanted to do this for the `created_at` column, it&#039;s just as easy.

*Edit: The original post used a method called `setUpdatedAtAttribute` which was incorrect. The post has since been updates with the correct method.*

*Second edit: I&#039;ve updated the post with a newer, simpler solution that means defining a class constant instead of overriding a method.*
