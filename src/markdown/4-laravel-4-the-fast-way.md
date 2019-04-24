---
title: Laravel 4, the fast way
path: /posts/laravel-4-the-fast-way
author: Dwight Watson
date: 2013-07-22
tags: ["composer", "laravel", "media temple"]
---

I wrote earlier about how to get Laravel 4 up and running on Media Temple's (gs), which involved cloning the framework's Git repository, getting Composer installed and some slight trickery. However, if you've already got Composer on your machine and don't have any odd requirements, there's actually a really easy way to install a fresh copy of the framework.

`composer create-project laravel/laravel my-project`

That one command will create a `my-project` folder, install Laravel 4 and all it's Composer dependencies, as well as generate an encryption key and optimize the install. If you're a Composer guru who just wants to get a fresh app started this is a pretty handy trick.
