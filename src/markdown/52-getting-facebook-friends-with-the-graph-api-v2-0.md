---
title: "Getting Facebook friends with the Graph API v2.0"
path: /posts/getting-facebook-friends-with-the-graph-api-v2-0
author: Dwight Watson
date: 2014-05-02
tags: ["facebook"]
---

While a lot of cool stuff came out of [F8](https://fbf8.com) yesterday, including the brand new Graph API v2.0, there was one change that I didn&#039;t notice until just now that will greatly impact a lot of the apps I&#039;ve been involved with. In the past, we&#039;ve used Facebook login as a way to get at our user&#039;s friends, to help them connect and communicate with each other. For example, we could show a user the list of their friends that haven&#039;t yet joined the app and allow them to invite their friends. However, it seems with the new update we will no longer be able to do this. And all the apps that use this functionality in Graph API v1.0 will have only one more year, before being forced to update on April 30, 2015.

	// You used to be able to get a user&#039;s entire friends list.
    GET /v1.0/me/friends
	
	{
		&quot;data&quot;: [
			{
				&quot;id&quot;: &quot;594991415&quot;, 
				&quot;name&quot;: &quot;Dwight Conrad Watson&quot;
			},
			// all other friends
		]
	}
	
However, in the Graph API v2.0 there is an important addition to the `/me/friends` documentation:

	This will only return any friends who have used (via Facebook Login) the app making the request.
	
Ouch. 

So now, we can only display a user&#039;s friends who too have liked the app. What if I want to invite a user&#039;s friends to my app? Luckily for you, there&#039;s a `Invitable Friends API`. Unluckily for you (unless you make games...):

    Use of the Invitable Friends API is limited to Games with a Canvas presence using v2.0 of the Graph API. It may be called by mobile games as long as they also have a Canvas presence.
	
So at this point, as far as I can tell, you can no longer get a full list of a user&#039;s friends. At least we have 365 days to get used to it.
