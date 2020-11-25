---
title: "Eloquent model events only trigger once in tests"
path: /posts/eloquent-model-events-only-triggered-once-in-tests
author: Dwight Watson
date: 2014-09-09
tags: ["laravel", "php", "phpunit", "testing"]
---

An issue popped up on the [laravel/framework](https://github.com/laravel/framework) repository a while ago that identified an issue where model events would only fire once when being tested, despite the fact they would fire and work as expected in production. This was particularly interesting to me because it was a problem for anyone who uses my [watson/validating](https://github.com/dwightwatson/validating) and tests their apps as well. Because the library leverages Eloquent's events to perform validation it becomes very difficult to test that your models are working as expected.

__You can see [issue #1181 here](https://github.com/laravel/framework/issues/1181).__

However, there is an (unpleasant) solution. Hopefully this gets patched by the framework, otherwise here is the workaround. Basically, you need to tell each model to flush it's event listeners and then re-register them between tests.

    User::flushEventListeners();
    User::boot();

You can see that this could become painful quickly, especially if you have a lot of models. Let's improve, in your `TestCase.php` file:

    public function setUp()
    {
        parent::setUp();

        $this->resetEvents();
    }

    public function resetEvents()
    {
        $models = ['User', 'Post'];

        foreach ($models as $model)
        {
            call_user_func([$model, 'flushEventListeners']);

            call_user_func([$model, 'boot']);
        }
    }

Oh, you still have to pop your models in the array, you say? How annoying! Also an easy fix, as long as you keep your models all in a single directory.

    protected function getModels()
    {
        // Replace with your models directory if you've moved it.
        $files = File::files(base_path() . '/app/models');

        foreach ($files as $file)
        {
            $models[] = pathinfo($file, PATHINFO_FILENAME);
        }

        	return $models;
    }

Now you can simply use `$models = $this->getModels()` to automatically load all the model names. I expected some reduced perfomance with this one but my tests actually improved by 2 seconds. Go figure.

This fix is also available complete [as a gist](https://gist.github.com/dwightwatson/a645e7f5f6c8c52445d8).
