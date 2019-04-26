---
title: "Using Rails UJS in Laravel 4 (or any other framework)"
path: /posts/using-rails-ujs-in-laravel-4
author: Dwight Watson
date: 2014-08-12
tags: ["javascript", "laravel", "ruby on rails"]
---

A while ago I posted a request to the Laravel framework to have an unobtrusive JavaScript library added, much like the one that is provided in Rails. The Rails library provides a bunch of helpful attributes you can add in your markup for extra functionality which assists a lot of common tasks. While the merits of the request were discussed, it was suggested that either a third-party Composer package be created or that the Rails library was framework-agnostic enough that it would work with Laravel. 

With that in mind, I pulled [Rails UJS](https://github.com/rails/jquery-ujs) into my own project and started dissecting how to use the same features in Laravel 4. Unfortunately, Laravel hasn&#039;t got the same helper methods for specific functionality as Rails does, but you can still easily activate the functionality where you want it by using the correct attributes. And of course, this functionality should work just as well with any other framework.

# Getting started

Once you&#039;ve got jQuery and Rails UJS linked in your document you&#039;ll need to do some quick configuration to hook it in.

First, you&#039;ll need to configure Rails UJS to work with your CSRF token, assuming you are using them in your application (hint: you should be). To do this we simply place two `&lt;meta&gt;` tags in the head of our document:

	&lt;meta name=&quot;csrf-param&quot; content=&quot;_token&quot;&gt;
	&lt;meta name=&quot;csrf-token&quot; content=&quot;{{ csrf_token() }}&quot;&gt;    
	
The first tag tells UJS what name it should use for the CSRF token when making the request and the second tag tells it what the CSRF tag. By default Laravel uses `_token` as the parameter name (take a look in your `filters.php` for more information) and the `csrf_token()` method simply outputs the token for the request.

## data-method

The first attribute that is really handy for links is `data-method`. When used, UJS will hijack the click of the link and then make the request using the method provided.

	&lt;a href=&quot;posts/1&quot; data-method=&quot;delete&quot; rel=&quot;nofollow&quot;&gt;Delete this post&lt;/a&gt;
	
When this link is clicked, a `DELETE` request will be made instead of the normal `GET` that a link would do, so it&#039;s a simple way to perform RESTful actions in your application without having to create a form. If you need to get your head around building this kind of link in Laravel, take a look at this example with the link helper.

    {{ link_to_route(&#039;posts.destroy&#039;, &#039;Delete this post&#039;, $post-&gt;id, [&#039;data-method&#039; =&gt; &#039;delete&#039;, &#039;rel&#039; =&gt; &#039;nofollow&#039;]) }}

It&#039;s worth noting that when using this helper you should add a `rel=&quot;nofollow&quot;` to the link as well to ensure that the search engines won&#039;t index the link.

## data-confirm

This is great if you want to confirm an action before continuing with it. It is performed with a simple JavaScript `confirm()` alert box, but you can swap it out to something prettier if you&#039;d like. It works well with the previous example; if your link or button is going to perform something destructive then you may want to confirm that it is intended beforehand.

    &lt;a href=&quot;posts/1&quot; data-method=&quot;delete&quot; data-confirm=&quot;Are you sure you want to delete this post?&quot; rel=&quot;nofollow&quot;&gt;Delete this post&lt;/a&gt;
	
If the user cancels the confirmation box no action will occur, otherwise the request will be performed. You&#039;re not required to use this with `data-method`, you can use this on any action that you wish to confirm first.

## data-disable

Often you might wish to disable a button after it has been clicked to let it complete a request, and re-enable it only if the request fails. Rails UJS makes doing this a cinch also with the `data-disable` attribute.

	&lt;input type=&quot;submit&quot; value=&quot;Save post&quot; data-disable&gt;
	
Now, the button will be disabled after clicking, preventing a user from going all rapid-fire on it and suddenly creating 10 new records in your database. Again, for the Laravel users following at home, here is how you would do this using the form builder.

    {{ Form::submit(&#039;Save post&#039;, [&#039;data-disable&#039;]) }}

## data-disable-with

Extending on the previous example you can also give the user better feedback about the interaction that is occurring. You can disable the button with some text to provide some indication that the request is performing in the background.

    &lt;input type=&quot;submit&quot; value=&quot;Save post&quot; data-disable-with=&quot;Saving this post...&quot;&gt;
	
Now while the button is disabled it&#039;s text will be swapped out with the copy provided to show that something is going on.

## data-remote

There is actually a lot more than meets the eye with this attribute, and it&#039;s *really* exciting. If you add `data-remote` to your form element, Rails UJS will then submit the form as an Ajax request. It&#039;ll take into account everything else as before; method, confirmation, etc. and then send it off. 

    &lt;form action=&quot;posts&quot; method=&quot;post&quot; data-remote&gt;
	    &lt;!-- Form goes here. --&gt;
	&lt;/form&gt;
	
The hidden *awesome* feature behind this is how you can deal with the success of a remote request. If the browser responds with JavaScript, it will be executed once the request is complete. For example, you might elect to redirect the user after the remove request. Simple with a JavaScript response:

    window.location.href = &#039;{{ route(&#039;posts.index&#039;) }}&#039;;
	
Or, let&#039;s say you had a link to remove a post from a page which listed all posts, and wanted to make the post disappear after it was deleted.

    &lt;a href=&quot;{{ route(&#039;posts.destroy&#039;, $post-&gt;id) }}&quot; data-method=&quot;destroy&quot; data-confirm=&quot;Delete this post?&quot; rel=&quot;nofollow&quot; data-remote&gt;Delete this post&lt;/a&gt;
	
Now, the JavaScript response could be along the lines of:

    $(&#039;#post-{{ $post-&gt;id }}&#039;).fadeOut();
	
That simply, the post is removed from the database and the view!

## data-type

If you are using `data-remote` you can also use this attribute to specify the format of the data being sent to the server. For example, you can send the form as a JSON request.

    &lt;form data-type=&quot;json&quot;&gt;

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

I hope this has been helpful to anyone interested in using Rails UJS with another framework like Laravel. I intend to write more on the topic and document some other cool ways to use it as I think it&#039;s a great tool that shouldn&#039;t be restricted just to the Rubyists! Feel free to read up more on the  [Rails UJS GitHub](https://github.com/rails/jquery-ujs)
