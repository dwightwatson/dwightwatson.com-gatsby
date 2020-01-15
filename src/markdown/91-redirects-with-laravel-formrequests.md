---
title: "Redirects with Laravel FormRequests"
path: /posts/redirects-with-laravel-formrequests
author: Dwight Watson
date: 2015-03-21
tags: ["laravel", "laravel 5", "php"]
---

By default an invalid `FormRequest` in Laravel 5 will simply redirect `back()`. If there was no previous request, you'll end up at the homepage. There are a range of options to handle the redirect response and I'll go through some of the solutions out of the box, as well as how to override the response completely and do your own thing. I wanted greater flexibility over these responses so that when I was testing I could be sure that failed form requests were going back to the right place.

It all starts with this function, `getRedirectUrl()` in the parent `FormRequest` class:

    /**
     * Get the URL to redirect to on a validation error.
     *
     * @return string
     */
    protected function getRedirectUrl()
    {
        $url = $this->redirector->getUrlGenerator();

        if ($this->redirect)
        {
            return $url->to($this->redirect);
        }
        elseif ($this->redirectRoute)
        {
            return $url->route($this->redirectRoute);
        }
        elseif ($this->redirectAction)
        {
            return $url->action($this->redirectAction);
        }

        return $url->previous();
    }

As you can see, it'll look on your `FormRequest` object for a place to redirect, and if all else fails it'll default to the previous location. So you can set the `$redirect`, `$redirectRoute` or `$redirectAction` on your `FormRequest` and that will then become the redirect location for a failed request (obviously, you'll only need one of those).

    /**
     * The URI to redirect to if validation fails.
     *
     * @var string
     */
    protected $redirect = 'login';

    /**
     * The route to redirect to if validation fails.
     *
     * @var string
     */
    protected $redirectRoute = 'sessions.create';

    /**
     * The controller action to redirect to if validation fails.
     *
     * @var string
     */
    protected $redirectAction = 'SessionsController@create';

Where it becomes more difficult is if you want to redirect to route or an action, but with parameters. For example if you're editing a resource and the form request fails, you'll want to redirect back to the edit route for that *specific* resource. You can't just make the `$redirectRoute = 'posts.edit'` because the route will require the ID of the model.

Using a trick I talked about [when using the unique validation rule in Laravel FormRequests](https://www.dwightwatson.com/posts/using-unique-rule-ids-in-laravel-formrequests) you can override the `getRedirectUrl()` method in your `FormRequest` and control the redirect your way.

    /**
     * Get the URL to redirect to on a validation error.
     *
     * @return string
     */
    protected function getRedirectUrl()
    {
        $url = $this->redirector->getUrlGenerator();

        $post = $this->route()->parameter('posts');

        return $url->route('admin.posts.edit', $post);
    }

It's worth inspecting the `$this->route()` object in your request to see what parameters are available to you (and what their names are) to fetch the right one and perform the right redirect.
