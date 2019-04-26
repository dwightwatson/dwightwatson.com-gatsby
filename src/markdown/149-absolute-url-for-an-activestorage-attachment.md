---
title: "Absolute URL for an ActiveStorage attachment"
path: /posts/absolute-url-for-an-activestorage-attachment
author: Dwight Watson
date: 2017-08-24
tags: ["activestorage", "ruby on rails"]
---

Not sure why, but I couldn’t get `url_for` to give me an absolute URL with an ActiveStorage attachment, even when playing with all the options available. Turns out that `polymorphic_url` will give you what you’re after though.

```rb
polymorphic_url(@post.header)
```
