---
title: "Dependency injection in Laravel commands"
path: /posts/dependency-injection-in-laravel-commands
author: Dwight Watson
date: 2014-12-22
tags: ["laravel", "php"]
---

Something that I've not really paid attention to for a while is the Artisan commands in our Laravel applications. We've a handful of utility functions which aren't masterpieces by any means but they get the job done. All our commands have been registeted in `artisan.php`.

    Artisan::add(new Users\ResendWelcomeEmailCommand);

However, if you wanted to inject anything into your command (like you would with your controllers) this isn't going to cut it. Let's assume we want to inject the `User` model into our command.

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

            $this->user = $user;
        }
    }

So, there are two ways we can use Laravel's IoC container to automatically inject the command's dependencies. The first is to manually pull the instance out of the container and pass it to Artisan.

    Artisan::add(App:make('Users\ResendWelcomeEmailCommand'));

The second, easier way is to use the `resolve()` method, which handles everything for you.

    Artisan::resolve('Users\ResendWelcomeEmailCommand');

By switching from `Artisan::add()` to `Artisan::resolve()` you gain the ability to use Laravel's IoC container for dependency injection. Too easy!
