---
title: "Gzip static assets in Phoenix"
path: /posts/gzip-static-assets-in-phoenix
author: Dwight Watson
date: 2016-07-14
tags: ["elixir", "phoenix"]
---

Recently I've been playing with [Phoenix](http://www.phoenixframework.org/), the hot framework for [Elixir](http://elixir-lang.org/). While it has a definite Rails vibe there's also a very different flavour because of the nature of it being written in a functional language. Oddly enough reading [Refactoring to Collections](https://adamwathan.me/refactoring-to-collections/), a book written mainly for the PHP community, has eased the transition to functional coding.

Having just deployed my first example app on Heroku I was seeing some pretty good speeds - page loads in under 1s. But not the *wow* I was expecting from moving to Phoenix. Turns out, there's a quick tweak you can make to your Phoenix application so that your assets are gzipped in production. Simply edit your `lib/app/endpoint.ex` file.

```elixir
plug Plug.Static,
  at: "/", from: :lunchmates, gzip: true,
  only: ~w(css fonts images js favicon.ico robots.txt)
```

It's mentioned in the comment above it, but by enabling the `gzip` option (which is off by default), you'll get a significant performance boost out of your static assets.

On a related note, despite the fact that Phoenix hashes your static assets filenames' so they can be cachebusted, it still adds a `?vsn=n` query string to the end of the path. [There was an issue and related PR to remove this, or make it optional, but it was rejected](https://github.com/phoenixframework/phoenix/pull/1788). I do hope at some point they'll reconsider this, because having it there is unneccessary, and a little ugly.
