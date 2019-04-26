---
title: "Google Sitemaps with Laravel 4"
path: /posts/google-sitemaps-with-laravel-4
author: Dwight Watson
date: 2014-03-13
tags: ["laravel", "php"]
---

Another day, another package. Today I want to talk about [`watson/sitemap`](https://github.com/dwightwatson/sitemap). It&#039;s based upon the work of [Roumen Damianoff](https://github.com/RoumenDamianoff/laravel-sitemap) but was written from scratch with support for the handling of multiple sitemaps (sitemap indexes) and more flexible use of tags. I&#039;ve also added tests to ensure everything works as expected. Using this in production for a couple of sites now and will probably add some more features/polish to this after we&#039;ve analysed how we can improve our sitemaps for different search engines (at the moment it only supports the Google format of sitemaps).

Check it out on [GitHub](https://github.com/dwightwatson/sitemap) and let me know what you think, very much open to suggestions and improvements!
