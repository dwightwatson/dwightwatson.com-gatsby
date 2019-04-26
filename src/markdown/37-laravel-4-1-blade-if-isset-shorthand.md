---
title: "Laravel 4.1 Blade \"if isset\" shorthand"
path: /posts/laravel-4-1-blade-if-isset-shorthand
author: Dwight Watson
date: 2013-12-16
tags: ["laravel", "php"]
---

Laravel 4.1 introduces a new shorthand for echoing out data in Blade, which is really nice.

    {{ $variable or 'default' }}

This shorthand actually expands out to a full `isset` call on the variable and returns the default value if false.

    isset($variable) ? $variable : 'default'

So if you're not sure if something is going to appear in the view or not, here's a nice way to test!
