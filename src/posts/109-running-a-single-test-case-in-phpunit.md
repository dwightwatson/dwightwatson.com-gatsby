---
title: "Runing a single test case in PHPUnit"
path: /posts/running-a-single-test-case-in-phpunit
author: Dwight Watson
date: 2016-07-16
tags: ["php", "phpunit"]
---

Sometimes when you're trying to nail down a failing test you need a quick way to run just the thing thats broken, instead of your whole suite or a whole test case. Fortunately it's pretty simple with the `--filter` flag provided by PHPUnit.

```php
class PagesControllerTest extends \TestCase
{
   /** @test */
   public function it_displays_index_page()
   {
       $this->visit('/');
   }

   /** @test */
   public function it_displays_about_page()
   {
       $this->visit('/about');
   }

   /** @test */
   public function it_displays_terms_page()
   {
       $this->visit('/terms');
   }
}
```

If for whatever reason I'm having trouble with the terms page I can easily just run that failing test by calling `--filter` and providing the name of the test.

`phpunit tests/PagesControllerTest --filter it_displays_terms_page`

Better yet, it can match the start of test names. So, despite it being bad example above, if I wanted to run all the tests that start with `it_displays_`, I could go `--filter it_displays_` and it'll run all the matching tests.
