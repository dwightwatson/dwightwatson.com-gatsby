---
title: "Angular templating with Laravel Blade templating"
path: /posts/angular-templating-with-laravel-blade-templating
author: Dwight Watson
date: 2013-08-01
tags: ["angular", "laravel"]
---

By default both Angular&#039;s templating and Laravel&#039;s Blade templating systems use the same characters to indicate that something needs to be processed: `{{` and `}}`. If you want to use Angular templates in the same files you use with Blade templates, this can get a bit awkward. Fortunately, there are a couple of ways you can get around this to get the two frameworks working well together.

## Adjust Angular&#039;s templates

The first option is my preferred one, and it&#039;s to change the interpolation symbols in Laravel. Simply pass the `$interpolateProvider` to your app module, and set the tags you wish to use instead.

    var app = angular.module(&#039;studious&#039;, function($interpolateProvider) {
	  $interpolateProvider.startSymbol(&#039;[[&#039;);
	  $interpolateProvider.endSymbol(&#039;]]&#039;);
	});
	
Now, you can use `[[` and `]]` for Angular templating inside your Blade views. Of course, if you want to use another pattern of symbols you can just pop them in there instead.

## Adjust Laravel&#039;s Blade templates

If you&#039;d rather modify the way Blade templates work it&#039;s still quite easy. Furthermore, you&#039;ve got the option to adjust both the content tags as well as the escaped content tags.

    Blade::setContentTags(&#039;[[&#039;, &#039;]]&#039;);
	Blade::setEscapedContentTags(&#039;[[[&#039;, &#039;]]]&#039;);
	
Again, if you wanted to use different characters to make up your tags you&#039;re free to do so. You can pop these two lines of code whereever you want, but I&#039;d probably throw them into your `start/global.php` file or your `routes.php` file.
