---
title: "Merging, diffing and intersecting Eloquent collections"
path: /posts/merging-diffing-and-intersecting-eloquent-collections
author: Dwight Watson
date: 2013-11-26
tags: ["laravel", "php"]
---

**Edit: Merging, diffing and intersecting Eloquent collections is now included in Laravel by default! Please see the [pull request here](https://github.com/laravel/framework/pull/2795) and [issue discussion here](https://github.com/laravel/framework/issues/2780) for more information.**

**Keeping the original post here just for reference:**

Extending on what I spoke about last time, and in relation to [this `laravel/framework` proposal](https://github.com/laravel/framework/issues/2780), I&#039;ve written some more methods for merging, diffing and intersecting Eloquent collections. Assuming these don&#039;t make it into the core, I&#039;ve published them here with tests in case you&#039;d like to use them in your own project (see my previous post for how to get Eloquent to load a custom collection object instead of the default).

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
			if ( ! $this-&gt;contains($item-&gt;getKey()))
			{
				$this-&gt;add($item);
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

		foreach ($this-&gt;items as $item)
		{
			if ( ! $collection-&gt;contains($item-&gt;getKey()))
			{
				$diff-&gt;add($item);
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
		
		foreach ($this-&gt;items as $item)
		{
			if ( $collection-&gt;contains($item-&gt;getKey()))
			{
				$intersect-&gt;add($item);
			}
		}
		
		return $intersect;
	}
 
## Tests

     public function testCollectionMergesWithGivenCollection()
 {
 $one = m::mock(&#039;Illuminate\Database\Eloquent\Model&#039;);
 $one-&gt;shouldReceive(&#039;getKey&#039;)-&gt;andReturn(1);

 $two = m::mock(&#039;Illuminate\Database\Eloquent\Model&#039;);
 $two-&gt;shouldReceive(&#039;getKey&#039;)-&gt;andReturn(2);

 $three = m::mock(&#039;Illuminate\Database\Eloquent\Model&#039;);
 $three-&gt;shouldReceive(&#039;getKey&#039;)-&gt;andReturn(3);

 $c1 = new Collection(array($one, $two));
 $c2 = new Collection(array($two, $three));

 $this-&gt;assertEquals(new Collection(array($one, $two, $three)), $c1-&gt;mergeCollection($c2));
 }

 public function testCollectionDiffsWithGivenCollection()
 {
 $one = m::mock(&#039;Illuminate\Database\Eloquent\Model&#039;);
 $one-&gt;shouldReceive(&#039;getKey&#039;)-&gt;andReturn(1);

 $two = m::mock(&#039;Illuminate\Database\Eloquent\Model&#039;);
 $two-&gt;shouldReceive(&#039;getKey&#039;)-&gt;andReturn(2);

 $three = m::mock(&#039;Illuminate\Database\Eloquent\Model&#039;);
 $three-&gt;shouldReceive(&#039;getKey&#039;)-&gt;andReturn(3);

 $c1 = new Collection(array($one, $two));
 $c2 = new Collection(array($two, $three));

 $this-&gt;assertEquals(new Collection(array($one)), $c1-&gt;diffCollection($c2));
 }

 public function testCollectionIntersectsWithGivenCollection()
 {
 $one = m::mock(&#039;Illuminate\Database\Eloquent\Model&#039;);
 $one-&gt;shouldReceive(&#039;getKey&#039;)-&gt;andReturn(1);

 $two = m::mock(&#039;Illuminate\Database\Eloquent\Model&#039;);
 $two-&gt;shouldReceive(&#039;getKey&#039;)-&gt;andReturn(2);

 $three = m::mock(&#039;Illuminate\Database\Eloquent\Model&#039;);
 $three-&gt;shouldReceive(&#039;getKey&#039;)-&gt;andReturn(3);

 $c1 = new Collection(array($one, $two));
 $c2 = new Collection(array($two, $three));

 $this-&gt;assertEquals(new Collection(array($two)), $c1-&gt;intersectCollection($c2));
 }    
