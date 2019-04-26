---
title: "Dependency injection in Laravel commands"
path: /posts/dependency-injection-in-laravel-commands
author: Dwight Watson
date: 2014-12-22
tags: ["laravel", "php"]
---

Something that I&#039;ve not really paid attention to for a while is the Artisan commands in our Laravel applications. We&#039;ve a handful of utility functions which aren&#039;t masterpieces by any means but they get the job done. All our commands have been registeted in `artisan.php`.

    Artisan::add(new Users\ResendWelcomeEmailCommand);

However, if you wanted to inject anything into your command (like you would with your controllers) this isn&#039;t going to cut it. Let&#039;s assume we want to inject the `User` model into our command.

    // Namespaces and other use statements excluded.
    class ResendWelcomeEmailCommand extends Command
    {
	/**
         * User instance.
         *
         * @var \User
         */
        protected $user;

        public function __construct(User $user)
        {
            parent::__construct();

            $this-&gt;user = $user;
        }
    }

So, there are two ways we can use Laravel&#039;s IoC container to automatically inject the command&#039;s dependencies. The first is to manually pull the instance out of the container and pass it to Artisan.

    Artisan::add(App:make(&#039;Users\ResendWelcomeEmailCommand&#039;));

The second, easier way is to use the `resolve()` method, which handles everything for you.

    Artisan::resolve(&#039;Users\ResendWelcomeEmailCommand&#039;);

By switching from `Artisan::add()` to `Artisan::resolve()` you gain the ability to use Laravel&#039;s IoC container for dependency injection. Too easy!
