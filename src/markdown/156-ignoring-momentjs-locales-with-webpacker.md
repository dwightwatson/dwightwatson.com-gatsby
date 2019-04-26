---
title: "Ignoring Moment.js Locales with Webpacker"
path: /posts/ignoring-momentjs-locales-with-webpacker
author: Dwight Watson
date: 2018-01-07
tags: ["javascript", "ruby on rails", "webpacker"]
---

There’s a slight pain point when loading Moment.js through Webpack in that it [pulls in every single locale available, regardless of whether you use it or not](https://github.com/moment/moment/issues/2517) which adds to the file size substantially. It’s something that’s likely to be fixed in a new major release of Moment or it’s follow up [Luxon](https://github.com/moment/luxon) but luckily it’s pretty easy to resolve now.

In your `config/webpack/environment.js` file you can instruct Webpacker to use an ignore plugin which will ignore loading any locale files in the context of Moment.

```js
const { environment } = require(&#039;@rails/webpacker&#039;)
const webpack = require(&#039;webpack&#039;)

environment.plugins.insert(
  &#039;IgnorePlugin&#039;,
	new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
)

module.exports = environment
```
