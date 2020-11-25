---
title: "Using Rails UJS in Laravel 4 (or any other framework)"
path: /posts/using-rails-ujs-in-laravel-4
author: Dwight Watson
date: 2014-08-12
tags: ["javascript", "laravel", "ruby on rails"]
---

A while ago I posted a request to the Laravel framework to have an unobtrusive JavaScript library added, much like the one that is provided in Rails. The Rails library provides a bunch of helpful attributes you can add in your markup for extra functionality which assists a lot of common tasks. While the merits of the request were discussed, it was suggested that either a third-party Composer package be created or that the Rails library was framework-agnostic enough that it would work with Laravel.

With that in mind, I pulled [Rails UJS](https://github.com/rails/jquery-ujs) into my own project and started dissecting how to use the same features in Laravel 4. Unfortunately, Laravel hasn't got the same helper methods for specific functionality as Rails does, but you can still easily activate the functionality where you want it by using the correct attributes. And of course, this functionality should work just as well with any other framework.

# Getting started

Once you've got jQuery and Rails UJS linked in your document you'll need to do some quick configuration to hook it in.

First, you'll need to configure Rails UJS to work with your CSRF token, assuming you are using them in your application (hint: you should be). To do this we simply place two `<meta>` tags in the head of our document:

	<meta name="csrf-param" content="_token">
	<meta name="csrf-token" content="{{ csrf_token() }}">

The first tag tells UJS what name it should use for the CSRF token when making the request and the second tag tells it what the CSRF tag. By default Laravel uses `_token` as the parameter name (take a look in your `filters.php` for more information) and the `csrf_token()` method simply outputs the token for the request.

## data-method

The first attribute that is really handy for links is `data-method`. When used, UJS will hijack the click of the link and then make the request using the method provided.

	<a href="posts/1" data-method="delete" rel="nofollow">Delete this post</a>

When this link is clicked, a `DELETE` request will be made instead of the normal `GET` that a link would do, so it's a simple way to perform RESTful actions in your application without having to create a form. If you need to get your head around building this kind of link in Laravel, take a look at this example with the link helper.

    {{ link_to_route('posts.destroy', 'Delete this post', $post->id, ['data-method' => 'delete', 'rel' => 'nofollow']) }}

It's worth noting that when using this helper you should add a `rel="nofollow"` to the link as well to ensure that the search engines won't index the link.

## data-confirm

This is great if you want to confirm an action before continuing with it. It is performed with a simple JavaScript `confirm()` alert box, but you can swap it out to something prettier if you'd like. It works well with the previous example; if your link or button is going to perform something destructive then you may want to confirm that it is intended beforehand.

    <a href="posts/1" data-method="delete" data-confirm="Are you sure you want to delete this post?" rel="nofollow">Delete this post</a>

If the user cancels the confirmation box no action will occur, otherwise the request will be performed. You're not required to use this with `data-method`, you can use this on any action that you wish to confirm first.

## data-disable

Often you might wish to disable a button after it has been clicked to let it complete a request, and re-enable it only if the request fails. Rails UJS makes doing this a cinch also with the `data-disable` attribute.

	<input type="submit" value="Save post" data-disable>

Now, the button will be disabled after clicking, preventing a user from going all rapid-fire on it and suddenly creating 10 new records in your database. Again, for the Laravel users following at home, here is how you would do this using the form builder.

    {{ Form::submit('Save post', ['data-disable']) }}

## data-disable-with

Extending on the previous example you can also give the user better feedback about the interaction that is occurring. You can disable the button with some text to provide some indication that the request is performing in the background.

    <input type="submit" value="Save post" data-disable-with="Saving this post...">

Now while the button is disabled it's text will be swapped out with the copy provided to show that something is going on.

## data-remote

There is actually a lot more than meets the eye with this attribute, and it's *really* exciting. If you add `data-remote` to your form element, Rails UJS will then submit the form as an Ajax request. It'll take into account everything else as before; method, confirmation, etc. and then send it off.

    <form action="posts" method="post" data-remote>
	    <!-- Form goes here. -->
	</form>

The hidden *awesome* feature behind this is how you can deal with the success of a remote request. If the browser responds with JavaScript, it will be executed once the request is complete. For example, you might elect to redirect the user after the remove request. Simple with a JavaScript response:

    window.location.href = '{{ route('posts.index') }}';

Or, let's say you had a link to remove a post from a page which listed all posts, and wanted to make the post disappear after it was deleted.

    <a href="{{ route('posts.destroy', $post->id) }}" data-method="destroy" data-confirm="Delete this post?" rel="nofollow" data-remote>Delete this post</a>

Now, the JavaScript response could be along the lines of:

    $('#post-{{ $post->id }}').fadeOut();

That simply, the post is removed from the database and the view!

## data-type

If you are using `data-remote` you can also use this attribute to specify the format of the data being sent to the server. For example, you can send the form as a JSON request.

    <form data-type="json">

### Remote events

When using the `data-remote` attribute you can also hook into the various events of the Ajax request to perform additional functionality. Rails UKS fires a number of helpful events throughout the request lifecycle which can aid you in building more complex applications.

* ajax:before – right before any Ajax stuff happens, aborts the request if stopped
* ajax:beforeSend - right before the Ajax request is sent, aborts the request if stopped
* ajax:send - right as the Ajax request is sent
* ajax:success - after completion if the request was successful
* ajax:error - after completion if the request was unsuccessful

* ajax:aborted:required - fired if there are blank required fields in the form, submits the request if stopped
* ajax:aborted:file - fired if there are non-blank file fields in the form, aborts the request if stopped.

Read more about using the events on the [Rails UJS wiki](https://github.com/rails/jquery-ujs/wiki/ajax).

I hope this has been helpful to anyone interested in using Rails UJS with another framework like Laravel. I intend to write more on the topic and document some other cool ways to use it as I think it's a great tool that shouldn't be restricted just to the Rubyists! Feel free to read up more on the  [Rails UJS GitHub](https://github.com/rails/jquery-ujs)
