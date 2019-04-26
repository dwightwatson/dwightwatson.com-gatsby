---
title: "Nested route model binding in Laravel"
path: /posts/nested-route-model-binding-in-laravel
author: Dwight Watson
date: 2016-09-21
tags: ["laravel", "php"]
---

I&#039;m a big fan of route model binding in Laravel, and have been using it since it was first introduced. I was very excited when it later became standard with implicit route model binding in 5.2. There is just one issue that route model binding brings that is easily solved by the alternative, fetching models yourself in the action. Let&#039;s use an example of fetching a user&#039;s post.

```php
public function show($userId, $postId)
{
    $user = App\User::findOrFail($userId);

    $post = $user-&gt;posts()-&gt;findOrFail($postId);

    //
}
```

In this example because you fetch the post through the user&#039;s `posts()` association you can be sure that you&#039;re getting the post that belongs to the user. Of course in a real-world example for this sort of association you might instead consider authorization, but it&#039;s a simple solution of how to fetch a nested (or &quot;belongs to&quot;) model. 

Let&#039;s have a look at how it looks with route model binding. By default route model binding is going to be done with the model&#039;s ID, so it&#039;s going to fetch the correct model for you, but you might still want to fetch it through the association to confirm it&#039;s correct.

```php
public function show(User $user, Post $post)
{
    // We can&#039;t be sure that the post belongs to the user, so shall
    // we re-fetch the model through the association?
    $post = $user-&gt;posts()-&gt;findOrFail($post-&gt;id);

    //
}
```

This isn&#039;t all too bad, however where it gets complex is when you *aren&#039;t using model IDs as the route parameter*. What if our `Post` model used a slug for URLs, and that slug didn&#039;t need to be unique globally - just unique to that user?

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
        return &#039;slug&#039;;
    }
}
```

Now with route model binding - we can&#039;t be sure that the correct model has been fetched. If there are multiple posts with the same slug it&#039;s just going to get the first - it&#039;s &quot;blissfully&quot; unaware of the association. You might compensate for this by refetching the post using the slug through the association.

```php
public function show(User $user, Post $post)
{
    // We can&#039;t be sure that the correct post was selected by the slug, 
    // so we&#039;ll re-fetch it through the user&#039;s association.
    $post = $user-&gt;posts()-&gt;where(&#039;slug&#039;, $post-&gt;slug)-&gt;firstOrFail();

    //
}
```

However we don&#039;t want to have to go through the entire site, always re-fetching the model through an association to make sure we&#039;re getting the right one. It&#039;s brittle and bound to be missed in some places. There&#039;s a better way - we can sort it out in the `RouteServiceProvider` with a manual binding.

```php
Route::bind(&#039;post&#039;, function ($value, $route) {
    if ($user = $route-&gt;parameter(&#039;user&#039;)) {
        return $user-&gt;posts()-&gt;where(&#039;slug&#039;, $value)-&gt;firstOrFail();
    }

    return \App\Post::where(&#039;slug&#039;, $value)-&gt;firstOrFail();
});
```

With this, whenever Laravel tries to perform a model binding on a route it will first check to see if the route has a `user` parameter, and if so it will use it to correctly scope the model lookup. Now we&#039;re back to a nice clean model action without any crap.

```php
public function show(User $user, Post $post)
{
    //
}
```
