---
title: Setting up Laravel 5.6 on Heroku
path: /posts/setting-up-laravel-5-6-on-heroku
author: Dwight Watson
date: 2018-05-25
tags: ["laravel", "heroku"]
---

Heroku is a great platform for getting your web apps up and running without having to worry about infrastructure. While it is more generally used with Ruby on Rails projects they support a number of other languages including PHP.

This guide will show you how to set up a fresh (or existing) Laravel 5.6 project on Heroku. It shows you how to take advantage of all the features at your disposal and how to prepare your app to scale.

We'll use a Postgres database (as it has first-party support from Heroku), Redis for sessions and caching and we'll look at how to build assets and optimise Laravel on deployments.

Let's get started.

## Creating your app

If you haven't already then let's create your new app from the Heroku dashboard. Give it a name and pick the region you want it to be hosted in.

Click through to the settings panel for your new app. Under buildpacks we're going to add two - `heroku/php` and `heroku/node` (in this order). If `heroku/php` isn't on top then re-order them so it is first.

> In case you're wondering why we are using the Node build pack too, it's simple. On deployments we will have Heroku build our assets through Laravel Mix.

## Creating your database and cache server

Now click through to the resources panel. You'll want to provision two new add-ons for your app. Search for `Heroku Postgres` and `Heroku Redis` and provision them.

It's fine to use the free tier and you can always bump these up and down as you need.

> You might prefer to use MySQL as your database. Heroku doesn't have first-party support for MySQL but it can still be installed as an add-on from a third-party. The configuration will still look similar.

When you provision these add-ons for your app they will automatically add their own environment variables which you can use to connect to them. You will now have access to `DATABASE_URL` and `REDIS_URL`

One thing to note about these URLs is that they are formatted in a way you might not be familiar with. They contain authentication credentials as well as additional details like the database name. In case you haven't seen them before they work a little something like this: `postgres://username:password@host.com:port/database`.

## Configure Laravel

Next we'll need to make some configuration tweaks to get up and running. Laravel will need an app key for managing encryption and it will need to understand how to work behind Heroku's load balancers.

> This will guide you through setting environment variables in Heroku's web console, but you can [also install the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) if you want to do this from your terminal.

To get a fresh app key, ask Laravel for one. You will need to set this as the `APP_KEY` environment variable.

```sh
php artisan key:generate --show
```

Next let's configure a few more things using environment variables.

```sh
DB_CONNECTION=pgsql
LOG_CHANNEL=errorlog
CACHE_DRIVER=redis
SESSION_DRIVER=redis
```

`errorlog` is the recommend logging driver on Heroku which is why is why we set it here. In addition we're going to be using Redis for sessions and caching.

Finally open `app/Http/Middleware/TrustProxies.php` and update the class to match the following. We are telling Laravel to trust all proxies (which will be Heroku's load balancing system) and to use AWS ELB headers (which Heroku uses).

```php
<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Fideloper\Proxy\TrustProxies as Middleware;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * @var array
     */
    protected $proxies = '*';

    /**
     * The headers that should be used to detect proxies.
     *
     * @var string
     */
    protected $headers = Request::HEADER_X_FORWARDED_AWS_ELB;
}
```

If you want to learn more about this configuration and why it's used read the [getting started with Laravel guide](https://devcenter.heroku.com/articles/getting-started-with-laravel) from Heroku.

## Configure Laravel's connections

Now we have Laravel set up ready to serve let's get it talking to our add-ons, like the database and cache server. These are placed in the environment by Heroku automatically under the `DATABASE_URL` and `REDIS_URL` keys. Because they are in a self-contained format we need to deconstruct them in order for Laravel to use them.

Toward the top your `config/database.php` file let's fetch these connection URLs from the environment and parse them.

```php
<?php

$redisUrl = parse_url(env('REDIS_URL'));
$databaseUrl = parse_url(env('DATABASE_URL'));
```

With these in hand lets update the database and Redis configurations.

```php
'pgsql' => [
    'driver' => 'pgsql',
    'host' => env('DB_HOST', $databaseUrl['host']),
    'port' => env('DB_PORT', $databaseUrl['port']),
    'database' => env('DB_DATABASE', substr($databaseUrl['path'], 1)),
    'username' => env('DB_USERNAME',$databaseUrl['user']),
    'password' => env('DB_PASSWORD', $databaseUrl['pass']),
    'charset' => 'utf8',
    'prefix' => '',
    'schema' => 'public',
    'sslmode' => 'prefer',
],
```

Note that we leave use the same environment variables so that you can continue to configure Laravel your own way in development but it will fallback to the production configuration.

```php
'default' => [
    'host' => env('REDIS_HOST', $redisUrl['host']),
    'password' => env('REDIS_PASSWORD', $redisUrl['pass']),
    'port' => env('REDIS_PORT', $redisUrl['port']),
    'database' => 0,
],
```

> If you haven't already [installed Predis](https://laravel.com/docs/5.6/redis#introduction) which is required by Laravel in order to connect to Redis you can do so by running `composer require predis/predis`.

## Configure the server

To instruct Heroku how to host your app you'll need to create a file in the root directory called `Procfile`. This file is used by start the services your application will need.

```sh
web: vendor/bin/heroku-php-apache2 public/
release: php artisan config:cache && php artisan route:cache && php artisan view:cache && php artisan migrate --force
```

This configuration tells Heroku we need a `web` stack that will use Apache with `public/` as the public directory, which is the convention for Laravel apps.

The second line describes a `release` phase. This code is run every time a new version of your app is deployed. It's primarily used for migrations (which we do at the end using the `--force` flag so it doesn't ask for confirmation). However, we can also use it to get Laravel to quickly cache the configuration, routes and views before deploying the new release.

We need to do one more thing, this time in your `package.json` file. Simply add the [`heroku-postbuild`](https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process) script to the file and Heroku will automatically run the associated script after installing the dependencies as well. `yarn run production` will simply let Laravel Mix do it's magic on deployments.

```json
{
    "scripts: {
      //
      "heroku-postbuild": "yarn run production"
    }
}
```

## Ready to go

There is a little bit going on here - it's not quite out of the box.

Really the only frustrating bit about this process is having to parse the connection URLs for Postgres and Redis and then pass them to Laravel appropriately, but once it's configured it's not that bad.

Also keep in mind that this guide goes a little bit beyond just a basic "up & running configuration". We configure Redis for session and caching as well as build assets and optimise Laravel on deployments.

With not too much work your app is now reporting for duty and ready to scale.

## What's next

In future posts we'll take a look into using queues and the scheduler with Heroku amongst other optimisations.
