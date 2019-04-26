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
  &#039;public/css/app.css&#039;,
  &#039;public/js/app.js&#039;,

  &#039;public/css/mobile/app.css&#039;,
  &#039;public/js/mobile/app.js&#039;,

  &#039;public/css/admin/app.css&#039;,
  &#039;public/js/admin/app.js&#039;
]);
```

However, turns out there&#039;s a better way. It&#039;s actually something [I&#039;ve written about before, but in relation to versioning image assets](https://www.neontsunami.com/posts/using-laravel-elixir-to-version-image-assets). Because we can use wildcards we can just tell Elixir to version our CSS/JS assets. We explicitly use `*.css` and `*.js` however so that the map files aren&#039;t also versioned.

```js
mix.version([&#039;public/**/*.css&#039;, &#039;public/**/*.js&#039;]);
```
