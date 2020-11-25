---
title: "Escaping variables in raw SQL queries in Laravel 4"
path: /posts/escaping-variables-in-raw-sql-queries-in-laravel-4
author: Dwight Watson
date: 2013-09-25
tags: ["laravel", "sql"]
---

Though Laravel offers some great methods for using question-mark placeholders and named placeholders when building raw queries, we had an instance where one large query we had just could not be converted to the appropriate format for this function. Futhermore, we were not able to build it using the query builder. It seems like Laravel 3 had a function called `DB::escape()`, but that is no longer available in Laravel 4.

After trawling the web, the best solution I've found is to use the quote method from the PDO object. You can get the PDO object straight from the DB façade and use it to quote variables one by one as you need.

`DB::getPdo()->quote($variable)`

If anyone has a better solution though, please don't hesitate to leave a comment!
