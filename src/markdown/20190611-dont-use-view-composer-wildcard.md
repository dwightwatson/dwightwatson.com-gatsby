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


Today Laravel shipped v5.8.15 which comes with a great improvement for configuring your database connections - especially on platforms like Heroku. You can now provide a fully-qualified database URL for the connection rather than host, username, password, and database separately.

Heroku will use this fully-qualified URL for it's first-party Postgres and Redis add-ons. For example your application will receive an environment variable like `DATABASE_URL=postgres://username:password@host:port/database`. This contains everything needed to connect to that database.

Previously you would need to use `parse_url` to break down this environment variable and pass each component to the database configuration.

```php
$databaseUrl = parse_url(env('DATABASE_URL'));
```

```php
'pgsql' => [
    'driver' => 'pgsql',
    'host' => $databaseUrl['host'],
    'port' => $databaseUrl['port'],
    'database' => substr($databaseUrl['path'], 1),
    'username' => $databaseUrl['user'],
    'password' => $databaseUrl['pass'],
    'charset' => 'utf8',
    'prefix' => '',
    'prefix_indexes' => true,
    'schema' => 'public',
    'sslmode' => 'prefer',
],
```

But as of this latest version of Laravel you can just provide the `url` key with the database URL and it will work out the rest - the driver, host, port, database, username & password.

```php
'pgsql' => [
    'url' => env('DATABASE_URL'),
    'charset' => 'utf8',
    'prefix' => '',
    'prefix_indexes' => true,
    'schema' => 'public',
    'sslmode' => 'prefer',
],
```

Note that here I've used `DATABASE_URL` instead of something like `DB_URL` (which would better match Laravel's naming convention) as that's what Heroku gives you. It's likely easier to just use `DATABASE_URL` in local development so you can just push to production & go.

For more information, [view PR #28308 from @mathieutu](https://github.com/laravel/framework/pull/28308).
