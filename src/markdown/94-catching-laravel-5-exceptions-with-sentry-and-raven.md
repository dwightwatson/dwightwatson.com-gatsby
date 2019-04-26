---
title: "Catching Laravel 5 exceptions with Sentry (and Raven)"
path: /posts/catching-laravel-5-exceptions-with-sentry-and-raven
author: Dwight Watson
date: 2015-03-27
tags: ["laravel", "laravel 5", "php", "sentry"]
---

The process for catching exceptions has changed a little, especially now as we actually have a place to do it - the `report()` method of your app's exception handler. It even tells you in the method comment. This is a lot better than having to register it in a random place like `global.php` or `start.php` as you'll know where to find it.

In addition to the change in Laravel 5, an [upstream change in Monolog](https://github.com/Seldaek/monolog/commit/c1fd9cddf2f2d4f49dc56cb647681ee086c6fca3) affected the way we attach the user context to the exception. In the example below, we pass these exceptions off to Sentry in the production environment only (of course, change this as necessary) and attach the user context through Monolog, instead of the Raven client directly.

I had to use Laravel facades in this example as I was unable to inject the application or auth guard into the exception handler. If someone knows a better way, please let me know in the comments.

    use Raven_Client;
    use Monolog\Logger;
    use Monolog\Handler\RavenHandler;
    use Monolog\Formatter\LineFormatter;
    use Illuminate\Support\Facades\App;
    use Illuminate\Support\Facades\Auth;

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        if (App::environment('production'))
        {
            $client = new Raven_Client('...');

            $handler = new RavenHandler($client, \Monolog\Logger::INFO);
            $handler->setFormatter(new LineFormatter("%message% %context% %extra%\n"));

            $monolog = $this->log->getMonolog();
            $monolog->pushHandler($handler);

            if (Auth::check())
            {
                $monolog->pushProcessor(function ($record) {
                    $record['context']['user'] = array_only(Auth::user()->toArray(), ['id', 'email']);
                    return $record;
                });
            }
        }

        return parent::report($e);
    }
