---
title: "Multiple read-only database slaves in Laravel"
path: /posts/multiple-read-only-database-slaves-in-laravel
author: Dwight Watson
date: 2015-01-14
tags: ["aws", "laravel", "mysql", "postgresql"]
---

[See an updated post on multiple read-slaves here](https://www.dwightwatson.com/posts/multiple-database-read-write-connections-in-laravel).

Having recently moved one of our applications to AWS I've discovered how easy it is to create read-only database replicas if you're using the RDS service. RDS makes it really easy to provision an optimised database server for your application and supports a range of engines out of the box, including MySQL, Postgres and a new highly-optimised MySQL fork called Aurora.

Because it's now a cinch to create a database slave I was excited to see [how easy it is to have Laravel support read connections](http://laravel.com/docs/4.2/database#read-write-connections). However, what struck me here is that it only supports one write connection and one read connection - and depending on your application and how it scales this may or may not be enough. I was keen for the potential to have multiple read-only replicas.

Looking at [the issue that requests read/write connections in Laravel](https://github.com/laravel/framework/issues/5) you can see the discussion around handling multiple database connections and that simply using the `array_rand()` function is the easiest solution for handing off queries to different databases.

    // Before returning the database configuration, place read hosts into an array.
    $readHosts = ['193.168.1.1', '194.168.1.1'];

    //

    'mysql' => array(
        'read' => array(
            // Return a random host
            'host' => $readHosts[array_rand($readHosts)],
        ),
        'write' => array(
            'host' => '196.168.1.2'
        ),
        'driver'    => 'mysql',
        'database'  => 'database',
        'username'  => 'root',
        'password'  => '',
        'charset'   => 'utf8',
        'collation' => 'utf8_unicode_ci',
        'prefix'    => '',
    ),
