---
title: "Merging, diffing and intersecting Eloquent collections"
path: /posts/merging-diffing-and-intersecting-eloquent-collections
author: Dwight Watson
date: 2013-11-26
tags: ["laravel", "php"]
---

**Edit: Merging, diffing and intersecting Eloquent collections is now included in Laravel by default! Please see the [pull request here](https://github.com/laravel/framework/pull/2795) and [issue discussion here](https://github.com/laravel/framework/issues/2780) for more information.**

**Keeping the original post here just for reference:**

Extending on what I spoke about last time, and in relation to [this `laravel/framework` proposal](https://github.com/laravel/framework/issues/2780), I've written some more methods for merging, diffing and intersecting Eloquent collections. Assuming these don't make it into the core, I've published them here with tests in case you'd like to use them in your own project (see my previous post for how to get Eloquent to load a custom collection object instead of the default).

## Collection

    /**
	 * Merge collection with another collection.
	 *
	 * @param \Illuminate\Support\Collection $collection
	 * @return \Illuminate\Support\Collection
	 */
	 public function mergeCollection(Collection $collection)
	 {
	 	foreach ($collection as $item)
		{
			if ( ! $this->contains($item->getKey()))
			{
				$this->add($item);
			}
		}

		return $this;
	}

	/**
	 * Diff collection with another collection.
	 *
	 * @param \Illuminate\Support\Collection $collection
	 * @return \Illuminate\Support\Collection
	 */
	 public function diffCollection(Collection $collection)
	 {
	 	$diff = new static;

		foreach ($this->items as $item)
		{
			if ( ! $collection->contains($item->getKey()))
			{
				$diff->add($item);
			}
		}

		return $diff;
	}

	/**
	 * Intersect collection with another collection.
	 *
	 * @param \Illuminate\Support\Collection $collection
	 * @return \Illuminate\Support\Collection
	 */
	 public function intersectCollection(Collection $collection)
	 {
	 	$intersect = new static;

		foreach ($this->items as $item)
		{
			if ( $collection->contains($item->getKey()))
			{
				$intersect->add($item);
			}
		}

		return $intersect;
	}

## Tests

     public function testCollectionMergesWithGivenCollection()
 {
 $one = m::mock('Illuminate\Database\Eloquent\Model');
 $one->shouldReceive('getKey')->andReturn(1);

 $two = m::mock('Illuminate\Database\Eloquent\Model');
 $two->shouldReceive('getKey')->andReturn(2);

 $three = m::mock('Illuminate\Database\Eloquent\Model');
 $three->shouldReceive('getKey')->andReturn(3);

 $c1 = new Collection(array($one, $two));
 $c2 = new Collection(array($two, $three));

 $this->assertEquals(new Collection(array($one, $two, $three)), $c1->mergeCollection($c2));
 }

 public function testCollectionDiffsWithGivenCollection()
 {
 $one = m::mock('Illuminate\Database\Eloquent\Model');
 $one->shouldReceive('getKey')->andReturn(1);

 $two = m::mock('Illuminate\Database\Eloquent\Model');
 $two->shouldReceive('getKey')->andReturn(2);

 $three = m::mock('Illuminate\Database\Eloquent\Model');
 $three->shouldReceive('getKey')->andReturn(3);

 $c1 = new Collection(array($one, $two));
 $c2 = new Collection(array($two, $three));

 $this->assertEquals(new Collection(array($one)), $c1->diffCollection($c2));
 }

 public function testCollectionIntersectsWithGivenCollection()
 {
 $one = m::mock('Illuminate\Database\Eloquent\Model');
 $one->shouldReceive('getKey')->andReturn(1);

 $two = m::mock('Illuminate\Database\Eloquent\Model');
 $two->shouldReceive('getKey')->andReturn(2);

 $three = m::mock('Illuminate\Database\Eloquent\Model');
 $three->shouldReceive('getKey')->andReturn(3);

 $c1 = new Collection(array($one, $two));
 $c2 = new Collection(array($two, $three));

 $this->assertEquals(new Collection(array($two)), $c1->intersectCollection($c2));
 }
