---
title: "Handling forbidden form requests in Laravel 5"
path: /posts/handling-forbidden-form-requests-in-laravel-5
author: Dwight Watson
date: 2015-03-21
tags: ["laravel", "laravel 5", "php"]
---

By default, the `FormRequest` will simply throw a `403 Forbidden` response if the `authorize()` method returns false. This could happen for a number of reasons, for example; the user is logged out or the user doesn&#039;t have access to the resource they&#039;re trying to interact with. Unfortunately, the default `403` response isn&#039;t lovely.

    /**
     * Get the response for a forbidden operation.
     *
     * @return \Illuminate\Http\Response
     */
    public function forbiddenResponse()
    {
        return new Response(&#039;Forbidden&#039;, 403);
    }

Often you&#039;ll want to adjust this response to make it a little more friendly for your users. It&#039;s actually really easy, especially as you&#039;re given a base Request object out of the box for you to extend. Simply override this `forbiddenResponse()` method with whatever you need, like a redirect to a login page.

    &lt;?php namespace App\Http\Requests;

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
            return $this-&gt;redirector-&gt;route(&#039;login&#039;);
        }
    }
