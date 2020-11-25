---
title: "Diffing Eloquent collections in Laravel 4"
path: /posts/diffing-eloquent-collections-in-laravel-4
author: Dwight Watson
date: 2013-11-24
tags: ["laravel", "php"]
---

**Edit: Merging, diffing and intersecting Eloquent collections is now included in Laravel by default! Please see the [pull request here](https://github.com/laravel/framework/pull/2795) and [issue discussion here](https://github.com/laravel/framework/issues/2780) for more information.**

**Keeping the original post here just for reference:**

We needed a way to simply diff two Eloquent collections in an app we're working on at the moment. Diffing is great if you've got one collection and want to subtract the contents of another from it. For example, say a `Post` has many `Categories`. When we display a list of `Categories` that a user can add to a post, we would want to subtract from that collection `Categories` that already belong to it, so as a user cannot add the same `Category` twice. Here's how we acheived this.

First, we created an extension of the Eloquent collection:

    <?php namespace Studious\Support;

	class Collection extends \Illuminate\Database\Eloquent\Collection
	{
	    /**
		 * Diff collection with another collection.
		 *
		 * @param  \Illuminate\Support\Collection  $collection
		 * @return \Illuminate\Support\Collection
		 */
		 public function diff(Collection $collection)
		 {
		     $diff = new static;

			 foreach ($this->items as $item)
			 {
			     if ( ! $collection->contains($item->getKey())))
				 {
				     $diff->add($item);
				 }
			 }

			 return $diff;
		 }
	}

Make sure you've got your custom loading setup, as you can see this collection is namespaced to `Studious\Support`. Next, we adjust our `BaseModel`. All our models extend from the `BaseModel` instead of `Eloquent` so we can add extra functionality to all models, including this:

    <?php

	class BaseModel extends Eloquent
    {
	    public function newCollection(array $models = array())
		{
		    return Studious\Support\Collection($models);
		}
	}`

With this setup, you're now able to diff collections. Careful though, you'll only want to use this on collections of the same object type. It uses a model's primary key in order to diff the collections, so if you have different models in there it's going to get a little wonky!

    $categories = Category::all();
	$postsCategories = Post::first()->categories;

	$unusedCategories = $categories->diff($postsCategories);

Boom! Now you've got all the categories that aren't attached to your post!
