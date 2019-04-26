---
title: "Testing pages that don&#039;t work in Laravel"
path: /posts/testing-pages-that-dont-work-in-laravel
author: Dwight Watson
date: 2016-09-04
tags: ["laravel", "php", "testing"]
---

Ran into a little bit of trouble today trying to test that a page *didn&#039;t* work in my Laravel app. I wanted to ensure that a user who tried to access a page they weren&#039;t authorised to view did in fact not get access to that page. Unfortuantely, using `visit()` as I normally do wasn&#039;t doing the trick.

```php
/** @test */
function it_rejects_unauthorized_users()
{
    $this-&gt;be(new User);

    $this-&gt;visit(&#039;admin&#039;);
}
```

```
A request to [http://example.com/admin] failed. Received status code [403].
```

This resulted in a failing test, because (as expected) the page didn&#039;t work. However, I had no good way of testing this. `seeStatusCode()` and `assertResponseStatus()` were not working with this arrangement. So I branched out, but it was *ugly*.

```php
function it_rejects_unauthorized_users()
{
    $this-&gt;be(new User);

    try {
        $this-&gt;visit(&#039;admin&#039;);
    } catch (Exception $e) {
        $this-&gt;assertContains(&#039;Received status code [403]&#039;, $e-&gt;getMessage());
    }
}
```

I couldn&#039;t settle on this, so I kept digging, and then found the obvious and simple solution. Don&#039;t use `visit()` and just make a simple request to the page. That then gives you access to the two status code assertions I mentioned above.

```php
function it_rejects_unauthorized_user()
{
    $this-&gt;be(new User);

    $this-&gt;get(&#039;admin&#039;)
        -&gt;seeStatusCode(403);
}
```

Beautiful!
