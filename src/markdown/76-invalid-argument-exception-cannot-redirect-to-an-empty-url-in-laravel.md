---
title: "InvalidArgumentException: Cannot redirect to an empty URL in Laravel"
path: /posts/invalid-argument-exception-cannot-redirect-to-an-empty-url-in-laravel
author: Dwight Watson
date: 2014-10-24
tags: ["laravel", "php", "phpunit", "testing"]
---

I&#039;ve come across this issue a couple of times now; both from it showing up in my application logs but also when testing. `InvalidArgumentException: Cannot redirect to an empty URL.` will usually show up when you are redirecting with the handy `Redirect::back()` method. This method works great when it can determine where a user came from and where to redirect them back to but clearly falls flat on its face when it can&#039;t. Let&#039;s take a look at how it works.

    public function back($status = 302, $headers = array())
    {
        $back = $this-&gt;generator-&gt;getRequest()-&gt;headers-&gt;get(&#039;referer&#039;);

        return $this-&gt;createRedirect($back, $status, $headers);
    }

What we see here is that it works out the previous page by looking at the referer header, which is actually the `HTTP_REFERER` header. I&#039;d like to see an option for some sort of route fallback in case that header doesn&#039;t exist, but until then you can always check the request headers yourself and see if it&#039;s an issue.

    if ( ! Request::header(&#039;referer&#039;))
    {
        // Redirect::back() won&#039;t work as expected.
    }

Where it&#039;s become a big issue for me is when I&#039;m trying to test my controllers and, as you might expect, there is no referer - it&#039;s just a single request per test. Because of this, I need to pass in the required header when I make the request in my tests. I&#039;m a big fan of `$this-&gt;action()` as I like to test each action of my controllers, but if you like to do it another way be sure to look at `Illuminate\Foundation\Testing\ApplicationTrait` to see how you can change the server properties of your preferred route calling method.

    $this-&gt;action(&#039;POST&#039;, &#039;PostsController@store&#039;, [&#039;title&#039; =&gt; &#039;Foo&#039;], [], [], [&#039;HTTP_REFERER&#039; =&gt; route(&#039;posts.create&#039;)]);

    $this-&gt;assertRedirectedToAction(&#039;PostsController@create&#039;);
