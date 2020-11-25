---
title: "Invalid text representation with Laravel route model binding"
path: /posts/invalid-text-representation-with-laravel-route-model-binding
author: Dwight Watson
date: 2019-08-12
tags: ["laravel", "postgres"]
---

Route model binding is a great feature to automatically fetch an Eloquent model when it's injected into a controller method - saving you having to perform the lookup and fallback to 404 yourself. Say you were to visit `/posts/1`, the Post with ID #1 is automatically injected into the method.

```php
Route::get('/posts/{post}', 'PostController@show');

class PostController extends Controller
{
    public function show(Post $post)
    {
        dd($post); // The correct will be injected from the ID in the URL
    }
}
```

However - this feature doesn't play too nicely when used improperly with PostgreSQL. For example, say that someone makes a request like `/posts/1-foo`. It could be someone trying something funky or a bot trying to see what happens. Turns out with PostgreSQL this will trigger a 500 error with an invalid query.

```
testing.ERROR: SQLSTATE[22P02]: Invalid text representation: 7 ERROR:  invalid input syntax for integer: "1-foo" (SQL: select * from "posts" where "posts"."id" = 1-foo limit 1) {"exception":"[object] (Illuminate\\Database\\QueryException(code: 22P02): SQLSTATE[22P02]: Invalid text representation: 7 ERROR:  invalid input syntax for integer: \"1-foo\" (SQL: select * from \"posts\" where \"posts\".\"id\" = 1-foo limit 1)
```

It's not the end of the world - but it's still a crash, and it would be a poor user experience if there was a real user on the other end of that request. There is an easy way to resolve this using Laravel's route pattern matching. In your `app/Providers/RouteServiceProvider.php` you can register the pattern Laravel should use to match the identifier.

```php
class RouteServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Route::pattern('post', '[0-9]+');

        parent::boot()
    }
}
```

Now when Laravel tries to match a route with an argument labelled `post` it will ensure it also matches the pattern. If it doesn't it will just continue through the rest of your routes and ultimately 404 - which is probably what you wanted.
