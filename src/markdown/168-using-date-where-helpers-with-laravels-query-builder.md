---
title: "Using date where helpers with Laravel's query builder"
path: /posts/using-date-where-helpers-with-laravels-query-builder
author: Dwight Watson
date: 2018-05-15
tags: ["laravel", "php"]
---

Laravel recently introduced a number of query builder helpers for writing where clauses that act upon dates. There's a whole host of them, including `whereDate()`, `whereTime()`, `whereDay()`, `whereMonth()` and `whereYear()`. These helpers allowed me to clean up some older code that was relying on database specific date functions.

Here are some extracts from this code which uses `whereRaw` and MySQL date functions to filter timestamps based upon their year. You can see that one example uses interpolation (!!!) and another one uses binding, but is looking for records created earlier than the current year.

```php
$currentYear = now()->year;

DB::table('interactions')
    ->whereRaw("YEAR(created_at) = {$currentYear}");

DB::table('interactions')
    ->whereRaw('YEAR(created_at) < ?', $currentYear);
```

Using the new query builder helpers we can simplify this code a little bit - making it more Laravel-Like as well as more agnostic about the database driver used.

These examples show how you can pass the value you expect as the second parameter if you are looking for equality, otherwise you can use the comparison you expect. This works much like the base `where()` method.

```php
DB::table('interactions')
    ->whereYear('created_at', $currentYear);

DB::table('interactions')
    ->whereYear('created_at', '<', $currentYear);
```

It's a subtle change but it's cleaner and means we rely less on the database implementation and avoid writing raw SQL. Update Laravel and start using these new helpers today!
