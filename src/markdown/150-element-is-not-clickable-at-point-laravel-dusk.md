---
title: "Element is not clickable at point (Laravel Dusk)"
path: /posts/element-is-not-clickable-at-point-laravel-dusk
author: Dwight Watson
date: 2017-09-11
tags: ["laravel", "testing"]
---

Ran into an interesting issue today when filling in a form with Laravel Dusk. It ran locally but then failed selecting an input when running on CircleCI. It was quite a long form on the page, so by the sounds of the issue the form element I wanted to select was out of the viewport and for that reason Chrome couldn’t interact with it.

```php
Facebook\WebDriver\Exception\UnknownServerException: unknown error: Element is not clickable at point (988, 1124)
  (Session info: headless chrome=61.0.3163.79)
  (Driver info: chromedriver=2.31.488763 (092de99f48a300323ecf8c2a4e2e7cab51de5ba8),platform=Linux 4.4.0-92-generic x86_64)
```

I actually came across two solutions to the issue - the first is to instruct Chrome to create a larger window so that your entire form will fit in the viewport, and the second is to manually execute JavaScript that will scroll the viewport for you. The choice is yours and it comes down to whether you’d use an unrealistic user viewport or manually scroll the page.

## Changing Chrome Driver’s Viewport
In your `tests/DuskTestCase.php` file you have the ability to control the arguments that instantiate the Chrome Driver. You can use the `--window-size` argument to make the size of the window large enough to fit your biggest pages.

```php
$options = (new ChromeOptions)-&gt;addArguments([
    &#039;--window-size=1920,1920&#039;,
    &#039;--disable-gpu&#039;,
    &#039;--headless&#039;
]);
```

## Manually Scrolling The Viewport
This option is a little more labour intensive as you’ll have to pop it in your tests wherever it’s required. What’s more is that it breaks the assertion train of the test so you need to do it all on a separate line.

```php
$browser-&gt;script(&#039;window.scrollTo(0, 400);&#039;);
```

Of course you’ll need to adjust the second argument there depending on how far down the page you intend to scroll. Let me show you an example of how you’ll need to break the assertion chain in order to execute this script.

```php
$browser-&gt;visit(&#039;/&#039;)
    -&gt;clickLink(&#039;Submit Post&#039;)
    -&gt;type(&#039;title&#039;, &#039;The Post Title&#039;)
    -&gt;type(&#039;description&#039;, &#039;The Post Description&#039;);

$browser-&gt;script(&#039;window.scrollTo(0, 400);&#039;);

$browser-&gt;type(&#039;content&#039;, &#039;The Post Content&#039;)
    -&gt;press(&#039;Submit Post&#039;)
    -&gt;assertSee(&#039;Your Post Has Been Saved.&#039;)
    -&gt;assertPath(&#039;/posts&#039;);
```
