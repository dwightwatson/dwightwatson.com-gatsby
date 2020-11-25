---
title: "Using unique rule IDs in Laravel FormRequests"
path: /posts/using-unique-rule-ids-in-laravel-formrequests
author: Dwight Watson
date: 2015-03-21
tags: ["laravel", "laravel 5", "php"]
---

When using the new Laravel 5 `FormRequest` to update a resource you might run into a little bit of trouble when you want to use the `unique` rule. You need to pass in the ID of the row for the unique validator to ignore, but how do you get it. Furthermore, if you're using model validation how might you go about it. Turns out the solution is actually pretty simple.

Say we're doing a PUT request (an update) to `posts/{post}`. You can fetch the post parameter from the `route()` object as the `FormRequest` extends off of an `Illuminate\Http\Request`, and pass that straight into your validation rules.

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $postId = $this->route()->parameter('post');

        return [
            'slug' => ['required', 'unique:posts,slug,'.$postId]
        ];
    }

If you're using model binding though it's almost as simple. Fetching the parameter from the route is just the same, but you'll get an instance of your object this time. So simply call `->getKey()` on your object and pass that into your rules.

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $post = $this->route()->parameter('post');

        return [
            'slug' => ['required', 'unique:posts,slug,'.$post->getKey()]
        ];
    }

It's worth noting if you're using a resource route, for example `Route::resource('posts', 'PostsController')` that the parameter name will also be pluralised, so you'll fetch `->('posts')` instead. Of course, you can always inspect your `->route()` object to see what is available to you in that request.
