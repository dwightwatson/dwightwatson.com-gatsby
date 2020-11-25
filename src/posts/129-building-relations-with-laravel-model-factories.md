---
title: "Building relations with Laravel model factories"
path: /posts/building-relations-with-laravel-model-factories
author: Dwight Watson
date: 2017-07-15
tags: ["laravel"]
---

Often when setting up your environment for tests you'll need to generate models that require certain relations otherwise they won't work properly. Usually a view will try and access the related models and throw an error when it can't find them but sometimes your core app logic will go wonky as well.

```php
// Manually creating the relationship tree.
$user = factory(User::class)->create();
$series = factory(Series::class)->create();

// Note you can just pass an Eloquent model and Laravel grabs the ID
$post = factory(Post::class)->create([
    'user_id' => $user,
    'post_id' => $post
]);
```

Lucky it's now easy to lazyily build up a relationship tree for a model, whereby you can still pass through foreign keys if you need to, but if you don't then Laravel will go and new-up the required related models and associate them as you expect.

```php
$factory->define(App\Post::class, function ($faker) {
    return [
        'user_id' => factory(App\User::class),
        'post_id' => factory(App\Post:class),
        'title' => $faker->sentence,
        'content' => $faker->sentence,
    ];
});
```

By setting the attribute to an instance of `factory()` Laravel will lazily create that model as well and automatically associate it. You can do this all the way through your factories so they can manage their own dependencies.
