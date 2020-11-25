---
title: "Speed up your Laravel tests by 70% with this one simple trick"
path: /posts/speed-up-your-laravel-tests-by-70-with-this-one-simple-trick
author: Dwight Watson
date: 2016-12-05
tags: ["laravel", "php", "phpunit"]
---

Excuse the clickbait title of the post, but it does so happen that a simple change to my Laravel test suite was able to speed up total test run time from 165 seconds to just 45 seconds. It should have a helpful effect on your suite run time if you've got a similar setup too.

My application uses the `Illuminate\Foundation\Testing\DatabaseTransactions` trait throughout the tests wherever database interaction is required. Because the app is quite large it made more sense to migrate the database before the suite ran and then just rollback any changes made to the database between tests.

This is the `setUp` method of my application's base `TestCase`:

```php
public function setUp()
{
    parent::setUp();

    Artisan::call('migrate');
}
```

This would ensure the database was migrated before the tests were run, but it had the side effect of checking *before every single test*. In actual fact it is only necessary to run this once at the start of the suite and then you should be good to go. I added a static variable and used it to ensure that `migrate` was only run before the first test.

```php
protected static $migrationsRun = false;

public function setUp()
{
    parent::setUp();

    if (!static::$migrationsRun) {
        Artisan::call('migrate');
        static::$migrationsRun = true;
    }
}
```

I gather not everyone will have a similar setup (using database transactions instead of migrations, and performing the migration in the `setUp` method - perhaps you just manually migrate before running the suite), but if you do then it's an easy win.
