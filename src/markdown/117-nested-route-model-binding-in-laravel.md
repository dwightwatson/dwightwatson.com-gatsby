---
title: "Nested route model binding in Laravel"
path: /posts/nested-route-model-binding-in-laravel
author: Dwight Watson
date: 2016-09-21
tags: ["laravel", "php"]
---

I'm a big fan of route model binding in Laravel, and have been using it since it was first introduced. I was very excited when it later became standard with implicit route model binding in 5.2. There is just one issue that route model binding brings that is easily solved by the alternative, fetching models yourself in the action. Let's use an example of fetching a user's post.

```php
public function show($userId, $postId)
{
    $user = App\User::findOrFail($userId);

    $post = $user->posts()->findOrFail($postId);

    //
}
```

In this example because you fetch the post through the user's `posts()` association you can be sure that you're getting the post that belongs to the user. Of course in a real-world example for this sort of association you might instead consider authorization, but it's a simple solution of how to fetch a nested (or "belongs to") model.

Let's have a look at how it looks with route model binding. By default route model binding is going to be done with the model's ID, so it's going to fetch the correct model for you, but you might still want to fetch it through the association to confirm it's correct.

```php
public function show(User $user, Post $post)
{
    // We can't be sure that the post belongs to the user, so shall
    // we re-fetch the model through the association?
    $post = $user->posts()->findOrFail($post->id);

    //
}
```

This isn't all too bad, however where it gets complex is when you *aren't using model IDs as the route parameter*. What if our `Post` model used a slug for URLs, and that slug didn't need to be unique globally - just unique to that user?

```php
class Post extends Eloquent
{
    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
```

Now with route model binding - we can't be sure that the correct model has been fetched. If there are multiple posts with the same slug it's just going to get the first - it's "blissfully" unaware of the association. You might compensate for this by refetching the post using the slug through the association.

```php
public function show(User $user, Post $post)
{
    // We can't be sure that the correct post was selected by the slug,
    // so we'll re-fetch it through the user's association.
    $post = $user->posts()->where('slug', $post->slug)->firstOrFail();

    //
}
```

However we don't want to have to go through the entire site, always re-fetching the model through an association to make sure we're getting the right one. It's brittle and bound to be missed in some places. There's a better way - we can sort it out in the `RouteServiceProvider` with a manual binding.

```php
Route::bind('post', function ($value, $route) {
    if ($user = $route->parameter('user')) {
        return $user->posts()->where('slug', $value)->firstOrFail();
    }

    return \App\Post::where('slug', $value)->firstOrFail();
});
```

With this, whenever Laravel tries to perform a model binding on a route it will first check to see if the route has a `user` parameter, and if so it will use it to correctly scope the model lookup. Now we're back to a nice clean model action without any crap.

```php
public function show(User $user, Post $post)
{
    //
}
```
