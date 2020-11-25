---
title: "Allow tree-shaking with Lodash"
path: /posts/allow-treeshaking-with-lodash
author: Dwight Watson
date: 2018-01-05
tags: ["javascript", "webpacker"]
---

Despite pulling in just one method from [Lodash](https://lodash.com/) I noticed that when I ran my bundle through [Webpack Visualizer](http://chrisbateman.github.io/webpack-visualizer/) I was still importing the whole library. I was under the impression that Webpack’s tree-shaking would have solved this problem for me, but apparently not.

Turns out you’ll need to switch to the module version of Lodash and instead use `lodash-es`. It appears as though it’s a first-party version of the library and automatically generated for each tagged release, so it’s easy to use.

```js
// Ends up pulling in everything.
import { truncate } from ‘lodash’;

// Just pull in the module we're interested in.
import truncate from 'lodash-es/truncate';
```

That simple change should save you from pulling in the entirety of Lodash and instead only grabs what you use, meaning smaller bundle sizes for happier customers.
