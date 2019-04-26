---
title: "New Blade syntax in Laravel 5.0"
path: /posts/new-blade-syntax-in-laravel-50
author: Dwight Watson
date: 2014-09-15
tags: ["laravel", "php"]
---

It appears as there is going to be a new Blade syntax in the upcoming version of Laravel (was 4.3, but is now going to be 5.0 to be semi-semantic versioning). From now on, all content will be escaped by default. Previously double braces `{{` and `}}` was just a standard echo while triple braces `{{{` and `}}}` would escape the content.

Now, both double and triple braces will escape the content. This just makes it a lot harder for you to echo unescaped user content to the views which can be potentially dangerous. I've mentioned it a few times before, but the Laravel community hasn't often talked of this issue - even most Laracasts tutorials go without escaping content.

If you want to echo raw content in Laravel 5.0 (that is, not escaping it), your new syntax will be `{!!` and `!!}`. A little different.

Read more on [the new syntax in the BladeCompiler](https://github.com/laravel/framework/blob/master/src/Illuminate/View/Compilers/BladeCompiler.php).
