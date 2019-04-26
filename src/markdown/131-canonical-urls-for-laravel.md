---
title: "Canonical URLs for Laravel"
path: /posts/canonical-urls-for-laravel
author: Dwight Watson
date: 2017-07-17
tags: ["laravel"]
---

One thing I&#039;ve had to do with most Laravel apps is handle the redirect from `www.` to non-`www.` or vice-versa. Many people may choose to handle this in their web server stack (where it&#039;s likely to be faster) but I generally prefer to handle this in the app. It makes the app more portable (this logic isn&#039;t tied to a web server configuration) and it&#039;s more accesible to the developers.

However I noticed I was copy-pasting middleware over and then just changing the expected domain name. Because of this I decided to break out a new package - `watson/canonical` - a lightweight and easily configurable middleware that makes it easy to handle these sort of subdomain and HTTP/HTTPS redirects.

So if you need a painless way to ensure all your visitors are redirected to the HTTPS version of your site with a `www.` subdomain [take a look at `watson/canonical` now](https://github.com/dwightwatson/canonical).
