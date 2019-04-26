---
title: "Simple Laravel 4 model auto-validation"
path: /posts/simple-laravel-4-model-auto-validation
author: Dwight Watson
date: 2014-04-08
tags: ["laravel", "php"]
---

I've long been a big fan of automatic model validation, ensuring that models refuse to save unless they meet their validation requirements. While the database schema can ensure certain data types are correct, null values are stored correctly and more, having actual model validation within your code opens up a plethora of more advanced options. Perhaps Rails spoilt me a little. In the past, I've requested automatic model validation in Laravel [and it was turned down](https://github.com/laravel/framework/issues/1169), but it is now [being reconsidered for Laravel 4.2](https://github.com/laravel/framework/issues/3751). Of course, there are packages like [Ardent](https://github.com/laravelbook/ardent) which can achieve the functionality, however that one in particular has grown to be pretty bloated well beyond it's original intent, and due to PHP's single inheritance it is difficult to use with other services, like Sentry.

However, implementing this yourself is pretty easy. Simply have your models extend a `BaseModel` which provides validation and error retrieval functionality:

	class BaseModel extends Eloquent
	{
		public $errors;

		public static $rules;

		public static function boot()
		{
			parent::boot();

			static::saving(function($model)
			{
				if ( ! $model->validate()) return false;
			});
		}

		public function validate()
		{
			$validation = Validator::make($this->attributes, static::$rules);

			if ($validation->passes()) return true;

			$this->errors = $validation->messages();

			return false;
		}
	}

Now, whenever you save a model you can test to see whether it was successful or not, and if not the validation messages are made available to you!
