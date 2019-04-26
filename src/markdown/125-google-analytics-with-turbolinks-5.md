---
title: "Google Analytics with Turbolinks 5"
path: /posts/google-analytics-with-turbolinks-5
author: Dwight Watson
date: 2017-07-11
tags: []
---

The newest version of Turbolinks is really easy to use, especially now that it&#039;s framework agnostic. Only a couple of lines of setup and it&#039;s good to go - you get the benefit of a site that feels faster and native app wrappers to drop your site into. However, it doesn&#039;t quite work out of the box with Google Analytics.

All you need to do though is hook into the `turbolinks:load` event which is fired whenever a new page is loaded through Turbolinks. You can then confirm that Google Analytics is on the page (checking for `ga`) and then firing off the new pageview.

```js
document.addEventListener(&#039;turbolinks:load&#039;, event =&gt; {
  if (typeof ga === &#039;function&#039;) {
    ga(&#039;set&#039;, &#039;location&#039;, event.data.url);
    ga(&#039;send&#039;, &#039;pageview&#039;);
  }
});
```
