---
title: "Greater than and less than validation in Laravel 4"
path: /posts/greater-than-and-less-than-validation-in-laravel-4
author: Dwight Watson
date: 2013-11-30
tags: ["laravel", "php"]
---

Just wrote some new validators for testing whether one attribute is greater than or less than another attribute in a Laravel 4 form. Here&#039;s the implementation, as well as how you can adjust the error messages.

 Validator::extend(&#039;greater_than&#039;, function($attribute, $value, $parameters)
	{
	 $other = Input::get($parameters[0]);
		
		return isset($other) and intval($value) &gt; intval($other);
	});
	
	Validator::extend(&#039;less_than&#039;, function($attribute, $value, $parameters)
	{
		$other = Input::get($parameters[0]);
		
		return isset($other) and intval($value) &lt; intval($other);
	});
	
Now, you can set up your validations!

    $validation = Validator::make(Input::all(), [&#039;childs_birth_year&#039; =&gt; &#039;greater_than:mothers_birth_year&#039;]);
	
Of course, if this validation fails, you&#039;re going to get an ugly error message (`validation.greater_than` to be specific). To override this, take a look in `app/lang/en/validation.php` and find the `custom` key.

    &#039;custom&#039; = [
	    &#039;childs_birth_year&#039; =&gt; [
		    &#039;greater_than&#039; =&gt; &quot;Your child must have been born after the mother.&quot;
		]
	]
