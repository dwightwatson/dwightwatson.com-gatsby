---
title: "Deploying Laravel with Envoy"
path: /posts/deploying-laravel-with-envoy
author: Dwight Watson
date: 2015-01-23
tags: ["envoy", "laravel"]
---

On a recent project we moved a site from a single server to a series of AWS EC2 instances provisioned with Laravel Forge. With this change we needed to re-think the way we did deployments as they now had to be applied to multiple servers, and we wanted to do it easily and fast. With that in mind we decided to take a look at [Envoy](https://github.com/laravel/envoy), Laravel&#039;s task runner.

Here are some excepts from our `envoy.blade.php` file, which might be useful to someone else who is considering deployment through Envoy. I&#039;ve added a little bit of information to each Envoy task to explain what it is and why we use it.

This is the primary deployment task - it deploys the latest code from the `master` branch to our two web instances and our worker (queues and crons). We run `composer install` as well to get any new dependencies but opt out of development dependencies (not necessary) and use the `--prefer-dist` flag to get distribution copies of the dependencies as they should download faster. We don&#039;t use parallel deployment in case something goes wrong during deployment so we still have other servers going.

    @task(&#039;production:deploy&#039;, [&#039;on&#039; =&gt; [&#039;web1&#039;, &#039;web2&#039;, &#039;worker1&#039;]])
        cd default
        php artisan down
        git pull origin master --force
        composer install --no-dev --prefer-dist
        php artisan up
    @endtask

Just utility tasks to turn the application on and off for whatever reason we might need.

    @task(&#039;production:up&#039;, [&#039;on&#039; =&gt; [&#039;web1&#039;, &#039;web2&#039;]])
        cd default
        php artisan up
    @endtask

    @task(&#039;production:down&#039;, [&#039;on&#039; =&gt; [&#039;web1&#039;, &#039;web2&#039;]])
        cd default
        php artisan down
    @endtask

Migrates the database when necessary. We don&#039;t do this in the `production:deploy` method just for the peace of mind of having a little bit more control over the database. Furthermore it goes through the worker instance instead of one of the web instances and it also uses the `--force` flag so that it doesn&#039;t ask &quot;are you sure you want to migrate in production?&quot;. So only use this if you&#039;re sure you want to migrate in production.

    @task(&#039;production:migrate&#039;, [&#039;on&#039; =&gt; &#039;worker1&#039;])
        cd default
        php artisan migrate --force
    @endtask

In case you stuff it up.

    @task(&#039;production:migrate:rollback&#039;, [&#039;on&#039; =&gt; &#039;worker1&#039;])
        cd default
        php artisan migrate:rollback --force
    @endtask
