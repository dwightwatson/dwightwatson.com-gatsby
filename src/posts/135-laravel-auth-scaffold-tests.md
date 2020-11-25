---
title: "Laravel Auth scaffold tests"
path: /posts/laravel-auth-scaffold-tests
author: Dwight Watson
date: 2017-07-28
tags: ["laravel", "phpunit", "testing"]
---

You've read it once, you've read it a thousand times - one of the hardest things when first getting into testing your code is knowing *what* to test and then *how* to test it. Especially once you throw a framework into the mix you need to get your head around quite a number of new APIs before you can get off the ground. What are the different kinds of PHPUnit assertions and how can I use them? What utilities does Laravel provide to assist testing and what are the conventions for their use? Now more than ever we have some great resources for getting started with testing your Laravel apps (including [Laracasts](https://laracasts.com/) series and [Test-Driven Laravel](https://adamwathan.me/test-driven-laravel/)) but I thought I'd throw some of my thoughts into the mix and kick off a series on testing Laravel too.

The most important thing is to just start writing tests - you don't need to test your entire app all at once. If you're adding a new feature try and cover it with a test. Otherwise pick off some small functionality in your app and write some coverage for it. The point is start small and work your way up from there. As you add more tests you become more familiar with how it all fits together, become more comfortable with the syntax and approach to testing and you begin to lay a template for your teammates to get involved as well. A number of my staff slowly got into testing by copy/pasting some of my existing tests and adapting them for whatever it is they were working on - and that's great. Best of all though as you continue this you begin to develop more confidence in your app as your coverage ensures things won't break in the future.

To kick us off I wanted to share and walk through some example code that I once [made for a PR into Laravel](https://github.com/laravel/framework/pull/19647) - in addition to the auth scaffold I thought it would be great if we provided the option to ship some tests with it. I think auth tests are a great place to start because they're pretty crucial to an app - you *really* don't want to break the ability for your users to register or login. It just gets your foot in the door - it's the perfect opportunity to get your test suite up and running in your local environment (and hopefully a continuous integration environment as well) with a real-world test suite that actually provides value (`$this->assertTrue(true)` doesn't do much for you). Following that you have the start of a test suite that you can be inspired from to keep adding more tests and coverage.

I've moved these [boilerplate tests to a `laravel-auth-tests` repo](https://github.com/dwightwatson/laravel-auth-tests) so they're available for perusal and use - drop them right into your app and see if they work.

Here's just a sample - the `RegisterTest` which confirms that the register form can be displayed, registers valid users and doesn't register invalid users. Pretty simple stuff, pretty important functionality. Obviously if you've made adjustments to any of these flows in your app you'll need to adjust the tests to fit - but that's a good thing. The comments on each test case should appropriately describe what the test is checking for and they're all simple to read and see how they work. There's not much magic here.

```php
<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RegisterTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * The registration form can be displayed.
     *
     * @return void
     */
    public function testRegisterFormDisplayed()
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    /**
     * A valid user can be registered.
     *
     * @return void
     */
    public function testRegistersAValidUser()
    {
        $user = factory(User::class)->make();

        $response = $this->post('register', [
            'name' => $user->name,
            'email' => $user->email,
            'password' => 'secret',
            'password_confirmation' => 'secret'
        ]);

        $response->assertStatus(302);

        $this->seeIsAuthenticated();
    }

    /**
     * An invalid user is not registered.
     *
     * @return void
     */
    public function testDoesNotRegisterAnInvalidUser()
    {
        $user = factory(User::class)->make();

        $response = $this->post('register', [
            'name' => $user->name,
            'email' => $user->email,
            'password' => 'secret',
            'password_confirmation' => 'invalid'
        ]);

        $response->assertSessionHasErrors();

        $this->dontSeeIsAuthenticated();
    }
}
```

Go have a look at [the `laravel-auth-tests` repo](https://github.com/dwightwatson/laravel-auth-tests), see if the tests are of any use to you or if they can help you kick off your own testing journey.
