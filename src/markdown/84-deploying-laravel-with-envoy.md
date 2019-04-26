---
title: "Deploying Laravel with Envoy"
path: /posts/deploying-laravel-with-envoy
author: Dwight Watson
date: 2015-01-23
tags: ["envoy", "laravel"]
---

On a recent project we moved a site from a single server to a series of AWS EC2 instances provisioned with Laravel Forge. With this change we needed to re-think the way we did deployments as they now had to be applied to multiple servers, and we wanted to do it easily and fast. With that in mind we decided to take a look at [Envoy](https://github.com/laravel/envoy), Laravel's task runner.

Here are some excepts from our `envoy.blade.php` file, which might be useful to someone else who is considering deployment through Envoy. I've added a little bit of information to each Envoy task to explain what it is and why we use it.

This is the primary deployment task - it deploys the latest code from the `master` branch to our two web instances and our worker (queues and crons). We run `composer install` as well to get any new dependencies but opt out of development dependencies (not necessary) and use the `--prefer-dist` flag to get distribution copies of the dependencies as they should download faster. We don't use parallel deployment in case something goes wrong during deployment so we still have other servers going.

    @task('production:deploy', ['on' => ['web1', 'web2', 'worker1']])
        cd default
        php artisan down
        git pull origin master --force
        composer install --no-dev --prefer-dist
        php artisan up
    @endtask

Just utility tasks to turn the application on and off for whatever reason we might need.

    @task('production:up', ['on' => ['web1', 'web2']])
        cd default
        php artisan up
    @endtask

    @task('production:down', ['on' => ['web1', 'web2']])
        cd default
        php artisan down
    @endtask

Migrates the database when necessary. We don't do this in the `production:deploy` method just for the peace of mind of having a little bit more control over the database. Furthermore it goes through the worker instance instead of one of the web instances and it also uses the `--force` flag so that it doesn't ask "are you sure you want to migrate in production?". So only use this if you're sure you want to migrate in production.

    @task('production:migrate', ['on' => 'worker1'])
        cd default
        php artisan migrate --force
    @endtask

In case you stuff it up.

    @task('production:migrate:rollback', ['on' => 'worker1'])
        cd default
        php artisan migrate:rollback --force
    @endtask
