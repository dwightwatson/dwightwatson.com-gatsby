---
title: "Remove or add www. with nginx"
path: /posts/remove-or-add-www-with-nginx
author: Dwight Watson
date: 2014-09-07
tags: ["forge", "nginx"]
---

I recently moved my blog off shared hosting (and off [Wardrobe CMS](https://github.com/wardrobecms/wardrobe)) to use Laravel Forge instead. As part of this change I had to drop the `.htaccess` file and the [lenghty additions to it from HTML 5 Boilerplate Apache Configuration](https://github.com/h5bp/server-configs-apache) and get more familiar with Nginx. Luckily, there is a [similar boilerplate for Nginx](https://github.com/h5bp/server-configs-nginx).

I'm a big fan of prefixing `www.` to my sites, and so I wanted to redirect any request without that prefix to the proper version - a 301 redirect so that Google would only index the right site and all links would come to the right place. To do this I just had to edit the Nginx configuration in Laravel Forge and that isn't actually too hard.

First, click on your server and then click into manage the site you want to perform a redirect for. At the bottom there is a little edit dropdown which opens up to let you edit your Nginx configuration. Once the modal pops open you can prefix your site configuration.

    server {
        server_name dwightwatson.com
        return 301 $scheme://www.dwightwatson.com$request_uri;
    }

    # The rest of your normal configuration follows...

Of course, if you want to do the other and redirect to remove the `www.` you can just switch those settings around.

    server {
        server_name www.dwightwatson.com;
        return 301 $scheme://dwightwatson.com$request_uri;
    }

And don't forget to replace the server name with your own site!
