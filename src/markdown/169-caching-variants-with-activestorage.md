---
title: "Caching variants with ActiveStorage"
path: /posts/caching-variants-with-activestorage
author: Dwight Watson
date: 2018-06-07
tags: ["activestorage", "ruby on rails"]
---

ActiveStorage is new in Rails 5.2 and it provides an integrated way to handle file uploads. It can store files on a cloud provider of your choice and also generate links to access them when required, in addition to identifying metadata like image sizes or file formats.

Variants (or representations) are another powerful feature or ActiveStorage, whereby you can generate on-the-fly thumbnails of images, videos or documents. They&#039;re perfect for when you want to display resized images to your users rather than load in the original full-size copy.

However there is one slight pain point with how these variant work. Because ActiveStorage uses private storage on the cloud, you can&#039;t just link directly to the asset (especially as the variant won&#039;t have been generated initially). Instead ActiveStorage generates a link back through your app.

When your app processes an ActiveStorage link it first checks to see if the variant has already been created - if not, it will first generate it. Then it will perform a temporary redirect to the cloud provider with an expiring link for 5 minutes. This means for every request ActiveStorage has to reach out to the cloud and generate a new link.

This is problematic for a number of reasons. First, because it&#039;s slow: checking to see if the variant exists, creating it and finally generating a link. Second, because it returns a redirect it makes it hard to cache. The Cloudflare and CloudFront CDNs won&#039;t cache that redirect, so every time you want to display that asset it has to go back through your app.

Instead it would be great if the app could instead just *return* the asset as if it had been loaded directly. This would enable the CDN to cache the resource without it expiring and relieve your server of the future requests to it. The trade-off does mean that the initial hit by the CDN will be a slower request but that following requests will be lightning fast.

To implement this you can simply monkey-patch `ActiveStorage::RepresentationsController#show`. The code below is very similar to the one that comes out of the box, but streams the content of the variant back to the client instead of redirecting it to an expiring link.

```rb
# frozen_string_literal: true

module ActiveStorage
  class RepresentationsController &lt; BaseController
    include ActiveStorage::SetBlob

    def show
      expires_in 1.year, public: true
      variant = @blob.representation(params[:variation_key]).processed
      send_data @blob.service.download(variant.key),
                type: @blob.content_type || DEFAULT_SEND_FILE_TYPE,
                disposition: &#039;inline&#039;
    end
  end
end
```

There are a couple of things to note about this approach. First is that it exposes permanent access to your representations. If you have content that you want to exercise greater control over then you may want to perform some authorisation on the blob in the controller before sending it back, or just forgo this method altogether.

I think it&#039;s also worth noting that this only applies to the variants - not the original files themselves. We still use the redirect to the expiring URL to access original files to exert greater control over access.
