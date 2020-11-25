---
title: "Testing with Laravel route filters"
path: /posts/testing-with-laravel-route-filters
author: Dwight Watson
date: 2014-09-10
tags: ["laravel", "php", "phpunit", "testing"]
---

One thing that I see trip up a lot of developers testing Laravel is they find their filters don't work. For example, the `auth` filter that is supposed to keep anyone not logged into their app just lets the `$this->action('GET', 'AdminController@index')` call straight through. It can be a bit weird to see that your filters actually work on your site as you browse through it but not at all for your tests. It turns out the solution is really simple.

By default, Laravel disables filters for the testing environment. This means that the filters just get out of your way and you can focus on ensuring whatever you're testing does what it's meant to do. However, you'll still want to test that the filters work when they're supposed to, and you can easily devote some tests to that. Let's take a look at how that works.

My `AdminController` has an `auth` filter applied to it, which also applies to all the controllers that extend from it. To test a controller like this, I simply call `Route::enableFilters()`.

    class AdminControllerTest extends TestCase {

        public function setUp()
        {
            parent::setUp();

            Route::enableFilters();
        }

        public function testRedirectsGuests()
        {
            $this->call('GET', 'admin');

            $this->assertRedirectedToRoute('admin.sessions.create');
        }

        public function testAllowsAuthenticatedAccess()
        {
            $this->be(new User);

            $this->call('GET', 'admin');

            $this->assertResponseOk();
        }

    }

In this example you can see how we enable the filters, then test an admin route to see what happens - once when we're logged out and again when we're logged in. Of course you could opt to use `Route::enableFilters()` through your entire testing suite, but I find it easier to test it alone and know that it's going to work everywhere else.

You might also note that you can just pass a empty User to `$this->be()` and it will log you into the app, save a little bit of hassle.
