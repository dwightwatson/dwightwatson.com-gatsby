---
title: "Getting &quot;time ago&quot; from an Eloquent model"
path: /posts/getting-time-ago-from-an-eloquent-model
author: Dwight Watson
date: 2013-11-28
tags: ["laravel", "php"]
---

A nice semi-hidden feature of timestamps in Eloquent is that they don&#039;t just return strings from the database - they actually return an instance of [Carbon](https://github.com/briannesbitt/Carbon), a great extension of PHP&#039;s DateTime library. What this means is that a heap of functions (and I mean a heap) are available right on your model&#039;s timestamps. It&#039;s worth having a read through the GitHub README to see what is available, but one of the coolest methods is `diffForHumans()`, a handy little function providing the long sought-after &quot;time ago&quot; format we often need.

    $user = User::first();
	echo $user-&gt;created_at-&gt;diffForHumans(); // 2 days ago
	
	$user-&gt;touch();
	echo $user-&gt;created_at-&gt;diffForHumans(); // a second ago
	
Too easy! By default, Laravel will return the Carbon object for `created_at`, `updated_at` and `deleted_at` timestamps. However if you&#039;d like it to provide the Carbon object for your own custom timestamps it&#039;s also really easy (look up [date mutators in the docs](http://laravel.com/docs/eloquent#date-mutators)).

    class User extends Eloquent
	{
	    public function getDates()
		{
			return array(&#039;created_at&#039;, &#039;updated_at&#039;, &#039;deleted_at&#039;, &#039;unsubscribed_at&#039;);
		}
	}
