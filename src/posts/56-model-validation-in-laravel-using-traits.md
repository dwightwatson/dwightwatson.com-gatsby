---
title: "Model validation in Laravel using traits"
path: /posts/model-validation-in-laravel-using-traits
author: Dwight Watson
date: 2014-06-07
tags: ["laravel", "php"]
---

I've just released a beta version of my new package, [watson/validating](https://github.com/dwightwatson/validating), a trait for Laravel 4.2+ which allows you to automatically run your models through validation before they are saved. If the model fails its validation then it will not save. Though I was hoping this would be included in the framework by default, it seems that model validation is [not being included in Laravel by default](https://github.com/laravel/framework/issues/3751) at this time.

This package takes into account various discussions I've read on the matter - some people want the ability to have multiple rulesets for different events, and I've provided that functionality. There is also the ability to force save a model without undergoing validation, as well as adjusting the rules on the fly. Finally, the package also provides the ability to automatically inject a model's ID into the rules if you use the `unique` rule so that it won't save when you are updating an existing record.

I'm still working on perfecting this package, refining functionality and writing more tests for edge cases as well as testing it in an actual Laravel application. Please provide any feedback or requests and I'll be happy to take them into consideration.

Other then that, head to the [GitHub](https://github.com/dwightwatson/validating) or [Packagist](https://packagist.org/packages/watson/validating) page now and give it a run!
