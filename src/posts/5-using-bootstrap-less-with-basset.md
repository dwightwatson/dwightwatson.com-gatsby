---
title: "Using Bootstrap LESS with Basset"
path: /posts/using-bootstrap-less-with-basset
author: Dwight Watson
date: 2013-07-24
tags: ["bootstrap", "laravel", "less"]
---

It's not the best documented feature, the awesome asset management package called [Basset](http://jasonlewis.me/code/basset) actually provides a number of ways to compile LESS files, as used by the [Bootstrap](http://getbootstrap.com) front-end framework. You can either use the proper Node.js [LESS](http://lesscss.org/) compiler, or use [lessphp](https://github.com/leafo/lessphp), a LESS compiler written entirely in PHP.The problem is that before you can use either of these implementations of LESS you actually need to do a little bit of configuration.

**Node.js LESS**

By default, Basset will attempt to compile LESS using the Node.js implementation. Unfortunately, this doesn't come with Basset, and it also means you're going to need to install [Node.js](http://nodejs.org/) on your server (or development environment if you want to pre-compile your assets). After you've installed Node.js, you can use the Node package manager (NPM) to install less. In the root of your Laravel project, run:

`npm install less`

Basset will now be able to use the Node.js compiler to process Bootstrap LESS as well as your own stylesheets!

**lessphp**

Personally, however, I prefer to keep everything in PHP. I don't want to have to deal with Node.js on my servers, and while I could just pre-compile my assets before pushing them to production I'd rather just not have to deal with it when I'm working on PHP projects. Luckily, there is another way, by using  a PHP LESS compiler.

First, you're going to have to have to add lessphp to your project. In your `composer.json` file, add it to the `require` array:

	"require": {
        ...
		"leafo/lessphp": "0.3.9",
		...
	},

Now, run `composer update` to get the extra dependencies.

Once lessphp is installed, you need to tell Basset to use it instead of the Node.js implementation. If you haven't already published the Basset configration, run `php artisan config:publish jasonlewis/basset`. Next, open the config file located in `app/config/packages/jasonlewis/basset/config.php` and find where the LESS filter is defined:

            /*
            |--------------------------------------------------------------------------
            | Less Filter Alias
            |--------------------------------------------------------------------------
            |
            | Filter is applied only when asset has a ".less" extension and it will
            | attempt to find missing constructor arguments.
            |
            */

            'Less' => array('LessFilter', function($filter)
            {
                $filter->whenAssetIs('.*\.less')->findMissingConstructorArgs();
            }),

Simply update `LessFilter` to `LessphpFilter` to use lessphp to compile Bootstrap, and you're good to go!

A quick caveat to lessphp, though - while this should work fine for Bootstrap 2, you might come across some issues if you're working with the development version of Bootstrap 3. Bootstrap 3 uses a new version of LESS, version 1.4.0, which introduces some breaking changes. At the time of this article, lessphp does not support LESS 1.4.0 and will fail to compile Bootstrap 3. Because of this, if you want to use Bootstrap 3 before lessphp is updated to support the changes you will have to either install the Node.js compiler or compile the stylesheets manually.


