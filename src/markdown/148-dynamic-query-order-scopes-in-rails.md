---
title: "Dynamic query order scopes in Rails"
path: /posts/dynamic-query-order-scopes-in-rails
author: Dwight Watson
date: 2017-08-24
tags: ["activerecord", "ruby on rails"]
---

One of my favourite query scopes in Laravel is `latest()` which will order the query by the latest models based on the `created_at` column. In addition you can pass the column you want to order on in case you need something else.

I wanted to implement this in Rails but couldn’t work out how to use a symbol as a column name for the `column_name: :sort_direction` syntax, but soon realised I could use the hashrocket to get it to work the way I wanted.

```rb
class ApplicationRecord &lt; ActiveRecord::Base
  self.abstract_class = true

  scope :latest, -&gt;(column = :created_at) { order(column =&gt; :desc) }
end
```

With this code in your base record model you can easily query your database by a given column. Be careful to consider indexing columns when this is necessary.

```
# Latest created posts.
Post.latest

# Latest published posts.
Post.latest(:published_at)
```
