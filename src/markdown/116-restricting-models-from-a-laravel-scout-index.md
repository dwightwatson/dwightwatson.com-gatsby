---
title: "Restricting models from a Laravel Scout index"
path: /posts/restricting-models-from-a-laravel-scout-index
author: Dwight Watson
date: 2016-09-13
tags: ["laravel", "scout"]
---

For some implementations you may want to restrict some of your models from going into your Laravel Scout index. For example on my own blog I only want to index my posts which have been published - if for whatever reason I haven&#039;t decided to publish a post yet then it shouldn&#039;t be searchable.

The solution below will work fine but in the current release of Laravel Scout (1.1.4) it will simply index your restricted models as an empty array. [In the next tagged release though, it will no longer need to index empty arrays at all](https://github.com/laravel/scout/commit/6b0ea5b7bde78674febffd18635de3b87d7107ad).

Simply override the `toSearchableArray()` method to return an empty array if the model should not be indexed. If it is to be indexed you can still call `toArray()` (as Laravel Scout normally does under the hood) or provide whatever data you would like to.

```
&lt;?php

namespace App;

use Laravel\Scout\Searchable;

class Post extends Model
{
    use Searchable;

    /**
     * Get the indexable data array for the model.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        if ($shouldPostBeIndexed === true) {
            return $this-&gt;toArray();
        }

        return [];
    }
```
