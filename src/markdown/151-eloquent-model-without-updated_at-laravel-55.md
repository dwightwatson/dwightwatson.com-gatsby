---
title: "Eloquent model without updated_at (Laravel 5.5)"
path: /posts/eloquent-model-without-updated_at-laravel-55
author: Dwight Watson
date: 2017-09-14
tags: ["laravel"]
---

It’s changed a little through the different versions of Laravel 5, but it looks as though Laravel 5.5 has just received an official way to disable the `updated_at` timestamp on your Eloquent models. [PR #21178](https://github.com/laravel/framework/pull/21178) allows you to set a constant on your model which instructs Eloquent to not attempt and set the timestamp.

```php
class User extends Model
{
    // Do not set updated_at timestamp.
    const UPDATED_AT = null;
}
```
