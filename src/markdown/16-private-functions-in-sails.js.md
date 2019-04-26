---
title: "Private functions in Sails.js"
path: /posts/private-functions-in-sails.js
author: Dwight Watson
date: 2013-08-13
tags: ["sails.js"]
---

In modern frameworks you are usually able to define controller functions as being public or private, indicating whether or not they are callable from the browser. You might use private functions to encapsulate certain functionality or just to keep certain parts of your application inaccessible from the public. In Sails.js, it isn&#039;t as clear as it might be elsewhere as to how to create private functions.

    module.exports = {
		index: function(req, res) {
			privateFunction();
			anotherPrivateFunction();
		}
	}
	
	function privateFunction() {
		console.log(&quot;This function can only be called from within the controller!&quot;);
	}
	
	var anotherPrivateFunction = function() {
		console.log(&quot;This function can also only be called from within the controller!&quot;);
	}
	
Now you can implement private functions in your own Sails.js controllers!
