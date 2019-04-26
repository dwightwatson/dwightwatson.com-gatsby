---
title: "Dynamic where clauses and find methods in Eloquent (Laravel 4)"
path: /posts/dynamic-where-clauses-and-find-methods-in-eloquent-(laravel-4)
author: Dwight Watson
date: 2014-05-21
tags: ["laravel", "php"]
---

I&#039;ve found that a good portion of the Laravel community doesn&#039;t know about the existence of dynamic where clauses in Eloquent because they aren&#039;t documented obviously and are only spoken of rarely. Ultimately they are simply syntatic sugar, but they make writing your Eloquent model queries a little easier. I&#039;ve decided to go over some of my favourite dynamic where clauses as well as some of the more advanced find methods that are available on all your models in Laravel 4 as I hope that they will be of use to some of you.

## Dynamic where clauses

Previously, you might have found a user using their email address like so:

    User::where(&#039;email&#039;, &#039;=&#039;, &#039;dwight@example.com&#039;)-&gt;first();
	
First, we can make it a little bit shorter by omitting the `&#039;=&#039;`, as an equals is implicit.

    User::where(&#039;email&#039;, &#039;dwight@example.com&#039;)-&gt;first();
	
Looking good. Now, let&#039;s make use of a *dynamic* where clause to clean it up further.

    User::whereEmail(&#039;dwight@example.com&#039;)-&gt;first();
	
Nice! What if the column name we wantet to query by was underscored, like `first_name` though?

    User::whereFirstName(&#039;Dwight&#039;)-&gt;first();
	
The camel casing will take care of it for you!

### Advanced where clauses

What if we wanted to take this a little further though. Say, by finding a user by their email address *and* first name?

    User::whereEmailAndFirstName(&#039;dwight@example.com&#039;, &#039;Dwight&#039;)-&gt;first();
	
How neat is that? Otherwise, we could find a user by their email address *or* their first name!

    User::whereEmailOrFirstName(&#039;dwight@example.com&#039;, &#039;Dwight&#039;)-&gt;first();
	
As you can see, dynamic finders are a really simple way to write shorter, more readable code.

## Find methods

There are more ways we can find users though. You may have noticed after each call above we had to append `-&gt;first()` to get the first result of the query. 

Instead, we could just get the first model that matches an array of attributes:

    User::firstByAttributes([&#039;email&#039; =&gt; &#039;dwight@example.com&#039;, &#039;first_name&#039; =&gt; &#039;Dwight&#039;]);
	
Now, this is a little bit longer than above, but it might not be depending on where/how you&#039;re using it!

What if we wanted to make a new model if it doesn&#039;t find one with the above attributes? Well;

    User::firstOrNew([&#039;email&#039; =&gt; &#039;dwight@example.com&#039;, &#039;first_name&#039; =&gt; &#039;Dwight&#039;]);
	
That way, you know you&#039;re going to get a model back and you can save it later. However, if you want to save it immediately...

    User::firstOrCreate([&#039;email&#039; =&gt; &#039;dwight@example.com&#039;, &#039;first_name&#039; =&gt; &#039;Dwight&#039;]);
	
Too easy!

### With the ID

Now, the same kind of stuff works with model IDs. Say my user ID is 12. You probably all know:

    User::find(12);
	
Yeah, that old chestnut. What if I&#039;d like to throw an exception (`Illuminate\Database\Eloquent\ModelNotFoundException`) if the model cannot be found?

    User::findOrFail(12);
	
Good good. Instead, you could opt to just to build a new model with the given ID.

    User::findOrNew(12);
	
---

I hope that these are useful to anyone who hasn&#039;t used them before, I think they&#039;re pretty neat! I&#039;d love to see dynamic finders added, like `User::findByEmail(&#039;dwight@example.com&#039;)`, but one thing at a time!
