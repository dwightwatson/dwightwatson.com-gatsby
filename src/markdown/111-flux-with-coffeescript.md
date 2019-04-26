---
title: "Flux with CoffeeScript"
path: /posts/flux-with-coffeescript
author: Dwight Watson
date: 2016-08-02
tags: ["coffeescript", "javascript"]
---

Since I've been using React with Rails we've adopted the [Flux pattern from Facebook](https://facebook.github.io/flux/) which has a unidirectional data flow from stores down through your components. However where I work we also use CoffeeScript, and while there are a heap of resources for just getting started with Flux, they're seemingly always in ES5/ES6. So after some playing around and tweaking, here's my basic approach to Flux with CoffeeScript.

```coffee
class MemberStore extends EventEmitter
  constructor: ->
    @data = {}

    @dispatchToken = AppDispatcher.register (payload) =>
      switch payload.actionType
        when Constants.Member.UPDATE
          @data = payload.data
          @emit Constants.Member.CHANGE_EVENT, @data

  data: =>
    @data

window.Member = new MemberStore()
```

There's a couple of things to notice here; first we're simply extending Facebook's default `EventEmitter` object for our store, second we're registering with our `AppDispatcher` and third we're using constants for event actions and change events. Here's how you might go about implementing those.

```coffee
window.AppDispatcher = new Flux.Dispatcher()

window.Constants =
  Member:
    CHANGE_EVENT: "MEMBER_CHANGE"
    UPDATE: "UPDATE"
```

It's worth keeping in mind firing off actions is still easy - it's just simple CoffeeScript. Using constants is still a good practice as well.

```coffee
window.MemberActions =
  update: (data) ->
    AppDispatcher.dispatch
      actionType: Constants.Member.UPDATE
      data: data
```
