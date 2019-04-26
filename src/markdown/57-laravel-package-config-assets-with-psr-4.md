---
title: "Laravel package config/assets with PSR-4"
path: /posts/laravel-package-config-assets-with-psr-4
author: Dwight Watson
date: 2014-07-02
tags: ["laravel", "php"]
---

Came across an issue today when trying to upgrade my [bootstrap-form](github.com/dwightwatson/bootstrap-form) package to use PSR-4. With the new autoloader Laravel finds it difficult to find the configuration files and assets that your package might require. By default, Laravel looks two directories above where the source code is, and with PSR-4 they are actually co-located. You can read a little bit more about it, and the fact that nothing is going to be done about at it at present, [here in laravel/framework issue #3505](https://github.com/laravel/framework/issues/3505).

To fix this up, simply adjust the `boot()` method in your service provider, providing the 3rd parameter.

```php
/**
 * Boot the service provider.
 * 
 * @return void
 */
public function boot()
{
	$this-&gt;package(&#039;watson/bootstrap-form&#039;, null, __DIR__);
}
```

You should now find that everything goes back to working how you would expect!
