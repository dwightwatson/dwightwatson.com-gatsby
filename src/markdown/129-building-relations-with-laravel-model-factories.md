---
title: "Building relations with Laravel model factories"
path: /posts/building-relations-with-laravel-model-factories
author: Dwight Watson
date: 2017-07-15
tags: ["laravel"]
---

Often when setting up your environment for tests you&#039;ll need to generate models that require certain relations otherwise they won&#039;t work properly. Usually a view will try and access the related models and throw an error when it can&#039;t find them but sometimes your core app logic will go wonky as well.

```php
// Manually creating the relationship tree.
$user = factory(User::class)-&gt;create();
$series = factory(Series::class)-&gt;create();

// Note you can just pass an Eloquent model and Laravel grabs the ID
$post = factory(Post::class)-&gt;create([
    &#039;user_id&#039; =&gt; $user,
    &#039;post_id&#039; =&gt; $post
]);
```

Lucky it&#039;s now easy to lazyily build up a relationship tree for a model, whereby you can still pass through foreign keys if you need to, but if you don&#039;t then Laravel will go and new-up the required related models and associate them as you expect.

```php
$factory-&gt;define(App\Post::class, function ($faker) {
    return [
        &#039;user_id&#039; =&gt; factory(App\User::class),
        &#039;post_id&#039; =&gt; factory(App\Post:class),
        &#039;title&#039; =&gt; $faker-&gt;sentence,
        &#039;content&#039; =&gt; $faker-&gt;sentence,
    ];
});
```

By setting the attribute to an instance of `factory()` Laravel will lazily create that model as well and automatically associate it. You can do this all the way through your factories so they can manage their own dependencies.
