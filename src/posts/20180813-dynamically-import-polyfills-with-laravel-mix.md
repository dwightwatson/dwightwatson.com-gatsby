---
title: Dynamically import polyfills with Laravel Mix
path: /posts/dynamically-import-polyfills-with-laravel-mix
author: Dwight Watson
date: 2018-08-13
tags: ["laravel", "mix"]
---

For the new [Roomies.com](https://www.roomies.com) we've decided to try and adopt the native date input. At the moment this would support [90.17% of our users in the United States](https://caniuse.com/#feat=input-datetime) out of the box. We can then provide a fallback for people who use Internet Explorer 11 or Safari.

We decided to use new native inputs where possible because it would help provide an experience users are becoming more familiar with, as well as being more accessibility-friendly. In addition it is faster because we don't need to download more code to support it.

## Supporting dynamic import

Out of the box Laravel Mix does not support dynamic imports but that is easy to change. First run `yarn add babel-plugin-syntax-dynamic-import --dev` to add the babel plugin. Next, add the plugin to your `.babelrc` file.

```shell
{
    "plugins": ["syntax-dynamic-import"]
}
```

You can now use `import` in your code to dynamically import other modules - they'll only be downloaded when required. It is great for loading in additional components that the majority of users might not ever use.

```javascript
const app = new Vue({
  components: {
    TimeAgo: () => import("./TimeAgo.vue"),
  },
}).$mount("#app")
```

You may notice that Laravel Mix (and Webpack, under the hood) will automatically give this dynamic module a name like `0.js`. The name is not important but if you want something more obvious you can use a magic comment to achieve that.

```javascript
import(/* webpackChunkName: 'js/timeago' */ "./TimeAgo.vue")
```

Now the file will have the given name and be placed in your `public/js` directory along with your other assets.

## Testing if the polyfill is required

In our example we decided to use [Pikaday](https://github.com/dbushell/Pikaday) to provide the date picker functionality when the browser does not natively support it. If we dynamically imported the package like above it would be split into another file but still loaded on browsers that do not need it.

First we need a way to determine if the browser supports the element we are working with or not. This simple function will tell us this.

```javascript
const supportsInput = (type) => {
  const input = document.createElement("input")
  input.type = type
  return input.type === type
}
```

## Only import when required

We can use this function as a guard close to only load the Pikaday module if it is required. Then we can use it as we would normally.

```javascript
async mounted() {
  if (supportsInput('date')) {
    return;
  }

  const Pikaday = await import('pikaday');

  new Pikaday({
    field: this.$el
  });
}
```

## Dynamically load other assets

Pikaday also requires some CSS in order to make it look like a date picker. Like everything else this is really simple to import with Webpacker.

```javascript
import "pikaday/css/pikaday.css"
```

However much like the Pikaday script we only want to load this when it's required. One way to achieve this is to create our own module for Pikaday and load that in together. We could add a file at `resources/js/modules/pikaday.js` like this - a single file to load the CSS and re-export the Pikaday module.

```javascript
import "pikaday/css/pikaday.css"

export { default as Pikaday } from "pikaday"
```

Now this self-contained Pikaday can be dynamically imported as a whole only when required. A slight tweak to the import to pop off the Pikaday key will do the trick.

```javascript
async mounted() {
  if (supportsInput('date')) {
    return;
  }

  const { Pikaday } = await import('pikaday');

  new Pikaday({
    field: this.$el
  });
}
```

## Staying lean

By dynamically importing additional dependencies only when required we keep our primary assets smaller. We provide our users using newer browsers with a faster, more native experience while still supporting those who aren't as lucky.
