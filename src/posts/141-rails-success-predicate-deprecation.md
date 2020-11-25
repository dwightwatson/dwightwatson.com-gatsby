---
title: "Rails success? predicate deprecation"
path: /posts/rails-success-predicate-deprecation
author: Dwight Watson
date: 2017-08-09
tags: ["rspec", "ruby on rails"]
---

I’ve been running a new Rails project up on the `master` branch while having a play with the new ActiveStorage module to see if it will be a good fit. Running the test suite this morning though I found that the RSpec output was littered with these deprecation warnings:

```
The success? predicate is deprecated and will be removed in Rails 6.0. Please use successful? as provided by Rack::Response::Helpers.
```

It turns out that my use of `expect(response).to have_http_status :success` is now the old way of doing things. While the error message wasn’t particularly clear as to what to do, I worked it out. Here are some of the ways you can update your code and remove the deprecation warning.

```rb
# Call the predicate yourself
expect(response).to be successful?

# Use RSpec magic matching
expect(response).to be_successful
```
