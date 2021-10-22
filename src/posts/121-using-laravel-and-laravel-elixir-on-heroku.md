---
title: "Using Laravel (and Laravel Elixir) on Heroku"
path: /posts/using-laravel-and-laravel-elixir-on-heroku
author: Dwight Watson
date: 2016-12-13
tags: ["laravel", "php"]
---

I've just started playing with Heroku for some of my Laravel projects as they support PHP 7, and it seemed like Laravel was almost ready to run out of the box. In fact, there's a [great get started guide for using Laravel on Heroku](https://devcenter.heroku.com/articles/getting-started-with-laravel) and it couldn't be much simpler. However, I do have some tweaks to

Heroku recommend changing your logger in `config/app.php` to `errorlog` so that the app errors are made available through the command line tools. Instead of changing the file you can just set the `APP_LOG` environment variable and it will work the same.

```shell
heroku config:set APP_LOG=errorlog
```

To get your assets running you'll need to make a couple of changes to get Node installed and gulp run after it's all good to go. First off, add the `heroku/nodejs` buildpack (in addition to the `heroku/php` buildpack you have already).

```shell
heroku buildpacks:add heroku/nodejs
```

This means your Node dependencies (in your `package.json` file) will now be installed on deployment - with one caveat. It won't install any of your `devDependencies` which is where Laravel puts it's front-end dependencies (and it's likey you have too). You can either make all your dependencies just `dependencies` and Heroku will install them, otherwise you can set another environment variable to tell Heroku to install all the dependencies - including development dependencies.

```shell
heroku config:set NPM_CONFIG_PRODUCTION=false
```

Finally we just need to tell Heroku to run Gulp after a deployment when the dependencies have been installed. This is easy by adding a `postinstall` script in your `package.json`. This is what it looks like with the other standard Laravel scripts (you might want to add them if you don't already have them).

```json
  "scripts": {
    "prod": "gulp --production",
    "dev": "gulp watch",
    "postinstall": "npm run prod"
  },
```

The `prod` and `dev` scripts just run Gulp for you with an alias (for example, `npm run dev`) and are now there by default in new releases of Laravel. Heroku will run `postinstall` automatically and build your assets for production.

Easy enough - you'll now have logging and asset building working with Laravel on Heroku.
