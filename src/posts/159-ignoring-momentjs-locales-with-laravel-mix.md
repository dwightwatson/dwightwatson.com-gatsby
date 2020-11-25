---
title: "Ignoring Moment.js Locales with Laravel Mix"
path: /posts/ignoring-momentjs-locales-with-laravel-mix
author: Dwight Watson
date: 2018-01-12
tags: ["javascript", "laravel", "mix"]
---

Following up from an earlier post that described filtering out Moment.js locales with Rails Webpacker, here’s how you can achieve the same thing using Laravel Mix. It’s worth dong for the same reason - filtering out a heap of locales you’re unlikely to use - and it works just the same.

Here’s how you configure it in your `webpack.mix.js` file:

```js
const webpack = require(‘webpack’);
const { mix }  = require(‘caravel-mix’);

mix.webpackConfig({
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
});

// Configure your assets with Mix as per usual...
```
