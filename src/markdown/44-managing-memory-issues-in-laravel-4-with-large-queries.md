---
title: "Managing memory issues in Laravel 4 with large queries"
path: /posts/managing-memory-issues-in-laravel-4-with-large-queries
author: Dwight Watson
date: 2014-03-05
tags: ["laravel", "php"]
---

We had an issue earlier this year which has cropped up again - running a large number of queries in Laravel would cause PHP to run out of memory and exit out. Even when using the handy `chunk()` method to try and alleviate the issue there was still a certain point in the memory that the app would just give up. It didn&#039;t make much sense to us - we were simply running a migration script: pull in a chunk from one table, copy them to another table, move to the next chunk. Nothing should have been retained in memory, it should have all run without problem.

However, it turns out this is a result of the query log that is built in to Laravel. For each and every SQL query that is made a record is kept for reference/debugging. This is fine for most uses, no problem. But when you&#039;re migrating millions of records through databases, that query log is going to fill up pretty quick.

    DB::disableQueryLog();
	
It&#039;s also important to note that if you have multiple databases (i.e., multiple connections), you will need to disable the query log for each connection, as they are kept independently.

    DB::connection(&#039;legacy&#039;)-&gt;disableQueryLog();
	
After we disabled the query logs for both our databases, the migration run without issue. It took 4 days, but without issue!

Have a read of the documentation of `disableQueryLog` in the [basic database docs](http://laravel.com/docs/database#query-logging). It&#039;s hidden down the bottom there, but worth looking at.
