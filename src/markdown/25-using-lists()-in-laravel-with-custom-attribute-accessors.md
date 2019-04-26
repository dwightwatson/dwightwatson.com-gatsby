---
title: "Using lists() in Laravel with custom attribute accessors"
path: /posts/using-lists()-in-laravel-with-custom-attribute-accessors
author: Dwight Watson
date: 2013-10-03
tags: ["laravel", "php"]
---

Sometimes when you&#039;re listing out a model for a select box or another form of displaying your data, you&#039;ll want to use a custom format for the list and keep the key as the row ID. You might want to get your collection first and then loop through it to create the array in the format you need, but there is a better way. 

For example in a project I&#039;m working on we want to list out all the subjects of a university displaying both the subject code and it&#039;s name. The way we go about this is to define a custom attribute getter on our `Subject` Eloquent model:

    public function getFullNameAttribute()
	{
	    return &quot;$this-&gt;code: $this-&gt;name&quot;;
	}
	
Now, when we have a `Subject` model with a code of &quot;ARTS3091&quot; and a name of &quot;Advanced Media Issues&quot;, we can get &quot;ARTS3091: Advanced Media Issues&quot; simply by calling the `$subject-&gt;full_name` attribute. Easy!

But how does this work when we want to list out subjects from the database - there isn&#039;t a `full_name` attribute in the database!

    Subject::lists(&#039;full_name&#039;, &#039;id&#039;);
	
If you tried that, you&#039;ll see it will fail for that very reason...

    SQLSTATE[42S22]: Column not found: 1054 Unknown column &#039;full_name&#039; in &#039;field list&#039; (SQL: select `full_name`, `id` from `subjects`) (Bindings: array ( ))

This is because `lists()` on the model will look up on the database. What we want is for `lists()` to look through a **collection** of models, that way each model will have the attribute that can be used!

    Subject::get()-&gt;lists(&#039;full_name&#039;);
	
Works a charm! So, when you&#039;re trying to list out using a custom accessor (to achieve a certain format or other reason), be sure to call it on a collection rather than directly on the model!
