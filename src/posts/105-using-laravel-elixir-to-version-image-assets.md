---
title: "Using Laravel Elixir to version image assets"
path: /posts/using-laravel-elixir-to-version-image-assets
author: Dwight Watson
date: 2015-12-31
tags: ["elixir", "laravel"]
---

I've not seen this documented, but you can easily use Laravel Elixir to version not just your stylesheets and scripts but also any images you have in your application. This means you don't have to go cache-busting your images manually when you push out an updated image.

You can start by placing your images into a `resources/images` directory, which keeps them right alongside your other assets. Then you simply need to instruct your `Gulpfile` to copy the images to the `public` directory during compilation and then version them.

    mix.copy('resources/images', 'public/images')
        .version('public/images');

You don't *need* to copy your images from `resources` if you don't want to - it's fine to leave them in the `public` directory and just version them from there, but I prefer to have my image location consistent with the other assets.

If you now look at your `public/build/rev-manifest.json` file you'll see that all your image assets have been versioned as well. This means you can now use the `elixir()` function to link to cached images. For example, an image that would have been at `public/logo.png` you can use as follows.

    <img src="{{ elixir('public/logo.png') }}" title="Logo">
