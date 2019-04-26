---
title: "Selenium::WebDriver::Error::WebDriverError"
path: /posts/seleniumwebdrivererrorwebdrivererror
author: Dwight Watson
date: 2018-01-11
tags: ["rspec", "testing"]
---

Occasionally I run into an issue where my RSpec system tests start to fail because they’re unable to connect to the `chromedriver` instance.

```sh
Selenium::WebDriver::Error::WebDriverError:
  unable to connect to chromedriver 127.0.0.1:9516         
```

It turns out that somehow a gem called `chromedriver-helper` ends up getting installed from something else, and it has it’s own executable called `chromedriver` which RSpec ends up calling instead of the actual `chromedriver`. You can verify this is the case by checking which executable is being called - I have my `chromedriver` installed by Homebrew.

```sh
$ which chromedriver
/usr/local/bin/chromedriver
```

If the result for you references a gem instead, then you’ll need to uninstall it.

```sh
$ gem uninstall chromedriver-helper
```

This normally does the trick for me, but you might also need to get rbenv to rebuild it’s links which only takes a second.

```sh
$ rbenv rehash
```

Now check the location of your `chromedriver` and you should be good to go.
