---
title: "Toggle Homestead and production bookmarklet"
path: /posts/toggle-homestead-and-production-bookmarklet
author: Dwight Watson
date: 2015-01-19
tags: ["homestead", "laravel"]
---

I often find myself switching between my Homestead and production environments - especially when Sentry shows an error popping up on production that I want to replicate locally. I got tired of editing the URL to get to the local environment (change from HTTPS to HTTP, swap `.com.au` for `.app` and add port 8000) so I developed a little JavaScript bookmarklet to toggle between the two environments. It works under the assumption your domain name is simply the `.com` variant of your Homestead alias, but feel free to adjust as necessary.

    javascript:(function() {
        var host = window.location.hostname.substring(0, window.location.hostname.indexOf('.'));
        var newHost = window.location.port == "8000" ? host + '.com' : host + '.app:8000';
        window.location.href = 'http://' + newHost + window.location.pathname;
    }());

Tested and working on Chrome, and [also available here as a Gist](https://gist.github.com/dwightwatson/d6861a4457999b32ce74).
