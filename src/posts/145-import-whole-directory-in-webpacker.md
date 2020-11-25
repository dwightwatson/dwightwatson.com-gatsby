---
title: "Import whole directory in Webpack(er)"
path: /posts/import-whole-directory-in-webpacker
author: Dwight Watson
date: 2017-08-14
tags: ["ruby on rails", "webpacker"]
---

Like an amateur I’ve been importing all my assets one-by-one when using Webpacker to get them all listed in the app manifest. It’s annoying when adding or removing an image to then update the reference in `images/index.js`.

```js
import ‘./arrow-right.svg’;
import ‘./badge-maintenance.svg’;
// And so on.
```

Turns out, there’s a better way and you can reduce it all down to one single line of code. Use `require.context` and pass a regular expression to identify *which* files you want to import. Boom.

```js
require.context(‘./‘, true, /\.(svg|png)$/igm);
```
