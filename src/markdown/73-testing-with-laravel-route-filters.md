---
title: "Testing with Laravel route filters"
path: /posts/testing-with-laravel-route-filters
author: Dwight Watson
date: 2014-09-10
tags: ["laravel", "php", "phpunit", "testing"]
---

One thing that I see trip up a lot of developers testing Laravel is they find their filters don&#039;t work. For example, the `auth` filter that is supposed to keep anyone not logged into their app just lets the `$this-&gt;action(&#039;GET&#039;, &#039;AdminController@index&#039;)` call straight through. It can be a bit weird to see that your filters actually work on your site as you browse through it but not at all for your tests. It turns out the solution is really simple.

By default, Laravel disables filters for the testing environment. This means that the filters just get out of your way and you can focus on ensuring whatever you&#039;re testing does what it&#039;s meant to do. However, you&#039;ll still want to test that the filters work when they&#039;re supposed to, and you can easily devote some tests to that. Let&#039;s take a look at how that works.

My `AdminController` has an `auth` filter applied to it, which also applies to all the controllers that extend from it. To test a controller like this, I simply call `Route::enableFilters()`.

    class AdminControllerTest extends TestCase {

        public function setUp()
        {
            parent::setUp();

            Route::enableFilters();
        }

        public function testRedirectsGuests()
        {
            $this-&gt;call(&#039;GET&#039;, &#039;admin&#039;);

            $this-&gt;assertRedirectedToRoute(&#039;admin.sessions.create&#039;);
        }

        public function testAllowsAuthenticatedAccess()
        {
            $this-&gt;be(new User);

            $this-&gt;call(&#039;GET&#039;, &#039;admin&#039;);

            $this-&gt;assertResponseOk();
        }

    }

In this example you can see how we enable the filters, then test an admin route to see what happens - once when we&#039;re logged out and again when we&#039;re logged in. Of course you could opt to use `Route::enableFilters()` through your entire testing suite, but I find it easier to test it alone and know that it&#039;s going to work everywhere else.

You might also note that you can just pass a empty User to `$this-&gt;be()` and it will log you into the app, save a little bit of hassle.
