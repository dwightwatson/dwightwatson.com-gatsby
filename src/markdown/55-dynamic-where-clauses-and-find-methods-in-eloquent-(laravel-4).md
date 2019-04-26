---
title: "Dynamic where clauses and find methods in Eloquent (Laravel 4)"
path: /posts/dynamic-where-clauses-and-find-methods-in-eloquent-(laravel-4)
author: Dwight Watson
date: 2014-05-21
tags: ["laravel", "php"]
---

I've found that a good portion of the Laravel community doesn't know about the existence of dynamic where clauses in Eloquent because they aren't documented obviously and are only spoken of rarely. Ultimately they are simply syntatic sugar, but they make writing your Eloquent model queries a little easier. I've decided to go over some of my favourite dynamic where clauses as well as some of the more advanced find methods that are available on all your models in Laravel 4 as I hope that they will be of use to some of you.

## Dynamic where clauses

Previously, you might have found a user using their email address like so:

    User::where('email', '=', 'dwight@example.com')->first();

First, we can make it a little bit shorter by omitting the `'='`, as an equals is implicit.

    User::where('email', 'dwight@example.com')->first();

Looking good. Now, let's make use of a *dynamic* where clause to clean it up further.

    User::whereEmail('dwight@example.com')->first();

Nice! What if the column name we wantet to query by was underscored, like `first_name` though?

    User::whereFirstName('Dwight')->first();

The camel casing will take care of it for you!

### Advanced where clauses

What if we wanted to take this a little further though. Say, by finding a user by their email address *and* first name?

    User::whereEmailAndFirstName('dwight@example.com', 'Dwight')->first();

How neat is that? Otherwise, we could find a user by their email address *or* their first name!

    User::whereEmailOrFirstName('dwight@example.com', 'Dwight')->first();

As you can see, dynamic finders are a really simple way to write shorter, more readable code.

## Find methods

There are more ways we can find users though. You may have noticed after each call above we had to append `->first()` to get the first result of the query.

Instead, we could just get the first model that matches an array of attributes:

    User::firstByAttributes(['email' => 'dwight@example.com', 'first_name' => 'Dwight']);

Now, this is a little bit longer than above, but it might not be depending on where/how you're using it!

What if we wanted to make a new model if it doesn't find one with the above attributes? Well;

    User::firstOrNew(['email' => 'dwight@example.com', 'first_name' => 'Dwight']);

That way, you know you're going to get a model back and you can save it later. However, if you want to save it immediately...

    User::firstOrCreate(['email' => 'dwight@example.com', 'first_name' => 'Dwight']);

Too easy!

### With the ID

Now, the same kind of stuff works with model IDs. Say my user ID is 12. You probably all know:

    User::find(12);

Yeah, that old chestnut. What if I'd like to throw an exception (`Illuminate\Database\Eloquent\ModelNotFoundException`) if the model cannot be found?

    User::findOrFail(12);

Good good. Instead, you could opt to just to build a new model with the given ID.

    User::findOrNew(12);

---

I hope that these are useful to anyone who hasn't used them before, I think they're pretty neat! I'd love to see dynamic finders added, like `User::findByEmail('dwight@example.com')`, but one thing at a time!
