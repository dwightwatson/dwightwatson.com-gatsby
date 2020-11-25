---
title: "Laravel 4: PHP Fatal error: Call to undefined method Illuminate\\Foundation\\Application::registerCoreContainerAliases()"
path: /posts/laravel-4-php-fatal-error-call-to-undefined-method-illuminate-foundation-application-registercorecontaineraliases()
author: Dwight Watson
date: 2014-01-17
tags: ["laravel", "php"]
---

Just came across an issue when updating Laravel on our production website, where suddenly every page on the app would simply return:

    PHP Fatal error: Call to undefined method Illuminate\Foundation\Application::registerCoreContainerAliases()

Was a bit of worry seeing it straight in production (not sure how we missed it on staging), but the easy fix is just to remove `bootstrap/compiled.php`.
