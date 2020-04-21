---
title: "Introducing nameable"
path: /posts/introducing-nameable
author: Dwight Watson
date: 2020-04-22
tags: ["laravel"]
---

I've been itching to give [Laravel's new custom casting](https://laravel.com/docs/7.x/eloquent-mutators#custom-casts) feature a go since it landed in 7.0. Cleaning up some of the `full_name` and `initials` attribute accessors I've got sprinkled through my apps looked like a good opportunity to port [Basecamp's `name_of_person`](https://github.com/basecamp/name_of_person) library to Larave.

## So I'm excited to introduce nameable for Laravel.

Nameable is a custom cast for your Eloquent models that gives you a number of handy accessors for your user's names. Getting started is really easy - just use the `Nameable` cast.

```php
use Watson\Nameable\Nameable;

class User extends Model
{
    protected $casts = [
        'name' => Nameable::class,
    ];
}
```

Now the `name` attribute on your model will be an instance of `Watson\Nameable\Name`, giving you shorthand accessors to

```php
$user = new User(['name' => 'Dwight Watson']);

$user->name->full        // Dwight Watson
$user->name->first       // Dwight
$user->name->last        // Watson
$user->name->familiar    // Dwight W.
$user->name->abbreviated // D. Watson
$user->name->sorted      // Watson, Dwight
$user->name->initials    // DCW
```

Have a look [at the repo](https://github.com/dwightwatson/nameable) for more information and to get started.
