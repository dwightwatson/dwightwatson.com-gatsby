---
title: "Processing ERB files with Rails Webpacker"
path: /posts/processing-erb-files-with-rails-webpacker
author: Dwight Watson
date: 2017-07-20
tags: ["ruby on rails"]
---

When using Webpacker you may want to interpolate some values into your assets. For example, API keys are best to come from the deployment environment rather than being hard-coded into your assets. With Webpacker this is really easy, you can just append `.erb` to your scripts and import it.

First, import the script that requires processing including the `.erb` suffix.

```js
import './api.js.erb';
```

Then just include your embedded Ruby as you would usually.

```js
export default new ApiClient({
  apiKey: '<%= ENV['API_CLIENT_KEY'] %>'
});
```
