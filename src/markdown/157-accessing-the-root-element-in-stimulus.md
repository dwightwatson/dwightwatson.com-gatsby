---
title: "Accessing the root element in Stimulus"
path: /posts/accessing-the-root-element-in-stimulus
author: Dwight Watson
date: 2018-01-09
tags: ["javascript", "stimulus"]
---

Sometimes you might want to access the root element of your controller when using Stimulus - the element you have the `data-controller` attribute attached to. You could hook up a target to get access to it, but there’s an easier way - it’s simply available on your controller as `this.element`.

```js
export default class extends Stimulus.Controller {
  connect() {
    // toggle class on the root element
    this.element.classList.toggle(&#039;element--connected&#039;)
  }
}
```
