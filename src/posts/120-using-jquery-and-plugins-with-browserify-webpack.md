---
title: "Using jQuery and plugins with Browserify/Webpack"
path: /posts/using-jquery-and-plugins-with-browserify-webpack
author: Dwight Watson
date: 2016-12-12
tags: ["javascript"]
---

One thing that caused me a bunch of issues when moving from concatenated scripts to a package bundler with ES6/ES2015 modules like Browserify and Webpack was getting jQuery to play nicely globally with things like Bootstrap and plugins like Selectize. Because of the way modules work it can be a real pain to get everything working again the way you'd expect.

The way I ended up getting it working was to bootstrap jQuery it in's own file, a seperate module from my root app JavaScript file and then include it. Mind you, when I say "bootstrap" lowercase I'm just referring to setting it up the way I need, not the Bootstrap framework. For example, here's the start of my `app.js` which pulls in my `bootstrap.js` file to setup jQuery as well as Selectize and some the Bootstrap dropdown plugin.

```javascript
import './bootstrap';
import 'selectize';
import 'node_modules/bootstrap-sass/assets/javascripts/bootstrap/dropdown';
```

Now, in my `bootstrap.js` file I set up jQuery to work globally as one would expect.

```javascript
import $ from 'jquery';
window.$ = window.jQuery = $;
```

To learn more about why jQuery is bootstrapped in it's own module, [read this issue thread on Rollup](https://github.com/rollup/rollup/issues/592#issuecomment-205783255). Doing it seperately makes it available globally (as well as the `$` shorthand) so that when you import other plugins like Selectize or Bootstrap components they also have access to jQuery.

