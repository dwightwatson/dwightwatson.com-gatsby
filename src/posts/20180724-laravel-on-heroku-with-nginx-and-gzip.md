---
title: Laravel on Heroku - with Nginx & gzip
path: /posts/laravel-on-heroku-with-nginx-and-gzip
author: Dwight Watson
date: 2018-07-24
tags: ["laravel", "heroku"]
---

When setting up a PHP app on Heroku the default configuration is to use Apache. It's simple to get going and customise through the `.htaccess` file. However out of the box this falls short of what you probably want in a production site.

First you're going to want to switch to using Nginx - as it's generally faster than Apache. Nginx still has first-party support from Heroku, so it's easy to do. Second, you'll want to enable gzip (which is not enabled by default for either Apache or Nginx on Heroku) as that will reduce the time your dyno spends serving requests.

## Switching to Nginx

To switch to Nginx we'll need to do two things; first update the `Procfile` to tell Heroku to use a different server and second provide a configuration for it that works with Laravel. For reference, [take a look at the Nginx configuration provided by Laravel's documentation](https://laravel.com/docs/5.6/deployment#nginx) - we need to adjust it a tad to be compatible with Heroku. We'll effectively be merging it up [with the default Nginx configuration file that Heroku uses](https://github.com/heroku/heroku-buildpack-php/blob/master/conf/nginx/default_include.conf.php).

In your `Procfile` update the `web:` line to use `heroku-php-nginx` instead of Apache. As usual you'll provide `public/` as the public directory but we also provide a custom configuration file - `nginx.conf` - which will instruct Nginx how to work with Laravel.

```shell
web: vendor/bin/heroku-php-nginx -C nginx.conf public/
```

Next we'll create the `nginx.conf` file in the root of the app (but you could pop it wherever you want). This adjusts the default Laravel configuration to work with Heroku. Not a lot has changed, you can easily reference both to see the differences.

```nginx
add_header X-Frame-Options "SAMEORIGIN";
add_header X-XSS-Protection "1; mode=block";
add_header X-Content-Type-Options "nosniff";

index  index.php index.html index.htm;

charset utf-8;

location / {
    try_files $uri $uri/ /index.php?$query_string;
}

location = /favicon.ico { access_log off; log_not_found off; }
location = /robots.txt  { access_log off; log_not_found off; }

error_page 404 /index.php;

location ~ /\.(?!well-known).* {
    deny all;
}
```

There's only a one major difference from Laravel's example - we don't use the `listen`, `server_name` or `root` options as that is all handled upstream by Heroku.

Easy enough - once you ship these changes you'll be running Laravel on Heroku with Nginx, be sure to check the performance of your app before and after the change to get a feel for the improvement.

## Enabling nginx

[For whatever reason, gzip is disabled by default for Heroku's PHP buildpack](https://github.com/heroku/heroku-buildpack-php/issues/127). It's unfortunate as gzip can provide a performance improvement as your dyno will spend less time serving request.

Luckily, the [HTML5 boilerplate](https://github.com/h5bp/server-configs-nginx) provides example optimised server configuration files. Taking a look at the [default setup we can see the gzip configuration](https://github.com/h5bp/server-configs-nginx/blob/3bda5b93edba147d51760e900c2079828a7dc274/nginx.conf#L89-L144). Let's apply this to our configuration (stripping the comments).

```nginx
add_header X-Frame-Options "SAMEORIGIN";
add_header X-XSS-Protection "1; mode=block";
add_header X-Content-Type-Options "nosniff";

index  index.php index.html index.htm;

charset utf-8;

gzip on;
gzip_comp_level 5;
gzip_min_length 256;
gzip_proxied any;
gzip_vary on;
gzip_types
  application/atom+xml
  application/javascript
  application/json
  application/ld+json
  application/manifest+json
  application/rss+xml
  application/vnd.geo+json
  application/vnd.ms-fontobject
  application/x-font-ttf
  application/x-web-app-manifest+json
  application/xhtml+xml
  application/xml
  font/opentype
  image/bmp
  image/svg+xml
  image/x-icon
  text/cache-manifest
  text/css
  text/plain
  text/vcard
  text/vnd.rim.location.xloc
  text/vtt
  text/x-component
  text/x-cross-domain-policy;

location / {
    try_files $uri $uri/ /index.php?$query_string;
}

location = /favicon.ico { access_log off; log_not_found off; }
location = /robots.txt  { access_log off; log_not_found off; }

error_page 404 /index.php;

location ~ /\.(?!well-known).* {
    deny all;
}
```

With this configuration deployed your Laravel app will now be served through Nginx with everything gzipped. Run another speed test and you should see another speed bump.

I've tried to keep this configuration fairly conventional and unopinionated - using the suggested configuration from Laravel and doing the bare minimum to make it compatible on Heroku and then adding the HTML5 boilerplate's gzip options.
