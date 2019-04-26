---
title: "Request specs for Rack::Deflate"
path: /posts/request-specs-for-rackdeflate
author: Dwight Watson
date: 2017-07-14
tags: ["rspec", "ruby", "ruby on rails"]
---

I&#039;ve been tinkering about with `Rack::Deflate` after reading [Thoughtbot&#039;s post on the topic](https://robots.thoughtbot.com/content-compression-with-rack-deflater). Works a charm, but I noticed a lot of the example specs for `Rack::Deflate` are now out-of-date for RSpec 3.

As such, I&#039;ve got an updated request spec that will check that the your content is encoded when the browser indicates that it will be supported. Just pop this in `spec/requests/compression_spec.rb`:

```rb
require &quot;rails_helper&quot;

RSpec.describe &quot;Compression&quot;, type: :request do
  scenario &quot;a visitor has a browser that supports compression&quot; do
    get root_path, headers: { HTTP_ACCEPT_ENCODING: &quot;gzip&quot; }
    expect(response.headers).to have_key &quot;Content-Encoding&quot;
  end

  scenario &quot;a visitor&#039;s browser does not support compression&quot; do
    get root_path
    expect(response.headers).to_not have_key &quot;Content-Encoding&quot;
  end
end
```
