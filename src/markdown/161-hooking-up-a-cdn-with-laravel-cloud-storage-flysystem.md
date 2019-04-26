---
title: "Hooking up a CDN with Laravel cloud storage (Flysystem)"
path: /posts/hooking-up-a-cdn-with-laravel-cloud-storage-flysystem
author: Dwight Watson
date: 2018-02-24
tags: ["aws", "laravel"]
---

I&#039;ve recently finished converting all our legacy S3 storage code into leveraging Laravel&#039;s out-of-the-box Flysystem integration. I was able to replace a tonne of S3 specific code with some really small service classes that generate thumbnails and so on. While doing this I learnt a few new cool things about this integration and also how to configure it with a CDN.

Previously I had a heap of methods for building the links to files I stored on S3. This is so much easier when using the built-in helpers.

```php
// Generate the full URL to the file on S3 (or whatever driver you&#039;re using).
Storage::cloud()-&gt;url(&#039;file.jpg&#039;);
```

This is great and all but it&#039;s generating a link directly to my bucket - I&#039;m putting more load on that bucket and not leveraging any mechanism to improve performance. Luckily that&#039;s easy by adding a `url` key to your driver configuration and providing it a hostname to use for URL generation. 

In my example below I&#039;m using an environment variable (so I would set `CDN_URL` to `https://cdn.neontsunami.com`) which is great because you can leave it empty on your staging environments. When the `url` key is empty Laravel will simply generate a link directly to the bucket just as before, however when it&#039;s present it will use your new host. I have a CloudFront CDN set up that points directly to the bucket so it&#039;s able to cache my assets.

```php
&#039;s3&#039; =&gt; [
    &#039;driver&#039; =&gt; &#039;s3&#039;,
    &#039;key&#039;    =&gt; env(&#039;AWS_ACCESS_KEY_ID&#039;),
    &#039;secret&#039; =&gt; env(&#039;AWS_SECRET_ACCESS_KEY&#039;),
    &#039;region&#039; =&gt; env(&#039;AWS_REGION&#039;, &#039;ap-southeast-2&#039;),
    &#039;bucket&#039; =&gt; env(&#039;AWS_S3_BUCKET&#039;),
    &#039;url&#039; =&gt; env(&#039;CDN_URL&#039;),
],
```

It gets better though - sometimes you want to generate links to private files in your buckets too. I was worried that Laravel would still use the CDN host which could lead to some unwanted caching of private resources, but luckily it ignores that URL when generating temporary links.

```
// Returns a URL direct to your bucket, not using the CDN host
Storage::cloud()-&gt;temporaryUrl(
    &#039;file.jpg&#039;, now()-&gt;addMinutes(5)
);
```
