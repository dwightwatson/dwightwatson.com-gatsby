---
title: "Model binding with Laravel resources"
path: /posts/model-binding-with-laravel-resources
author: Dwight Watson
date: 2014-08-04
tags: ["laravel", "php"]
---

I'm a big fan of model routing in Laravel, makes the controller actions that deal with persisted resources really simple and easy to understand. It's also flexible in that you can bind a given model in one place and use it across the entire application. Let's take a look at how model binding works.

    // Assuming we have a Post model
    Route::model('post', 'Post');

    // Resourceful routing
    Route::get('posts/{post}', 'PostsController@show');

Now that we have bound `post` to the `Post` model when Laravel is hit with this route it is automatically going to go lookup the record by the ID provided in the path. For example, `/posts/13` is going to grab `Post::find(13)` and if it doesn't exist it will throw a `NotFoundHttpException`. This is really too easy - Laravel digs up the model and issues a 404 if it can't be found. So much boilerplate saved. Now, let's take a look at the controller action.

    class PostsController extends BaseController {
	    public function show(Post $post)
		{
		    return View::make('posts.show', compact('post'));
		}
	}

Because we bound the model is is now passed straight into the controller action. This means that in simple cases, like the one above, we can go straight to the view. You save at least one line of code wherever you use model binding.

*Note: if you want to adjust the way Laravel binds to a model, for example if you aren't using an ID but instead a slug, take a look at the [model binding documentation](http://laravel.com/docs/routing#route-model-binding). You can fetch a model however you like and eager-load if you like (though I would suggest this remains in the controller, using the `load()` method).*

What suddenly occurred to me just today is that this method of model binding works when using `Route::resource()` too. Because Laravel is using the default model name as part of the route signature it is going to automatically adhere to this pattern!

    Route::resource('posts', 'PostsController');

If you now run `php artisan routes`, you'll see that all the routes are registered with the name passed in. For example, using the resource method above your show route would be registered as `posts/{posts}'. So now we simply change the model binding to use the pluralised version.

    Route::model('posts', 'Post');

Now, all the controller methods that take a model identifier will be passed the bound model.

    public function show(Post $post);
    public function edit(Post $post);
    public function update(Post $post);
    public function destroy(Post $post);

Of course, it's often recommended that you articulate all your routes manually rather than using the `Route::resource()` or `Route::controller()` methods as it keeps your `routes.php` as a good documentation of what your application does. However, now that I know `Route::resource()` will still allow me to do model binding I might be more likely to use it (if not because it is more Rails-like). And you still have the flexibility to only register the routes you need.

    Route::resource('posts', 'PostsController', ['except' => ['index', 'create', 'store']]);
    Route::resource('posts', 'PostsController', ['only' => ['show', 'edit', 'update', 'destroy']]);
