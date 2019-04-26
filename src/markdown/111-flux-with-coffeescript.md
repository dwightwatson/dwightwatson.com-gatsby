---
title: "Flux with CoffeeScript"
path: /posts/flux-with-coffeescript
author: Dwight Watson
date: 2016-08-02
tags: ["coffeescript", "javascript"]
---

Since I&#039;ve been using React with Rails we&#039;ve adopted the [Flux pattern from Facebook](https://facebook.github.io/flux/) which has a unidirectional data flow from stores down through your components. However where I work we also use CoffeeScript, and while there are a heap of resources for just getting started with Flux, they&#039;re seemingly always in ES5/ES6. So after some playing around and tweaking, here&#039;s my basic approach to Flux with CoffeeScript.

```coffee
class MemberStore extends EventEmitter
  constructor: -&gt;
    @data = {}

    @dispatchToken = AppDispatcher.register (payload) =&gt;
      switch payload.actionType
        when Constants.Member.UPDATE
          @data = payload.data
          @emit Constants.Member.CHANGE_EVENT, @data

  data: =&gt;
    @data

window.Member = new MemberStore()
```

There&#039;s a couple of things to notice here; first we&#039;re simply extending Facebook&#039;s default `EventEmitter` object for our store, second we&#039;re registering with our `AppDispatcher` and third we&#039;re using constants for event actions and change events. Here&#039;s how you might go about implementing those.

```coffee
window.AppDispatcher = new Flux.Dispatcher()

window.Constants =
  Member:
    CHANGE_EVENT: &quot;MEMBER_CHANGE&quot;
    UPDATE: &quot;UPDATE&quot;
```

It&#039;s worth keeping in mind firing off actions is still easy - it&#039;s just simple CoffeeScript. Using constants is still a good practice as well.

```coffee
window.MemberActions =
  update: (data) -&gt;
    AppDispatcher.dispatch 
      actionType: Constants.Member.UPDATE
      data: data
```
