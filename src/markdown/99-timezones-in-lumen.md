---
title: "Timezones in Lumen"
path: /posts/timezones-in-lumen
author: Dwight Watson
date: 2015-06-17
tags: ["lumen", "php"]
---

Because there aren’t any configuration files with Lumen, you now approach setting up the application using environment variables. If you dig into Lumen’s source code you can find the configuration files where the framework attempts to load options from the environment and then falls back to it’s defaults. However, the timezone option isn’t actually listed in the `config/app.php` configuration file.

No matter however, as you’ll find in the Lumen `Application` constructor it will also attempt to load the timezone from the environment:

```
/**
 * Create a new Lumen application instance.
 *
 * @param  string|null  $basePath
 * @return void
 */
public function __construct($basePath = null)
{
    date_default_timezone_set(env(&#039;APP_TIMEZONE&#039;, &#039;UTC&#039;));

    $this-&gt;basePath = $basePath;
    $this-&gt;bootstrapContainer();
    $this-&gt;registerErrorHandling();
}
```

So, setting the timezone up is as easy as popping `APP_TIMEZONE` into your `.env` configuration file as you normally would.

    APP_TIMEZONE=Australia/Sydney
