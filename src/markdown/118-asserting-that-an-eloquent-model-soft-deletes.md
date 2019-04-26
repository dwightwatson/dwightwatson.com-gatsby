---
title: "Asserting that an Eloquent model soft deletes"
path: /posts/asserting-that-an-eloquent-model-soft-deletes
author: Dwight Watson
date: 2016-12-03
tags: ["laravel", "php", "phpunit", "testing"]
---

Ran into an unpleasant situation recently where I discovered a model that I thought was soft-deleting wasn&#039;t actually - database records were actually being removed. This meant that a few months of reporting data were thrown off completely and a lot of content was lost forever.

In addition to adding the `SoftDeletes` trait back to the model I also added tests to ensure this didn&#039;t happen again. Here&#039;s a small PHPUnit helper that might help you do the same.

```php
/**
 * Assert that the given class soft deletes.
 *
 * @param  string  $model
 * @return void
 */
public function assertSoftDeletes(string $model)
{
    $instance = new $model;

    $this-&gt;assertUsesTrait(Illuminate\Database\Eloquent\SoftDeletes::class, $instance);
    $this-&gt;assertContains(&#039;deleted_at&#039;, $instance-&gt;getDates());
}

/**
 * Assert that the given class uses the provided trait name.       
 *        
 * @param  string  $trait     
 * @param  mixed   $class     
 * @return void       
 */       
public function assertUsesTrait($trait, $class)       
{     
    $this-&gt;assertContains($trait, class_uses($class));        
}
```

It&#039;s easy to use, just pass the model&#039;s class name and you should be good to go.

```php
/** @test */
function it_soft_deletes()
{
    $this-&gt;assertSoftDeletes(User::class);
}
```
