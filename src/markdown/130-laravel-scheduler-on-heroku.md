---
title: "Laravel scheduler on Heroku"
path: /posts/laravel-scheduler-on-heroku
author: Dwight Watson
date: 2017-07-16
tags: ["heroku", "laravel"]
---

The Laravel scheduler is a great feature that removes the hassle of managing cron tasks, letting you handling everything in your app. Heroku is a great platform that relieves you of having to look after your own infrastructure. However getting the two to work together isn&#039;t quite perfect.

Heroku offers the [Heroku Scheduler](https://elements.heroku.com/addons/scheduler) add-on which can perform calls into your app on demand, however it is limited to running at most every 10 minutes. This might be fine if your schedule isn&#039;t particularly heavy, but it&#039;s just one annoyance that would be nice to get rid of.

Luckily there is a work-around - Heroku has documentation on [custom clock processes](https://devcenter.heroku.com/articles/scheduled-jobs-custom-clock-processes) for when you need more fine-grained controller over time based tasks. They have example implemenations for Python and Java, but not PHP.

Here is a command you can add to your app and your Procfile which will let your scheduler run every minute. Effectively you will boot up another stack in your app - just choose a smaller dyno size if you can - and prompt the scheduler when required. You have the option to call it more or less frequently if you need.

```php
&lt;?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class SchedulerDaemon extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = &#039;schedule:daemon {--sleep=60}&#039;;

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = &#039;Call the scheduler every minute.&#039;;

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        while (true) {
            $this-&gt;line(&#039;&lt;info&gt;[&#039; . Carbon::now()-&gt;format(&#039;Y-m-d H:i:s&#039;) . &#039;]&lt;/info&gt; Calling scheduler&#039;);

            $this-&gt;call(&#039;schedule:run&#039;);

            sleep($this-&gt;option(&#039;sleep&#039;));
        }
    }
}
```

Then add this line to your `Procfile` which will tell Heroku to launch an additional stack and run the daemon for you.

```
scheduler: php artisan schedule:daemon
```
