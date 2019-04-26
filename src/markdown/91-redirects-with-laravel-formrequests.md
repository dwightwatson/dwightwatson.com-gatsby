---
title: "Redirects with Laravel FormRequests"
path: /posts/redirects-with-laravel-formrequests
author: Dwight Watson
date: 2015-03-21
tags: ["laravel", "laravel 5", "php"]
---

By default an invalid `FormRequest` in Laravel 5 will simply redirect `back()`. If there was no previous request, you&#039;ll end up at the homepage. There are a range of options to handle the redirect response and I&#039;ll go through some of the solutions out of the box, as well as how to override the response completely and do your own thing. I wanted greater flexibility over these responses so that when I was testing I could be sure that failed form requests were going back to the right place.

It all starts with this function, `getRedirectUrl()` in the parent `FormRequest` class:

    /**
     * Get the URL to redirect to on a validation error.
     *
     * @return string
     */
    protected function getRedirectUrl()
    {
        $url = $this-&gt;redirector-&gt;getUrlGenerator();

        if ($this-&gt;redirect)
        {
            return $url-&gt;to($this-&gt;redirect);
        }
        elseif ($this-&gt;redirectRoute)
        {
            return $url-&gt;route($this-&gt;redirectRoute);
        }
        elseif ($this-&gt;redirectAction)
        {
            return $url-&gt;action($this-&gt;redirectAction);
        }

        return $url-&gt;previous();
    }

As you can see, it&#039;ll look on your `FormRequest` object for a place to redirect, and if all else fails it&#039;ll default to the previous location. So you can set the `$redirect`, `$redirectRoute` or `$redirectAction` on your `FormRequest` and that will then become the redirect location for a failed request (obviously, you&#039;ll only need one of those).

    /**
     * The URI to redirect to if validation fails.
     *
     * @var string
     */
    protected $redirect = &#039;login&#039;;

    /**
     * The route to redirect to if validation fails.
     *
     * @var string
     */
    protected $redirectRoute = &#039;sessions.create&#039;;

    /**
     * The controller action to redirect to if validation fails.
     *
     * @var string
     */
    protected $redirectAction = &#039;SessionsController@create&#039;;

Where it becomes more difficult is if you want to redirect to route or an action, but with parameters. For example if you&#039;re editing a resource and the form request fails, you&#039;ll want to redirect back to the edit route for that *specific* resource. You can&#039;t just make the `$redirectRoute = &#039;posts.edit&#039;` because the route will require the ID of the model.

Using a trick I talked about [when using the unique validation rule in Laravel FormRequests](http://www.neontsunami.com/posts/using-unique-rule-ids-in-laravel-formrequests) you can override the `getRedirectUrl()` method in your `FormRequest` and control the redirect your way.

    /**
     * Get the URL to redirect to on a validation error.
     *
     * @return string
     */
    protected function getRedirectUrl()
    {
        $url = $this-&gt;redirector-&gt;getUrlGenerator();

        $post = $this-&gt;route()-&gt;parameter(&#039;posts&#039;);

        return $url-&gt;route(&#039;admin.posts.edit&#039;, $post);
    }

It&#039;s worth inspecting the `$this-&gt;route()` object in your request to see what parameters are available to you (and what their names are) to fetch the right one and perform the right redirect.
