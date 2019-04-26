---
title: "Comparing model equality in Laravel"
path: /posts/comparing-model-equality-in-laravel
author: Dwight Watson
date: 2016-07-15
tags: ["laravel"]
---

Dropping in Laravel 5.3 is an easy way to compare if two model instances you&#039;ve got represent the same record in your database. The new `is()` method checks to see if the model keys, table and connection names match up.

```php
if (auth()-&gt;user()-&gt;is($post-&gt;author)) {
    // The currently authenicated user is the author of the post.
}
```

For more information, see the relevant pull requests: [#14281](https://github.com/laravel/framework/pull/14281) and [#14316](https://github.com/laravel/framework/pull/14316).
