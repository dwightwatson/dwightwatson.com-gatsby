---
title: "Handy Laravel select helpers for ranges, years and months"
path: /posts/handy-laravel-select-helpers-for-ranges-years-and-months
author: Dwight Watson
date: 2013-09-27
tags: ["laravel", "php"]
---

Came across some groovy form helpers in Laravel that aren&#039;t currently documented (though I have made a [pull request](https://github.com/laravel/docs/pull/458)) which are actually pretty handy. 

## Select list with a range
    echo Form::selectRange(&#039;number&#039;, 10, 20);

## Select list with a year range
    echo Form::selectYear(&#039;year&#039;, 1900, 2000);

## Select list with month names
    echo Form::selectMonth(&#039;month&#039;);
