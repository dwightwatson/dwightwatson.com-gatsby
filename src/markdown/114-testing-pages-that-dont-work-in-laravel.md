---
title: "Testing pages that don't work in Laravel"
path: /posts/testing-pages-that-dont-work-in-laravel
author: Dwight Watson
date: 2016-09-04
tags: ["laravel", "php", "testing"]
---

Ran into a little bit of trouble today trying to test that a page *didn't* work in my Laravel app. I wanted to ensure that a user who tried to access a page they weren't authorised to view did in fact not get access to that page. Unfortuantely, using `visit()` as I normally do wasn't doing the trick.

```php
/** @test */
function it_rejects_unauthorized_users()
{
    $this->be(new User);

    $this->visit('admin');
}
```

```
A request to [http://example.com/admin] failed. Received status code [403].
```

This resulted in a failing test, because (as expected) the page didn't work. However, I had no good way of testing this. `seeStatusCode()` and `assertResponseStatus()` were not working with this arrangement. So I branched out, but it was *ugly*.

```php
function it_rejects_unauthorized_users()
{
    $this->be(new User);

    try {
        $this->visit('admin');
    } catch (Exception $e) {
        $this->assertContains('Received status code [403]', $e->getMessage());
    }
}
```

I couldn't settle on this, so I kept digging, and then found the obvious and simple solution. Don't use `visit()` and just make a simple request to the page. That then gives you access to the two status code assertions I mentioned above.

```php
function it_rejects_unauthorized_user()
{
    $this->be(new User);

    $this->get('admin')
        ->seeStatusCode(403);
}
```

Beautiful!
