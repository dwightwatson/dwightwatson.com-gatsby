---
title: "Request specs for Rack::Deflate"
path: /posts/request-specs-for-rackdeflate
author: Dwight Watson
date: 2017-07-14
tags: ["rspec", "ruby", "ruby on rails"]
---

I've been tinkering about with `Rack::Deflate` after reading [Thoughtbot's post on the topic](https://robots.thoughtbot.com/content-compression-with-rack-deflater). Works a charm, but I noticed a lot of the example specs for `Rack::Deflate` are now out-of-date for RSpec 3.

As such, I've got an updated request spec that will check that the your content is encoded when the browser indicates that it will be supported. Just pop this in `spec/requests/compression_spec.rb`:

```rb
require "rails_helper"

RSpec.describe "Compression", type: :request do
  scenario "a visitor has a browser that supports compression" do
    get root_path, headers: { HTTP_ACCEPT_ENCODING: "gzip" }
    expect(response.headers).to have_key "Content-Encoding"
  end

  scenario "a visitor's browser does not support compression" do
    get root_path
    expect(response.headers).to_not have_key "Content-Encoding"
  end
end
```
