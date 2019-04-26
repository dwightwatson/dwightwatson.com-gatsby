---
title: "Incorrect coverage reporting on Heroku CI"
path: /posts/incorrect-coverage-reporting-on-heroku-ci
author: Dwight Watson
date: 2017-08-01
tags: ["heroku", "ruby on rails", "testing"]
---

I&#039;ve recently started using Heroku CI to test my Heroku apps on Rails, but ran into a strange issue where Simplecov was reporting my code coverage at around 18%, where locally it was 100%. After a little bit of research I discovered the same sort of [issue occured on Travis CI](https://github.com/colszowka/simplecov/issues/360) likely because of the location where it installed the app dependencies.

Luckily, it&#039;s an easy fix. Just adjust your Simplecov configuration in your `spec_helper.rb` - by filtering out the `vendor` directory third party code won&#039;t be included in your code coverage stats.

```rb
require &#039;simplecov&#039;
SimpleCov.start :rails do
  add_filter &#039;vendor&#039;
end
```
