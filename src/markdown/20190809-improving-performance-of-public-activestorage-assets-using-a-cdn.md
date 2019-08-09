---
title: "Improving performance of public ActiveStorage assets using a CDN"
path: /posts/improving-performance-of-public-activestorage-assets-using-a-cdn
author: Dwight Watson
date: 2019-08-09
tags: ["rails", "activestorage", "imgix"]
---

I've written [previously about monkey-patching the ActiveStorage representations controller](https://www.neontsunami.com/posts/caching-variants-with-activestorage) in order to proxy content so that it could be cached by a CDN.

It works, but there are some issues: you're overriding Rails code, and your app will still take the brunt of the initial transformation requests. With large or abnormal uploads there's still additional load (and with it, performance decreases) and potential memory leaks can occur.

We've recently shifted to a new approach - using [Imgix](https://www.imgix.com) to transform and serve our public assets for us. The idea of outsourcing image transformations isn't new - options like [Cloudinary](https://cloudinary.com/) and [Cloudflare image resizing](https://www.cloudflare.com/website-optimization/#plan-features) exist, but Imgix is flexible in a way that makes it work well with ActiveStorage.

First - Imgix can plug straight into your S3 bucket (or other storage service) which means it can source content straight from where ActiveStorage places it. When it needs an original resource it can side-step your app and go straight to the source. Second, their [Rails integration library](https://github.com/imgix/imgix-rails#active-storage) is ready to handle ActiveStorage blobs out of the box. You pass it the blob's key and it will generate the URL, image or (responsive!) picture tag.

This gives you some great benefits:
* You can still use ActiveStorage for all your assets - and they'll all still go to the same place.
* You can still serve private assets through Rails to keep them secure.
* You can opt-in to serve public assets, resized, optimised and cached for your users.
* Finally, should Rails provide better functionality for serving public content in the future it's easy to fall-back to ActiveStorage as everything is still there.

The helper and transformations do change a little bit - as you now interact directly with Imgix's API - but they have plenty more options (including focusing on faces) and they're a cinch to use.

```rb
ix_image_url(user.avatar.key, auto: 'compress,format', fit: 'facearea', width: 300, height: 300)
```

There's really not much to it, but it's a powerful and affordable way to take that load off of your servers and serve the best possible images directly to your users.
