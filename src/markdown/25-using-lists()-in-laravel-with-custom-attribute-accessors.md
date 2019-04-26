---
title: "Using lists() in Laravel with custom attribute accessors"
path: /posts/using-lists()-in-laravel-with-custom-attribute-accessors
author: Dwight Watson
date: 2013-10-03
tags: ["laravel", "php"]
---

Sometimes when you're listing out a model for a select box or another form of displaying your data, you'll want to use a custom format for the list and keep the key as the row ID. You might want to get your collection first and then loop through it to create the array in the format you need, but there is a better way.

For example in a project I'm working on we want to list out all the subjects of a university displaying both the subject code and it's name. The way we go about this is to define a custom attribute getter on our `Subject` Eloquent model:

    public function getFullNameAttribute()
	{
	    return "$this->code: $this->name";
	}

Now, when we have a `Subject` model with a code of "ARTS3091" and a name of "Advanced Media Issues", we can get "ARTS3091: Advanced Media Issues" simply by calling the `$subject->full_name` attribute. Easy!

But how does this work when we want to list out subjects from the database - there isn't a `full_name` attribute in the database!

    Subject::lists('full_name', 'id');

If you tried that, you'll see it will fail for that very reason...

    SQLSTATE[42S22]: Column not found: 1054 Unknown column 'full_name' in 'field list' (SQL: select `full_name`, `id` from `subjects`) (Bindings: array ( ))

This is because `lists()` on the model will look up on the database. What we want is for `lists()` to look through a **collection** of models, that way each model will have the attribute that can be used!

    Subject::get()->lists('full_name');

Works a charm! So, when you're trying to list out using a custom accessor (to achieve a certain format or other reason), be sure to call it on a collection rather than directly on the model!
