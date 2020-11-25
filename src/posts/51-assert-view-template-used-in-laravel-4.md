---
title: "Assert view template used in Laravel 4"
path: /posts/assert-view-template-used-in-laravel-4
author: Dwight Watson
date: 2014-04-28
tags: ["laravel", "phpunit", "testing"]
---

Some of the controllers in a project I work on return different view templates depending on certain requirements. For example, the `search()` method returns `View::make('posts.search')` if no input is provided, but `View::make('posts.results')` if a query string parameter is passed for the purpose of testing. However, there is no built-in function for asserting which view template is rendered when writing your functional tests. Here is a handy function you can pop into your `TestCase` class to allow you to ensure the correct view template is being rendered when you need.

    /**
     * Tests to see whether the view template provided is the one
     * used in rendering the view.
     *
     * @param  string
     * @return void
     */
    protected function assertViewIs($templateName)
    {
        return $this->assertEquals($templateName, $this->client->getResponse()->original->getName());
    }
