---
title: "Laravel 4, the fast way"
path: /posts/laravel-4-the-fast-way
author: Dwight Watson
date: 2013-07-22
tags: ["composer", "laravel", "media temple"]
---

I wrote earlier about how to get Laravel 4 up and running on Media Temple&#039;s (gs), which involved cloning the framework&#039;s Git repository, getting Composer installed and some slight trickery. However, if you&#039;ve already got Composer on your machine and don&#039;t have any odd requirements, there&#039;s actually a really easy way to install a fresh copy of the framework.

`composer create-project laravel/laravel my-project`

That one command will create a `my-project` folder, install Laravel 4 and all it&#039;s Composer dependencies, as well as generate an encryption key and optimize the install. If you&#039;re a Composer guru who just wants to get a fresh app started this is a pretty handy trick.
