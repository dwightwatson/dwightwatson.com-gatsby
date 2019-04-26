---
title: "Bootstrap 3 pagination in Laravel 4"
path: /posts/bootstrap-3-pagination-in-laravel-4
author: Dwight Watson
date: 2013-08-09
tags: ["bootstrap", "laravel"]
---

There is a little markup change in the way that pagination works between Bootstrap 2 and Bootstrap 3. At the moment (I assume while Bootstrap 3 is still in the release candidate state) the default Laravel markup for pagination supports Bootstrap 2. However, if your project is living life on the edge, it&#039;s a pretty simple upgrade.

First, copy the default pagination view from the framework. It&#039;s located in `vendor/laravel/framework/Illuminate/Pagination/views/slider.php`. Then pop your copy into your `app/views` folder (or in a subfolder, `_partials` folder if you like). I tend to keep the same file name just for the sake of it.

Then, replace the old Bootstrap 2 markup:

    &lt;div class=&quot;pagination&quot;&gt;
	    &lt;ul&gt;
		    &lt;?php echo $presenter-&gt;render(); ?&gt;
		&lt;/ul&gt;
	&lt;/div&gt;
	
With the brand-spanking new Bootstrap 3:

    &lt;ul class=&quot;pagination&quot;&gt;
	    &lt;?php echo $presenter-&gt;render(); ?&gt;
	&lt;/ul&gt;
	
Finally, just tell Laravel which view file to use. Open `app/config/view.php` and replace `pagination::slider` with `slider` (or include the directory location relative to your views folder if you put it in a subdirectory). Easy, Bootstrap 3 pagination in Laravel 4!
