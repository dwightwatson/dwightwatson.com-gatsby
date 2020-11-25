---
title: "Handling forbidden form requests in Laravel 5"
path: /posts/handling-forbidden-form-requests-in-laravel-5
author: Dwight Watson
date: 2015-03-21
tags: ["laravel", "laravel 5", "php"]
---

By default, the `FormRequest` will simply throw a `403 Forbidden` response if the `authorize()` method returns false. This could happen for a number of reasons, for example; the user is logged out or the user doesn't have access to the resource they're trying to interact with. Unfortunately, the default `403` response isn't lovely.

    /**
     * Get the response for a forbidden operation.
     *
     * @return \Illuminate\Http\Response
     */
    public function forbiddenResponse()
    {
        return new Response('Forbidden', 403);
    }

Often you'll want to adjust this response to make it a little more friendly for your users. It's actually really easy, especially as you're given a base Request object out of the box for you to extend. Simply override this `forbiddenResponse()` method with whatever you need, like a redirect to a login page.

    <?php namespace App\Http\Requests;

    use Illuminate\Foundation\Http\FormRequest;

    abstract class Request extends FormRequest
    {
        /**
         * Get the response for a forbidden operation.
         *
         * @return \Illuminate\Http\Response
         */
        public function forbiddenResponse()
        {
            return $this->redirector->route('login');
        }
    }
