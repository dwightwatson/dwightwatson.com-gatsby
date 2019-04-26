---
title: "Model binding with Laravel resources"
path: /posts/model-binding-with-laravel-resources
author: Dwight Watson
date: 2014-08-04
tags: ["laravel", "php"]
---

I&#039;m a big fan of model routing in Laravel, makes the controller actions that deal with persisted resources really simple and easy to understand. It&#039;s also flexible in that you can bind a given model in one place and use it across the entire application. Let&#039;s take a look at how model binding works.

    // Assuming we have a Post model
    Route::model(&#039;post&#039;, &#039;Post&#039;);
	
    // Resourceful routing
    Route::get(&#039;posts/{post}&#039;, &#039;PostsController@show&#039;);
	
Now that we have bound `post` to the `Post` model when Laravel is hit with this route it is automatically going to go lookup the record by the ID provided in the path. For example, `/posts/13` is going to grab `Post::find(13)` and if it doesn&#039;t exist it will throw a `NotFoundHttpException`. This is really too easy - Laravel digs up the model and issues a 404 if it can&#039;t be found. So much boilerplate saved. Now, let&#039;s take a look at the controller action.

    class PostsController extends BaseController {
	    public function show(Post $post)
		{
		    return View::make(&#039;posts.show&#039;, compact(&#039;post&#039;));
		}
	}
	
Because we bound the model is is now passed straight into the controller action. This means that in simple cases, like the one above, we can go straight to the view. You save at least one line of code wherever you use model binding.

*Note: if you want to adjust the way Laravel binds to a model, for example if you aren&#039;t using an ID but instead a slug, take a look at the [model binding documentation](http://laravel.com/docs/routing#route-model-binding). You can fetch a model however you like and eager-load if you like (though I would suggest this remains in the controller, using the `load()` method).*

What suddenly occurred to me just today is that this method of model binding works when using `Route::resource()` too. Because Laravel is using the default model name as part of the route signature it is going to automatically adhere to this pattern!

    Route::resource(&#039;posts&#039;, &#039;PostsController&#039;);

If you now run `php artisan routes`, you&#039;ll see that all the routes are registered with the name passed in. For example, using the resource method above your show route would be registered as `posts/{posts}&#039;. So now we simply change the model binding to use the pluralised version.

    Route::model(&#039;posts&#039;, &#039;Post&#039;);
	
Now, all the controller methods that take a model identifier will be passed the bound model.

    public function show(Post $post);
    public function edit(Post $post);
    public function update(Post $post);
    public function destroy(Post $post);
	
Of course, it&#039;s often recommended that you articulate all your routes manually rather than using the `Route::resource()` or `Route::controller()` methods as it keeps your `routes.php` as a good documentation of what your application does. However, now that I know `Route::resource()` will still allow me to do model binding I might be more likely to use it (if not because it is more Rails-like). And you still have the flexibility to only register the routes you need.

    Route::resource(&#039;posts&#039;, &#039;PostsController&#039;, [&#039;except&#039; =&gt; [&#039;index&#039;, &#039;create&#039;, &#039;store&#039;]]);
    Route::resource(&#039;posts&#039;, &#039;PostsController&#039;, [&#039;only&#039; =&gt; [&#039;show&#039;, &#039;edit&#039;, &#039;update&#039;, &#039;destroy&#039;]]);
