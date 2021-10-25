---
title: "Laravel 4 Model Validation Trait"
path: /posts/laravel-4-model-validation-trait
author: Dwight Watson
date: 2013-12-22
tags: ["laravel", "php"]
---

_EDIT: I've since written an updated post on this topic, [which you can read here](https://www.dwightwatson.com/posts/model-validation-in-laravel-using-traits). I decribe a new package that I've written for Laravel 4.2+ called [watson/validating](https://github.com/dwightwatson/validating) which is a more customizable and flexible model validation trait._

I'm not a fan of breaking validation out of the controller into seperate classes. It just feels like that the validation is getting too far from the form, to me anyway. I understand single responsibility and all that, but I continue to validate my forms in controllers. However, I still want to make sure that when I am saving data to the database, it is most definitely valid. There are a number of ways you can go about this: using Composer packages, extending the Eloquent model yourself, or as I propose here; using traits.

## Packages

There are a number of packages you can use which manage model validation in Laravel 4. The first is [Ardent](https://github.com/laravelbook/ardent), an older and more well-known package that began as a port of a similar Laravel 3 package. I used to like Ardent but it does a lot more than just validation now to make developers lives easier. Now I just feel like there is too much going on. The other well-known package is the aptly-named [Laravel-Model-Validation](https://github.com/JeffreyWay/Laravel-Model-Validation) by the Laracasts teacher, Jeffrey Way.

## Extend Model

The second option is to do it yourself! The approach I had taken before was to create a `BaseModel` class, much like the `BaseController` that ships with the framework and then hook into model events to enforce validation. I think this is a great option if you just want some lightweight validation, and you can choose which classes you want to use your model validation by having them extend `BaseModel` instead of `Eloquent`.

## Traits

Of course, you could instead use traits. It would work much the same as the `BaseModel` idea prior, but you get to use fancy new PHP and use the validation where you need while still allowing you to extend your models from anything you want. I've posted an example trait which you can use for model validation (by placing `use Studious\Traits\SelfValidation` at the top of your class, inside the opening braces and using whatever namespace you want). Of course, this can easily be adapted for a `BaseModel` approach if you would prefer.

```
<?php namespace Studious\Traits;

use Illuminate\Support\MessageBag;
use Validator;

trait SelfValidation {
    /**
     * Error message bag
     *
     * @var \Illuminate\Support\MessageBag
     */
    public $errors;

    /**
     * Hook into the model boot seqeuence and register events that
     * will allow for model validation.
     */
    public static function boot()
    {
        parent::boot();

        static::creating(function($model)
        {
            return $model->isValid();
        });

        static::updating(function($model)
        {
            return $model->isValid($model->removeUniquenessValidations());
        });
    }

    /**
     * Return validation errors.
     *
     * @return mixed
     */
    public function errors()
    {
        return $this->errors;
    }

    /**
     * Test to see if model is valid against provided rules.
     *
     * @param  array $rules
     * @return boolean
     */
    public function isValid(array $rules = array())
    {
        $rules = empty($rules) ? static::$rules : $rules;

        $validation = Validator::make($this->getAttributes(), $rules);

        if ($validation->fails())
        {
            $this->errors = $validation->messages();
            return false;
        }

        return true;
    }

    /**
     * Remove uniqueness validations from the ruleset.
     *
     * @return mixed
     */
    public function removeUniquenessValidations()
    {
        $rules = self::$rules;

        foreach($rules as $field => &$ruleset)
        {
            // If $ruleset is a pipe-separated string, switch it to array
            $ruleset = is_string($ruleset) ? explode('|', $ruleset) : $ruleset;

            // Look for, and remove unique validations
            foreach($ruleset as $key => &$current_rule)
            {
                if (strstr($current_rule, 'unique')) { unset($ruleset[$key]); }
            }
        }

        return $rules;
    }
}
```
