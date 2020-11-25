---
title: "Upgrading to Laravel 5"
path: /posts/upgrading-to-laravel-5
author: Dwight Watson
date: 2015-03-21
tags: ["laravel", "laravel 5", "php"]
---

I've spent a couple of hours over the last couple of days upgrading my blog to use Laravel 5. I made a number of changes along the way and while Laravel 5 doesn't have the nice familiarity of other MVC frameworks that 4.x did it's still a very lovely framework and the upgrade was relatively painless (with a special thanks to [Matt Stauffer's upgrade guide](https://mattstauffer.co/blog/upgrading-from-laravel-4-to-laravel-5).

As part of the upgrade I tried to adopt many of the new features in the framework. For one, I dropped my [model validation package](https://github.com/dwightwatson/validating) in favour of controller validation and form requests. I might consider bringing it back as a sanity check for my models - I worry that in some cases you might forget to apply proper validation in one form and then invalid data will make it's way to your database.

However, FormRequests and the integrated controller validation are great. They handle a lot of boilerplate for you, keep things consistent and give you great control over how to handle invalid form operations. It's worth reading a great deal through Laravels' FormRequest object to see how it works and what you can do with it, as a lot of it isn't documented.

It's sad to see a lot of the Facades lost favour to global functions, the colours aren't as nice in my text editor, but it works just the same as before and you don't need to include 10 Facades at the top of every controller. Futhermore, the move to method dependency injection is a great move, and being able to inject `Illuminate\Http\Request` or a FormRequest into your controller action is really clean, simple and easy to test.

The test suite is back to green (it took a bit of work and a bit of tweaking) and I'l be writing some more blog posts on the upgrade path and some of the changes I've taken to Laravel application development in the new version of the framework and more recently in general. I've switched to using Elixir for asset management instead of my custom Gulp solution and I've experimented with breaking some functionality out into commands, which I'll explore more deeply as I continue to work on it.

Of course, as it was before, [this entire blog is open-source](https://github.com/dwightwatson/neontsunami) so it can be used as a reference for Laravel 5 application development and also to see a test suite in action. if it's your thing, you can [still see the blog as it was on Laravel 4.2](https://github.com/dwightwatson/neontsunami/tree/85ed06524e834999678ff92bbab520d17ce17889) in case you're running that beast.
