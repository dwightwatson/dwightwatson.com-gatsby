---
title: "InvalidArgumentException: Cannot redirect to an empty URL in Laravel"
path: /posts/invalid-argument-exception-cannot-redirect-to-an-empty-url-in-laravel
author: Dwight Watson
date: 2014-10-24
tags: ["laravel", "php", "phpunit", "testing"]
---

I've come across this issue a couple of times now; both from it showing up in my application logs but also when testing. `InvalidArgumentException: Cannot redirect to an empty URL.` will usually show up when you are redirecting with the handy `Redirect::back()` method. This method works great when it can determine where a user came from and where to redirect them back to but clearly falls flat on its face when it can't. Let's take a look at how it works.

    public function back($status = 302, $headers = array())
    {
        $back = $this->generator->getRequest()->headers->get('referer');

        return $this->createRedirect($back, $status, $headers);
    }

What we see here is that it works out the previous page by looking at the referer header, which is actually the `HTTP_REFERER` header. I'd like to see an option for some sort of route fallback in case that header doesn't exist, but until then you can always check the request headers yourself and see if it's an issue.

    if ( ! Request::header('referer'))
    {
        // Redirect::back() won't work as expected.
    }

Where it's become a big issue for me is when I'm trying to test my controllers and, as you might expect, there is no referer - it's just a single request per test. Because of this, I need to pass in the required header when I make the request in my tests. I'm a big fan of `$this->action()` as I like to test each action of my controllers, but if you like to do it another way be sure to look at `Illuminate\Foundation\Testing\ApplicationTrait` to see how you can change the server properties of your preferred route calling method.

    $this->action('POST', 'PostsController@store', ['title' => 'Foo'], [], [], ['HTTP_REFERER' => route('posts.create')]);

    $this->assertRedirectedToAction('PostsController@create');
