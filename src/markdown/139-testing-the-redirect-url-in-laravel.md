---
title: "Testing the redirect URL in Laravel"
path: /posts/testing-the-redirect-url-in-laravel
author: Dwight Watson
date: 2017-08-06
tags: ["laravel", "testing"]
---

In Laravel it’s quite common to return “back” to the previous URL a visitor was on. If you’re not using `return back()` or something similar this magic is often handled under the hood - either by a FormRequest or by use of the `$this-&gt;validate()` controller method. However, testing this can be a bit of a pain.

If Laravel cannot work out what the previous URL was it will just redirect to the home page. This can throw off some feature tests - if you want to ensure an invalid form request takes you back to the form this might not work as you expect.

```php
/** @test */
function it_returns_invalid_request_to_form()
{
    $response = $this-&gt;post(&#039;/comments&#039;, []);

    $response-&gt;assertRedirect(&#039;/comments/create&#039;);
}
```

The above example would fail, because in this test case Laravel won’t be able to determine the previous URL and instead will redirect to the homepage. It’s fine for actual users because it will work as expected, but it’s annoying if you want to test this functionality.

By adding a simple `from()` helper method to our base `TestCase` we can provide a way to tell our requests where the previous “request” came from. This allows you to confirm that your validation errors are redirecting as you expect.

```php
/**
 * Set the URL of the previous request.
 *
 * @param  string  $url
 * @return $this
 */
public function from(string $url)
{
    $this-&gt;app[&#039;session&#039;]-&gt;setPreviousUrl($url);

    return $this;
}
```

With this helper in place, adjust your tests as follows to ensure things are working the way you want.

```php
/** @test */
function it_returns_invalid_request_to_form()
{
    $response = $this-&gt;from(&#039;/comments/create&#039;)
        -&gt;post(&#039;/comments&#039;, []);

    $response-&gt;assertRedirect(&#039;/comments/create&#039;);
}
```
