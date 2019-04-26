---
title: "Installing Composer and Laravel 4 on Media Temple (gs)"
path: /posts/installing-composer-and-laravel-4-on-media-temple-(gs)
author: Dwight Watson
date: 2013-07-20
tags: ["composer", "laravel", "media temple"]
---

I&#039;ve seen this question floating around a bit in various places, people confused about how to get a Laravel 4 project up and running on Media Temple&#039;s (gs) grid server hosting. It&#039;s quite simple and doesn&#039;t involve too much trickery, so here is how you can go about getting it all going. 

You&#039;re going to need to SSH into your (gs) first and then move into your domains directory. Next, run the `git clone` command to pull in a fresh copy of Laravel and move into the application directory. Be sure to replace `example.com` with the domain name you want to use.

`git clone https://github.com/laravel/laravel example.com &amp;&amp; cd example.com`

Next, you&#039;re going to need to install Composer into the directory. By default, (gs) PHP has allow_url_fopen disabled, which is required to install Composer. You can use the following command to toggle this setting.

`curl -sS https://getcomposer.org/installer | php -d allow_url_fopen=On`

Once Composer is installed, you&#039;ll want to install Laravel&#039;s dependancies. Again, we toggle PHP to allow it to access outside URLs.

`php -d allow_url_fopen=On composer.phar install`

For safety, you&#039;re going to want to generate an encryption key for your app. (If you were to install Laravel through Composer&#039;s `create-project` command instead of manually via Git, this would be done for you already).

`php artisan key:generate`

Finally, you&#039;re going to need to rename the public folder. (gs) uses the `html` folder as the root for your application, so we have to rename the folder and then let Laravel know that&#039;s what we did.

`mv public html`

Now, edit the `bootstrap/paths.php` file and adjust the public path to be `__DIR__.&#039;/../html` instead. Your Laravel 4 app should now be good to go on (gs)!
