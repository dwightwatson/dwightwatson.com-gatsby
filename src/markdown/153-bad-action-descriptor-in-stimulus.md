---
title: "Bad action descriptor in Stimulus"
path: /posts/bad-action-descriptor-in-stimulus
author: Dwight Watson
date: 2018-01-04
tags: ["javascript", "stimulus"]
---

Ran into a slight issue today while trying to hook up an action with [Stimulus](https://github.com/stimulusjs/stimulus), the new JavaScript framework from the people that make [Basecamp](https://basecamp.com/).

```js
Error parsing descriptor string "toggleable#click" for element

Error: Bad action descriptor "toggleable#click": this.defaultEventNames[element.tagName.toLowerCase(...)] is not a function
```

I don’t think the error message makes it particularly clear what’s going on here - but it’s related to how Stimulus infers the event you want.  Effectively, I’ve been using the [shorthand notation](https://github.com/stimulusjs/stimulus/blob/071f63ee4822c5367a5671844f485ca19652edbf/handbook/03_building_something_real.md#common-actions-have-a-shorthand-notation) for hooking up actions - that is to say if you leave off the event name it will automatically be inferred by the element type.

Taking a look at the [ActionDescriptor](https://github.com/stimulusjs/stimulus/blob/aa075344f2b6806124c560bee67485382bb07007/packages/%40stimulus/core/src/action_descriptor.ts#L12-L19) we can see that the default event types are pretty simple - `click` for a link or a button, `change` for any input and `submit` for any form or submit button.

I ran into my issue because the element I had placed my action on was none of these elements - it was simply a `div`. Because of this Stimulus could not infer the event type and threw the error. In order to get this to work I simply needed to be more explicit (or convert by `div` to an `a` tag instead, though I was not able to do that in this instance for other reasons).

```html
<div data-action="click->toggleable#click">
    <amazing-content />
</div>
```
