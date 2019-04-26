---
title: "Laravel 4.1 Blade &quot;if isset&quot; shorthand"
path: /posts/laravel-4-1-blade-if-isset-shorthand
author: Dwight Watson
date: 2013-12-16
tags: ["laravel", "php"]
---

Laravel 4.1 introduces a new shorthand for echoing out data in Blade, which is really nice.

    {{ $variable or &#039;default&#039; }}
	
This shorthand actually expands out to a full `isset` call on the variable and returns the default value if false.

    isset($variable) ? $variable : &#039;default&#039;
	
So if you&#039;re not sure if something is going to appear in the view or not, here&#039;s a nice way to test!
