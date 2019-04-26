---
title: "Google Analytics with Turbolinks 5"
path: /posts/google-analytics-with-turbolinks-5
author: Dwight Watson
date: 2017-07-11
tags: []
---

The newest version of Turbolinks is really easy to use, especially now that it's framework agnostic. Only a couple of lines of setup and it's good to go - you get the benefit of a site that feels faster and native app wrappers to drop your site into. However, it doesn't quite work out of the box with Google Analytics.

All you need to do though is hook into the `turbolinks:load` event which is fired whenever a new page is loaded through Turbolinks. You can then confirm that Google Analytics is on the page (checking for `ga`) and then firing off the new pageview.

```js
document.addEventListener('turbolinks:load', event => {
  if (typeof ga === 'function') {
    ga('set', 'location', event.data.url);
    ga('send', 'pageview');
  }
});
```
