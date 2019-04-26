---
title: "Laravel Auth scaffold tests"
path: /posts/laravel-auth-scaffold-tests
author: Dwight Watson
date: 2017-07-28
tags: ["laravel", "phpunit", "testing"]
---

You&#039;ve read it once, you&#039;ve read it a thousand times - one of the hardest things when first getting into testing your code is knowing *what* to test and then *how* to test it. Especially once you throw a framework into the mix you need to get your head around quite a number of new APIs before you can get off the ground. What are the different kinds of PHPUnit assertions and how can I use them? What utilities does Laravel provide to assist testing and what are the conventions for their use? Now more than ever we have some great resources for getting started with testing your Laravel apps (including [Laracasts](https://laracasts.com/) series and [Test-Driven Laravel](https://adamwathan.me/test-driven-laravel/)) but I thought I&#039;d throw some of my thoughts into the mix and kick off a series on testing Laravel too.

The most important thing is to just start writing tests - you don&#039;t need to test your entire app all at once. If you&#039;re adding a new feature try and cover it with a test. Otherwise pick off some small functionality in your app and write some coverage for it. The point is start small and work your way up from there. As you add more tests you become more familiar with how it all fits together, become more comfortable with the syntax and approach to testing and you begin to lay a template for your teammates to get involved as well. A number of my staff slowly got into testing by copy/pasting some of my existing tests and adapting them for whatever it is they were working on - and that&#039;s great. Best of all though as you continue this you begin to develop more confidence in your app as your coverage ensures things won&#039;t break in the future.

To kick us off I wanted to share and walk through some example code that I once [made for a PR into Laravel](https://github.com/laravel/framework/pull/19647) - in addition to the auth scaffold I thought it would be great if we provided the option to ship some tests with it. I think auth tests are a great place to start because they&#039;re pretty crucial to an app - you *really* don&#039;t want to break the ability for your users to register or login. It just gets your foot in the door - it&#039;s the perfect opportunity to get your test suite up and running in your local environment (and hopefully a continuous integration environment as well) with a real-world test suite that actually provides value (`$this-&gt;assertTrue(true)` doesn&#039;t do much for you). Following that you have the start of a test suite that you can be inspired from to keep adding more tests and coverage.

I&#039;ve moved these [boilerplate tests to a `laravel-auth-tests` repo](https://github.com/dwightwatson/laravel-auth-tests) so they&#039;re available for perusal and use - drop them right into your app and see if they work.

Here&#039;s just a sample - the `RegisterTest` which confirms that the register form can be displayed, registers valid users and doesn&#039;t register invalid users. Pretty simple stuff, pretty important functionality. Obviously if you&#039;ve made adjustments to any of these flows in your app you&#039;ll need to adjust the tests to fit - but that&#039;s a good thing. The comments on each test case should appropriately describe what the test is checking for and they&#039;re all simple to read and see how they work. There&#039;s not much magic here.

```php
&lt;?php

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
        $response = $this-&gt;get(&#039;/register&#039;);

        $response-&gt;assertStatus(200);
    }

    /**
     * A valid user can be registered.
     *
     * @return void
     */
    public function testRegistersAValidUser()
    {
        $user = factory(User::class)-&gt;make();

        $response = $this-&gt;post(&#039;register&#039;, [
            &#039;name&#039; =&gt; $user-&gt;name,
            &#039;email&#039; =&gt; $user-&gt;email,
            &#039;password&#039; =&gt; &#039;secret&#039;,
            &#039;password_confirmation&#039; =&gt; &#039;secret&#039;
        ]);

        $response-&gt;assertStatus(302);

        $this-&gt;seeIsAuthenticated();
    }

    /**
     * An invalid user is not registered.
     *
     * @return void
     */
    public function testDoesNotRegisterAnInvalidUser()
    {
        $user = factory(User::class)-&gt;make();

        $response = $this-&gt;post(&#039;register&#039;, [
            &#039;name&#039; =&gt; $user-&gt;name,
            &#039;email&#039; =&gt; $user-&gt;email,
            &#039;password&#039; =&gt; &#039;secret&#039;,
            &#039;password_confirmation&#039; =&gt; &#039;invalid&#039;
        ]);

        $response-&gt;assertSessionHasErrors();

        $this-&gt;dontSeeIsAuthenticated();
    }
}
``` 

Go have a look at [the `laravel-auth-tests` repo](https://github.com/dwightwatson/laravel-auth-tests), see if the tests are of any use to you or if they can help you kick off your own testing journey.
