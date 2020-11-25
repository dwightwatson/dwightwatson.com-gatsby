---
title: "Rails UJS outside the asset pipeline/with modules"
path: /posts/rails-ujs-outside-the-asset-pipeline-with-modules
author: Dwight Watson
date: 2017-07-18
tags: ["javascript", "ruby on rails"]
---

With Rails 5.1 the team replaced the great `jquery-ujs` library with `rails-ujs` - the same feature set implemented without jQuery and rather using standalone Javascript. It's a welcome change, removing a dependency that most people are probably happy to get rid of by now.

However, if you try and load it up outside the Rails asset pipeline it's not as simple as `//= require rails-ujs`. When you use the module version of it you'll need to first import it, then start it. So, run `yarn install rails-ujs` to add the dependency and then boot it up in your app.

```js
import Rails from 'rails-ujs';

Rails.start();
```
