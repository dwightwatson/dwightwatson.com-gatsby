---
title: "Direct image uploads to S3 with ActiveStorage"
path: /posts/direct-image-uploads-to-s3-with-activestorage
author: Dwight Watson
date: 2017-08-18
tags: ["activestorage", "ruby on rails"]
---

I’ve been using the edge version of Rails on a new project so we can leverage ActiveStorage and the direct image uploading functionality it provides in the browser. Unfortunately I ran into a slight CORS issue with a brand new S3 bucket where the origin host was not allowed access to upload.

```
XMLHttpRequest cannot load &lt;URL&gt;. Response to preflight request doesn&#039;t pass access control check: No &#039;Access-Control-Allow-Origin&#039; header is present on the requested resource. Origin &#039;&lt;Host&gt;&#039; is therefore not allowed access. The response had HTTP status code 403.
```

The configuration for the bucket is pretty simple - just head to the CORS settings for your bucket. You’ll need to enable the `PUT` method, and you have the option to allow all origins or just the host of your app. You can use `*` to open up for the world, or enter only the hostname you need.

```
&lt;CORSRule&gt;
    &lt;AllowedOrigin&gt;https://myhost.com&lt;/AllowedOrigin&gt;
    &lt;AllowedMethod&gt;PUT&lt;/AllowedMethod&gt;
    &lt;AllowedHeader&gt;*&lt;/AllowedHeader&gt;
&lt;/CORSRule&gt;
```

The following code is a full example that shows the default code provided by S3 - a rule that allows all origins to access content with a `GET` request, along with the newly added rule that will allow Rails to upload with a `PUT` request.

```
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;CORSConfiguration xmlns=&quot;http://s3.amazonaws.com/doc/2006-03-01/&quot;&gt;
    &lt;CORSRule&gt;
        &lt;AllowedOrigin&gt;*&lt;/AllowedOrigin&gt;
        &lt;AllowedMethod&gt;GET&lt;/AllowedMethod&gt;
        &lt;MaxAgeSeconds&gt;3000&lt;/MaxAgeSeconds&gt;
        &lt;AllowedHeader&gt;Authorization&lt;/AllowedHeader&gt;
    &lt;/CORSRule&gt;
    &lt;CORSRule&gt;
        &lt;AllowedOrigin&gt;*&lt;/AllowedOrigin&gt;
        &lt;AllowedMethod&gt;PUT&lt;/AllowedMethod&gt;
        &lt;AllowedHeader&gt;*&lt;/AllowedHeader&gt;
    &lt;/CORSRule&gt;
&lt;/CORSConfiguration&gt;
```
