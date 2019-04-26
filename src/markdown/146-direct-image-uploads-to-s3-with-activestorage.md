---
title: "Direct image uploads to S3 with ActiveStorage"
path: /posts/direct-image-uploads-to-s3-with-activestorage
author: Dwight Watson
date: 2017-08-18
tags: ["activestorage", "ruby on rails"]
---

I’ve been using the edge version of Rails on a new project so we can leverage ActiveStorage and the direct image uploading functionality it provides in the browser. Unfortunately I ran into a slight CORS issue with a brand new S3 bucket where the origin host was not allowed access to upload.

```
XMLHttpRequest cannot load <URL>. Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin '<Host>' is therefore not allowed access. The response had HTTP status code 403.
```

The configuration for the bucket is pretty simple - just head to the CORS settings for your bucket. You’ll need to enable the `PUT` method, and you have the option to allow all origins or just the host of your app. You can use `*` to open up for the world, or enter only the hostname you need.

```
<CORSRule>
    <AllowedOrigin>https://myhost.com</AllowedOrigin>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
```

The following code is a full example that shows the default code provided by S3 - a rule that allows all origins to access content with a `GET` request, along with the newly added rule that will allow Rails to upload with a `PUT` request.

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>Authorization</AllowedHeader>
    </CORSRule>
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```
