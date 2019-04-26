---
title: "Mounting a Vue instance to a DOM element"
path: /posts/mounting-a-vue-instance-to-a-dom-element
author: Dwight Watson
date: 2016-08-09
tags: ["javascript", "vue.js"]
---

Here&#039;s something cool I learnt from Evan You&#039;s talk on Vue.js at Laracon - how to mount a Vue instance to a DOM element after you&#039;ve created it, instead of providing the `el` option in the constructor object.

```javascript
const vm = new Vue({
  data: {
    name: &#039;Application&#039;
  },
  template: &#039;&lt;h1&gt;Welcome to {{ name }}&lt;/h1&gt;&#039;
}).$mount(&#039;body&#039;)
```

The `$mount()` method on your Vue.js instance will then mount it on the DOM for you. The above code is the equivilant of the more familiar way.


```javascript
const vm = new Vue({
  el: &#039;body&#039;,
  data: {
    name: &#039;Application&#039;
  },
  template: &#039;&lt;h1&gt;Welcome to {{ name }}&lt;/h1&gt;&#039;
});
```
