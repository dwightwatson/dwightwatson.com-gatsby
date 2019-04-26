---
title: "Bootstrap 3 now compiles in lessphp"
path: /posts/bootstrap-3-now-compiles-in-lessphp
author: Dwight Watson
date: 2013-08-15
tags: ["bootstrap", "laravel"]
---

A huge shout-out to [leafo](https://github.com/leafo) who has been updating [lessphp](https://github.com/leafo/lessphp) to support the breaking changes of [LESS v1.4](http://lesscss.org). [Bootstrap 3](http://getbootstrap.com) has been making use of the new syntax, so I&#039;ve had to switch to the [Node.js](http://nodejs.org/) LESS compiler for development with the new framework. However, it now works a charm with lessphp, so there&#039;s no more need to have packages for other languages hanging around.

If you want to use lessphp to compile your LESS stylesheets when using [Basset](https://github.com/jasonlewis/basset), read my older post on [using Bootstrap with Basset](http://www.neontsunami.com/post/using-bootstrap-less-with-basset).
