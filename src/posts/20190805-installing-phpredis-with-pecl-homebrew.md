---
title: "Installing PHPRedis with PECL/Homebrew"
path: /posts/installing-phpredis-with-pecl-homebrew
author: Dwight Watson
date: 2019-08-05
tags: ["php", "pecl", "redis"]
---

I ran into trouble installing the PHP Redis extension installed on my Mac. Homebrew no longer installs PHP extensions and instead suggests you use PECL. However, it does not appear to work straight out of the box.

```shell
pecl install redis
```

Running this command looks like it is going to work but fails instead.

```
Warning: mkdir(): File exists in System.php on line 294

Warning: mkdir(): File exists in ↵
/usr/local/Cellar/php/7.3.7/share/php/pear/System.php on line 294
ERROR: failed to mkdir /usr/local/Cellar/php/7.3.7/pecl/2010730
```

I came across a couple of [GitHub issues](https://github.com/phpredis/phpredis/issues/1341), and [this blog post](https://javorszky.co.uk/2018/05/03/getting-xdebug-working-on-php-7-2-and-homebrew/) that described the issue occurring with other extensions.

First, remove the `pecl` symlink that exists in your Homebrew PHP installation.

```shell
rm /usr/local/Cellar/php/7.3.7/pecl
```

If preferred you can back this file up instead.

Next, adjust your PHP configuration contained in `/usr/local/etc/php/7.3`. Remove the line `extension="redis.so"` from the top of `php.ini`.

Finally, create `/usr/local/etc/php/7.3/conf.d/ext-redis.ini` and fill it with this content - adjusting in case the extension was installed elsewhere.

```
[redis]
extension="/usr/local/Cellar/php/7.3.7/pecl/20180731/redis.so"
```

With that you'll be able to use PHPRedis with your local PHP installation (pending a restart if you have it running). This should drastically improve the performance of your interaction with Redis, and is easy to opt-in as the default Redis driver for Laravel.
