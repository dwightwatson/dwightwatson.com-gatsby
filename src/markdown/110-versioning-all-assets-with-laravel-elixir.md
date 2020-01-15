---
title: "Versioning all assets with Laravel Elixir"
path: /posts/versioning-all-assets-with-laravel-elixir
author: Dwight Watson
date: 2016-07-17
tags: ["elixir", "laravel"]
---

One Laravel application I work on has a number of different asset pipelines set up for scripts and stylesheets - we have the public site, a secured content management system and also a view that we fit inside a mobile application. We run all these assets through Elixir and then version them so we can cache them better in production.

Previously we explicitly told Elixir of all the assets we wanted it to version. It was a bit unwieldly.

```js
mix.version([
  'public/css/app.css',
  'public/js/app.js',

  'public/css/mobile/app.css',
  'public/js/mobile/app.js',

  'public/css/admin/app.css',
  'public/js/admin/app.js'
]);
```

However, turns out there's a better way. It's actually something [I've written about before, but in relation to versioning image assets](https://www.dwightwatson.com/posts/using-laravel-elixir-to-version-image-assets). Because we can use wildcards we can just tell Elixir to version our CSS/JS assets. We explicitly use `*.css` and `*.js` however so that the map files aren't also versioned.

```js
mix.version(['public/**/*.css', 'public/**/*.js']);
```
