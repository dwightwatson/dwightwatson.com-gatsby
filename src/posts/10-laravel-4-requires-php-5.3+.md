---
title: "Laravel 4 requires PHP 5.3+"
path: /posts/laravel-4-requires-php-5.3+
author: Dwight Watson
date: 2013-08-07
tags: ["laravel", "php"]
---

A quick little gotcha from this morning while trying to deploy a new Laravel 4 app:

    Warning: require(__DIR__/../bootstrap/autoload.php) [function.require]: failed to open stream: No such file or directory in /home/development/public_html/index.php on line 21

    Fatal error: require() [function.require]: Failed opening required '__DIR__/../bootstrap/autoload.php' (include_path='.:/usr/lib/php:/usr/local/lib/php') in /home/development/public_html/index.php on line 21

It's not immediately obvious, but the reason is because `__DIR__` is a [magic contstant](http://php.net/manual/en/language.constants.predefined.php) that is only added in PHP 5.3. I was accidently trying to deploy Laravel 4 on a PHP 5.2 server, where the [server requirements of Laravel 4](http://laravel.com/docs/installation#server-requirements) actually include PHP 5.3.7+.

It's probably also worth noting that at the time of this article, [PHP 5.3 is reaching it's end of life (EOL)](http://php.net/archive/2013.php#id2013-07-11-1). If you're provisioning new servers, make sure you hook it up with at least 5.4!
