---
title: Don't use View::composer() with wildcard
path: /posts/dont-use-view-composer-with-wildcard
author: Dwight Watson
date: 2019-06-11
tags: ["laravel"]
---

This is incredibily obvious in hindsight, but I recently realised a mistake I had been making when trying to share data across all the views in my app. By wanting to make the count of users in the app

```php
use App\User;

View::composer('*', function () {
    $view->with('usersCount', User::remember(now()->addDay())->count());
});
```
