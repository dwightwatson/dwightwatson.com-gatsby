---
title: "Mounting a Vue instance to a DOM element"
path: /posts/mounting-a-vue-instance-to-a-dom-element
author: Dwight Watson
date: 2016-08-09
tags: ["javascript", "vue.js"]
---

Here's something cool I learnt from Evan You's talk on Vue.js at Laracon - how to mount a Vue instance to a DOM element after you've created it, instead of providing the `el` option in the constructor object.

```javascript
const vm = new Vue({
  data: {
    name: 'Application'
  },
  template: '<h1>Welcome to {{ name }}</h1>'
}).$mount('body')
```

The `$mount()` method on your Vue.js instance will then mount it on the DOM for you. The above code is the equivilant of the more familiar way.


```javascript
const vm = new Vue({
  el: 'body',
  data: {
    name: 'Application'
  },
  template: '<h1>Welcome to {{ name }}</h1>'
});
```
