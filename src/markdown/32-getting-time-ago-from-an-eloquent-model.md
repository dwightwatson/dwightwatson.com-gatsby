---
title: "Getting "time ago" from an Eloquent model"
path: /posts/getting-time-ago-from-an-eloquent-model
author: Dwight Watson
date: 2013-11-28
tags: ["laravel", "php"]
---

A nice semi-hidden feature of timestamps in Eloquent is that they don't just return strings from the database - they actually return an instance of [Carbon](https://github.com/briannesbitt/Carbon), a great extension of PHP's DateTime library. What this means is that a heap of functions (and I mean a heap) are available right on your model's timestamps. It's worth having a read through the GitHub README to see what is available, but one of the coolest methods is `diffForHumans()`, a handy little function providing the long sought-after "time ago" format we often need.

    $user = User::first();
	echo $user->created_at->diffForHumans(); // 2 days ago

	$user->touch();
	echo $user->created_at->diffForHumans(); // a second ago

Too easy! By default, Laravel will return the Carbon object for `created_at`, `updated_at` and `deleted_at` timestamps. However if you'd like it to provide the Carbon object for your own custom timestamps it's also really easy (look up [date mutators in the docs](http://laravel.com/docs/eloquent#date-mutators)).

    class User extends Eloquent
	{
	    public function getDates()
		{
			return array('created_at', 'updated_at', 'deleted_at', 'unsubscribed_at');
		}
	}
