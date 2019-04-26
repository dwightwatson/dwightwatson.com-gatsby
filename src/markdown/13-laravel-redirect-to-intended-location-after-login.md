---
title: "Laravel redirect to intended location after login"
path: /posts/laravel-redirect-to-intended-location-after-login
author: Dwight Watson
date: 2013-08-11
tags: ["laravel", "php"]
---

Interesting tidbit I discovered over the weekend when using the `auth` filter in Laravel 4 to redirect users where they had originally intended to go. Before I had found this, I was passing the intended location encoded in the URL and then picking it up in the login form, which in hindsight was pretty darn silly.

    Route::filter(&#039;auth&#039;, function()
	{
	    if ( ! Auth::check()) return Redirect::guest(&#039;login&#039;);
	}
	
If you actually look at the definition of the guest function of the redirector, you&#039;ll see that the intended location is actually saved into the session.

	public function guest($path, $status = 302, $headers = array(), $secure = null)
	{
		$this-&gt;session-&gt;put(&#039;url.intended&#039;, $this-&gt;generator-&gt;full());

		return $this-&gt;to($path, $status, $headers, $secure);
	}
	
And furthermore, the redirector also has a simple function that can perform a redirect to that intended location.

	public function intended($default, $status = 302, $headers = array(), $secure = null)
	{
		$path = $this-&gt;session-&gt;get(&#039;url.intended&#039;, $default);

		$this-&gt;session-&gt;forget(&#039;url.intended&#039;);

		return $this-&gt;to($path, $status, $headers, $secure);
	}
	
This way, after having a user login, it&#039;s really easy to shoot them off to where they intended to go without having to write all your own code.

	return Redirect::intended(&#039;/&#039;);
	
You need to pass a default location in case an intended location isn&#039;t provided in the session (which in this case would be the homepage). It&#039;s a really neat trick, I wish it was better documented, but it&#039;s always nice to stumble upon cute things like this by accident.
