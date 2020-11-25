---
title: "Using Laravel Mix on Heroku"
path: /posts/using-laravel-mix-on-heroku
author: Dwight Watson
date: 2017-02-28
tags: ["heroku", "javascript", "mix"]
---

Setting up Laravel Mix on Heroku is very similar to [how you'd set it up with Elixir](https://www.dwightwatson.com/posts/using-laravel-and-laravel-elixir-on-heroku). Because Laravel puts your front-end dependencies in `devDependencies` instead you just need to tweak the default configuration.

First, set `YARN_PRODUCTION` to `false` using the following command. This tells Heroku to install the `devDependencies` in your `package.json`, but leaves `NODE_ENV` as production.

```sh
$ heroku config:set YARN_PRODUCTION=false
```

Next, set the engines in your `package.json`. Make sure you have `yarn` at least `0.19.1` so that it respects the `YARN_PRODUCTION` environment variable.

Also add the `postinstall` key to `scripts` so that Heroku will compile your assets as you expect after everything has been installed.

```json
{
    "engines": {
        "node": "7.6.0",
        "yarn": "0.21.3"
    },
    "scripts": {
        //
        "postinstall": "npm run production"
    },
    "devDependencies": {
        //
        "laravel-mix": "^0.8.1"
    }
}
```
