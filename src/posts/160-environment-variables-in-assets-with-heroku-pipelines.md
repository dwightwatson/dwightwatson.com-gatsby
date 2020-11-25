---
title: "Environment variables in assets with Heroku Pipelines"
path: /posts/environment-variables-in-assets-with-heroku-pipelines
author: Dwight Watson
date: 2018-02-20
tags: ["heroku", "ruby on rails", "webpacker"]
---

I’ve been using Heroku Pipelines for a bit on a new project which has been great at helping us take code from staging and push it to production. With Rails Webpacker we were putting environment specific variables into the environment so that the assets would be built correctly.

```js
export const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
```

However, this doesn’t work the way you would expect when using Heroku Pipelines. When you promote an app from staging to production it actually copies the entire application verbatim. That means any assets you built in staging - with staging credentials - then get deployed into production. Not good.

The Heroku documentation does suggest that you rebuild the assets during the release phase, but while this code does run it doesn’t actually affect the end result - your staging assets are still being served in production.

```sh
release: bundle exec rails db:migrate webpacker:clobber webpacker:precomile
```

The solution is to make your application assets totally agnostic of the environment and instead have them get what they need from the browser. That way you can use the same assets that are built in staging in production when they are promoted there. You can do this by adding a head script tag in your template.

```haml
:javascript
  window.App = {
    STRIPE_PUBLISHABLE_KEY = '#{ENV.fetch('STRIPE_PUBLISHABLE_KEY')}'
  };
```

Now in your assets you can refer to `App.STRIPE_PUBLISHABLE_KEY` instead of `process.env.STRIPE_PUBLISHABLE_KEY`. Your assets are no longer tied to the build process and you can happily use Heroku Pipelines and enjoy the quick promotion functionality.

Of course this is a trade-off to use this feature, you’ll need to decide if it’s an approach that you’re comfortable with before diving down this hole.
