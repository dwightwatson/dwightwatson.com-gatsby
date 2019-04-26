---
title: "Using Laravel (and Laravel Elixir) on Heroku"
path: /posts/using-laravel-and-laravel-elixir-on-heroku
author: Dwight Watson
date: 2016-12-13
tags: ["laravel", "php"]
---

I&#039;ve just started playing with Heroku for some of my Laravel projects as they support PHP 7, and it seemed like Laravel was almost ready to run out of the box. In fact, there&#039;s a [great get started guide for using Laravel on Heroku](https://devcenter.heroku.com/articles/getting-started-with-laravel) and it couldn&#039;t be much simpler. However, I do have some tweaks to 

Heroku recommend changing your logger in `config/app.php` to `errorlog` so that the app errors are made available through the command line tools. Instead of changing the file you can just set the `APP_LOG` environment variable and it will work the same.

```sh
heroku config:set APP_LOG=errorlog
```

To get your assets running you&#039;ll need to make a couple of changes to get Node installed and gulp run after it&#039;s all good to go. First off, add the `heroku/nodejs` buildpack (in addition to the `heroku/php` buildpack you have already).

```sh
heroku buildpacks:add heroku/nodejs
```

This means your Node dependencies (in your `package.json` file) will now be installed on deployment - with one caveat. It won&#039;t install any of your `devDependencies` which is where Laravel puts it&#039;s front-end dependencies (and it&#039;s likey you have too). You can either make all your dependencies just `dependencies` and Heroku will install them, otherwise you can set another environment variable to tell Heroku to install all the dependencies - including development dependencies.

```sh
heroku config:set NPM_CONFIG_PRODUCTION=false
```

Finally we just need to tell Heroku to run Gulp after a deployment when the dependencies have been installed. This is easy by adding a `postinstall` script in your `package.json`. This is what it looks like with the other standard Laravel scripts (you might want to add them if you don&#039;t already have them).

```json
  &quot;scripts&quot;: {
    &quot;prod&quot;: &quot;gulp --production&quot;,
    &quot;dev&quot;: &quot;gulp watch&quot;,
    &quot;postinstall&quot;: &quot;npm run prod&quot;
  },
```

The `prod` and `dev` scripts just run Gulp for you with an alias (for example, `npm run dev`) and are now there by default in new releases of Laravel. Heroku will run `postinstall` automatically and build your assets for production.

Easy enough - you&#039;ll now have logging and asset building working with Laravel on Heroku.
