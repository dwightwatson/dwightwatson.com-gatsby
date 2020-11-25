---
title: "Autologin package for Laravel 4"
path: /posts/autologin-package-for-laravel-4
author: Dwight Watson
date: 2014-03-02
tags: ["laravel", "php"]
---

Maintaining high engagement on your sites with authentication can be difficult, especially if you have short sessions or users that use your site from multiple devices. One of the ways we attempt to alleviate this problem is using links in our application emails that will automatically log the user in. This is achieved through using time-limited tokens in links that will forward the user where they need to go. You should first consider the security implications of using such a system, for example if you handle confidential user information.

My Composer package, [`watson\autologin`](https://github.com/dwightwatson/autologin), allows you to easily create and utilise autologin links in your Laravel application.

Once you've installed the package correctly (see the GitHub repository for setting up the service provider and facade), you're able to generate URLs by passing in a `User` object:

	// User class implements UserInterface
	$user = User::find(1);

    // Just login a user
    $link = Autologin::user($user);

	// Login and go to /profile
	$link = Autologin::to($user, '/profile');

	// Login and go to route named posts.index
	$link = Autologin::route($user, 'posts.index');

I'm going to be adding more features to the package over the coming weeks as we monitor its use in production and tweak it, but please feel free to make any requests or point out bugs using issues on GitHub.
