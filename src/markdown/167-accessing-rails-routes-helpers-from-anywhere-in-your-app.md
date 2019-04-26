---
title: "Accessing Rails routes helpers from anywhere in your app"
path: /posts/accessing-rails-routes-helpers-from-anywhere-in-your-app
author: Dwight Watson
date: 2018-04-09
tags: ["ruby on rails"]
---

Sometimes it makes sense that you'll want to generate links back  to your app from components of your app that don't have access to Rails route helpers. This may be because they are separated from the request stack - they're not a controller or a view.

This doesn't mean it's a bad practice to want route helpers in other parts of your app - be it service classes or jobs. They're convenient and prevents you from generating links that will fall out of date.

Often it's easy enough to just import the helpers into whatever class you're working with.

```rb
include Rails.application.routes.url_helpers
```

This does work, but it has a number of issues. For one, it's annoying to remember. Second, and perhaps more importantly, it doesn't work outside the context of a HTTP request as it doesn't know which host to use.

Luckily we can get around this by leveraging the configuration of ActionMailer which should be providing the correct host configuration for the environment. We can put this altogether into a simple concern you can pop in `app/models/concerns/routeable.rb`.

```rb
# frozen_string_literal: true

module Routeable
  extend ActiveSupport::Concern

  included do
    include Rails.application.routes.url_helpers
  end

  def default_url_options
    Rails.application.config.action_mailer.default_url_options
  end
end
```

With that you have a simple concern that will make Rails route helpers available in your classes by simply calling `include Routeable`, and they'll work in your background jobs as well.
