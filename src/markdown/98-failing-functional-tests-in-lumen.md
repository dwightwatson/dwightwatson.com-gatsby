---
title: "Failing functional tests in Lumen"
path: /posts/failing-functional-tests-in-lumen
author: Dwight Watson
date: 2015-05-27
tags: ["lumen", "php"]
---

There appears to be an unresolved bug in the current release of Lumen which causes your functional tests to fail. Your first test will pass (if it&#039;s meant to) but any following tests will fail without doubt. If you actually catch the error causing the functional test to return a 500 response code, you&#039;ll likely see this:

    exception &#039;ReflectionException&#039; with message &#039;Class config does not exist&#039; in /www/vendor/illuminate/container/Container.php:776

You can read more about the [issue here on GitHub](https://github.com/laravel/lumen-framework/issues/108) which links to other discussions. There appears to be confusion about whether the issue is related to database migrations or the use of facades.

Either way, in order to get your suite running correctly you can add the following `setUp()` method to your application&#039;s `TestCase`. Though Lumen is already refreshing the application between tests it seems like forcing it to refresh twice actually makes everything work. This is a short-term solution until the bug is fixed in Lumen, which is hopefully very soon.

    class TestCase extends Laravel\Lumen\Testing\TestCase {

        /**
         * Creates the application.
         *
         * @return \Laravel\Lumen\Application
         */
        public function createApplication()
        {
            return require __DIR__.&#039;/../bootstrap/app.php&#039;;
        }

        /**
         * Setup the test environment.
         *
         * @return void
         */
        public function setUp()
        {
            parent::setUp();

            $this-&gt;createApplication();
        }

    }

*Edit (June 2015): This issue appears to be resolved in Lumen 5.1.*
