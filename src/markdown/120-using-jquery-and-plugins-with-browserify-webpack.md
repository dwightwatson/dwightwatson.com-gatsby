---
title: "Using jQuery and plugins with Browserify/Webpack"
path: /posts/using-jquery-and-plugins-with-browserify-webpack
author: Dwight Watson
date: 2016-12-12
tags: ["javascript"]
---

One thing that caused me a bunch of issues when moving from concatenated scripts to a package bundler with ES6/ES2015 modules like Browserify and Webpack was getting jQuery to play nicely globally with things like Bootstrap and plugins like Selectize. Because of the way modules work it can be a real pain to get everything working again the way you&#039;d expect.

The way I ended up getting it working was to bootstrap jQuery it in&#039;s own file, a seperate module from my root app JavaScript file and then include it. Mind you, when I say &quot;bootstrap&quot; lowercase I&#039;m just referring to setting it up the way I need, not the Bootstrap framework. For example, here&#039;s the start of my `app.js` which pulls in my `bootstrap.js` file to setup jQuery as well as Selectize and some the Bootstrap dropdown plugin.

```javascript
import &#039;./bootstrap&#039;;
import &#039;selectize&#039;;
import &#039;node_modules/bootstrap-sass/assets/javascripts/bootstrap/dropdown&#039;;
```

Now, in my `bootstrap.js` file I set up jQuery to work globally as one would expect.

```javascript
import $ from &#039;jquery&#039;;
window.$ = window.jQuery = $;
```

To learn more about why jQuery is bootstrapped in it&#039;s own module, [read this issue thread on Rollup](https://github.com/rollup/rollup/issues/592#issuecomment-205783255). Doing it seperately makes it available globally (as well as the `$` shorthand) so that when you import other plugins like Selectize or Bootstrap components they also have access to jQuery.

