---
title: "Custom targeting with DoubleClick (DFP)"
path: /posts/custom-targeting-with-doubleclick-(dfp)
author: Dwight Watson
date: 2014-03-19
tags: ["google", "laravel", "php"]
---

We had to insert some custom targeting tags for our advertisments this week and a lot of the documentation I found popping up was old or unrelated. It took a little bit of time digging down the rabbit hole, but I was able to work out the current (March 2014) method of adding additional targeting data. It all starts with the `googletag.cmd.push()` method you use to initiate your ad units. Inside the closure, you're able to use the `setTargeting()` method to assign custom tags.

    <script type="text/javascript">
	    googletag.cmd.push(function() {
		    // Tag defintions ect. go here.

		    // Create a custom tag
		    googletag.pubads().setTargeting('gender', 'Male');

		    googletag.pubads().enableSingleRequest();
		    googletag.enableServices();
	    });
    </script>

Of course, if you want to use dynamic tags it's still pretty easy. Here's a Laravel example.

    @if(Auth::check())
	    googletag.pubads().setTargeting('gender', '{{{ Auth::user()->gender }}}');
    @endif

Hopefully this is helpful to some people. I figure the more blogs that publish the new way of doing things the further down the old blog posts will move down the Google rankings.
