---
title: "@each in Laravel Blade"
path: /posts/each-in-laravel-blade
author: Dwight Watson
date: 2013-10-11
tags: ["laravel", "php"]
---

This is a cute (currently undocumented) Blade directive in Laravel 4. It makes it easy to render a view for each item in a collection.

    public function renderEach($view, $data, $iterator, $empty = 'raw|') {}

	See the full function [in the API](http://laravel.com/api/source-class-Illuminate.View.Environment.html#177-219)

In practice, say we were looping through a list of users:

    @each('users._item', $users, 'user', 'users.no-users');

## $view
The first parameter is the view template you want to use for each item in the collection.

## $data
The second is the collection itself.

## $iterator
The third is the name you want to call in the individual item when it is passed to the view partial.

## $empty
The fourth is what will be displayed if the collection is empty. You can either pass a view template, which will be shown only once, or any text prepended with `raw|` will be displayed as is.

