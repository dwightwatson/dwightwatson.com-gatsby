---
title: "Using multiple actions on a single element with Stimulus"
path: /posts/using-multiple-actions-on-a-single-element-with-stimulus
author: Dwight Watson
date: 2018-03-14
tags: ["stimulus"]
---

Sometimes it makes sense to want to fire an event from an element off to multiple controllers (if the element is a child of both controller scopes). Luckily this is something that was considered by the Stimulus team and it works out of the box.

```
<input type="email" name="email" data-action="email#change form#change" />
```

In this example, both `EmailController#change` and `FormController#change` would be called with the change event. There are many use-cases for this - in the above example your `EmailController` might be looking to validate that email with an external service while a `FormController` might be interested in toggling other relevant parts of the form for display.
