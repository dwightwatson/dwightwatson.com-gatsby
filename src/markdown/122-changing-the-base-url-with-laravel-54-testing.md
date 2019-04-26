---
title: "Changing the base URI with Laravel 5.4 testing"
path: /posts/changing-the-base-url-with-laravel-54-testing
author: Dwight Watson
date: 2017-02-05
tags: ["laravel", "laravel 5", "php", "testing"]
---

While upgrading my app from to Laravel 5.4 and replacing my "BrowserKit" style tests with the new evolution TestCase I ran into some trouble testing routes that came through on subdomains. The tests that used to pass would now 404. Previously, I used this at the top of a test case to set the base URL (my API endpoint) so that the tests would run off it.

```php
/**
 * The base URL to use while testing the application.
 *
 * @var string
 */
protected $baseUrl = 'http://api.neontsunami.com';
```

However it seems Laravel 5.4 doesn't look for a `baseUrl` property and instead relies on the `app.url` configuration. Luckily, this is easy to change out on the fly in your tests, even in the `setUp` method.

```php
function setUp()
{
    parent::setUp();

    config(['app.url' => 'http://api.studentvip.com.au']);
}
```
