---
title: "Configuring Webpack externals with Webpacker"
path: /posts/configuring-webpack-externals-with-webpacker
author: Dwight Watson
date: 2018-01-06
tags: ["javascript", "ruby on rails", "webpacker"]
---

Webpack provides a feature known as [externals](https://webpack.js.org/configuration/externals/) which allows you to instruct it not to bundle any assets that you will provide externally at runtime. It’s useful if you’re going to serve assets from another location or don’t want an asset to be bundled up.

It’s easy enough to hook up as well, but here’s how you would go about doing it with Rails Webpacker in the `environment.js` file.  You simply piggy-back off the default configuration provided by Webpacker and export it out as per usual.

```js
const { environment } = require(‘@rails/webpacker’)

environment.config.externals = {
  jquery = 'jQuery'
}

module.exports = environment
```

The key in the `extenals` object is the name of the module you’d be importing in your app and the value will be the name of that module as it’s provided at runtime. In the above example it could instead be `$` if you so desired.
