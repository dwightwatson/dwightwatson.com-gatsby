---
title: "New collection methods in Laravel 4.1"
path: /posts/new-collection-methods-in-laravel-4-1
author: Dwight Watson
date: 2013-12-06
tags: ["laravel", "php"]
---

I&#039;m just a little excited as some of my pull requests to Laravel has been accepted into the upcoming Laravel 4.1! I&#039;m going to have to make some pull requests to the docs now so that others who don&#039;t trawl through the API or the code itself also know about these additions. On both `Illuminate\Support\Collection` and `Illuminate\Database\Eloquent\Collection` there are now a series of methods for diffing, merging and intersecting collections (as I&#039;ve written about on here before) as well as a method for retrieving the unique items from a collection.

    $c1 = new Collection([ // some data ]);
	$c2 = new Collection([ // some other data ]);
	
	// Diff both collections
	$c1-&gt;diff($c2);
	
	// Merge both collections
	$c1-&gt;merge($c2);
	
	// Intersect both collections
	$c1-&gt;intersect($c2);
	
	// Get unique items from collection
	$c1-&gt;unique();
	
The methods on the base Support collection use internal PHP array functions which use the keys/values of the arrays to make changes, while the methods on the Eloquent collection use the primary keys of the models to achieve the same effect. Can&#039;t wait to bring all my projects up to Laravel 4.1 so I can start using these without having to use my custom extensions!
