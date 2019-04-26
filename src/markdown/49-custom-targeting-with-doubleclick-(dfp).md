---
title: "Custom targeting with DoubleClick (DFP)"
path: /posts/custom-targeting-with-doubleclick-(dfp)
author: Dwight Watson
date: 2014-03-19
tags: ["google", "laravel", "php"]
---

We had to insert some custom targeting tags for our advertisments this week and a lot of the documentation I found popping up was old or unrelated. It took a little bit of time digging down the rabbit hole, but I was able to work out the current (March 2014) method of adding additional targeting data. It all starts with the `googletag.cmd.push()` method you use to initiate your ad units. Inside the closure, you&#039;re able to use the `setTargeting()` method to assign custom tags.

    &lt;script type=&quot;text/javascript&quot;&gt;
	    googletag.cmd.push(function() {
		    // Tag defintions ect. go here.
		
		    // Create a custom tag
		    googletag.pubads().setTargeting(&#039;gender&#039;, &#039;Male&#039;);
		
		    googletag.pubads().enableSingleRequest();
		    googletag.enableServices();
	    });
    &lt;/script&gt;    

Of course, if you want to use dynamic tags it&#039;s still pretty easy. Here&#039;s a Laravel example.

    @if(Auth::check())
	    googletag.pubads().setTargeting(&#039;gender&#039;, &#039;{{{ Auth::user()-&gt;gender }}}&#039;);
    @endif    

Hopefully this is helpful to some people. I figure the more blogs that publish the new way of doing things the further down the old blog posts will move down the Google rankings.
