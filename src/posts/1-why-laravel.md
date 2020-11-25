---
title: "Why Laravel?"
path: /posts/why-laravel
author: Dwight Watson
date: 2013-07-18
tags: ["codeigniter", "composer", "laravel", "php"]
---

I've been using [Laravel 4](http://www.laravel.com) for a good 6 months or so now, both for personal and commercial products. At [Studious](http://www.studiousapp.com) we're also in the process of porting a number of apps across from [CodeIgniter](http://www.codeigniter.com) (based upon a call we made a while ago due to the apparent stagnation of development in the 3.0 branch, which [probably turned out to be the right one](http://ellislab.com/blog/entry/ellislab-seeking-new-owner-for-codeigniter)). Back then, it did seem very risky to drop all the existing development on an established framework in light of the hype around a relatively young new one, but I'm comfortable enough now knowing it was worth it.

CodeIgniter was, and still is, a great framework. It's fast, easy to install and setup, well documented and provides a great introduction to conventions like MVC. It's got a nice simple routing system, it's easy to extend and you can really pull a lot out of it. Studious was built on a highly extended CodeIgniter 2.1.3 and [Timetable Exchange](http://www.timetableexchange.com) was on top of a similarly extended CodeIgniter 3.0-dev. I'm happy to say we got everything we needed out of CodeIgniter and it was fun to work with, but anyone could see the writing was on the wall.

At the time, I wasn't familiar with [Composer](http://getcomposer.org/) or PHP testing, I was just fine plotting along. But some things did annoy me about CodeIgniter - namely a lack of an integrated authentication library (plus I wasn't really happy with the third-party options) and lack of integrated ORM (getting Doctrine running was a hassle and seemed like overkill in the end). Studious and Timetable Exchange both had custom authentication libraries built for them, though I've always been a fan of stock-standard first.

Now, I no longer need to miss out on things I wanted so badly in CodeIgniter. Plus, after my little stint in [Ruby on Rails](http://www.rubyonrails.org) I've come to appreciate many more things that did not exist so nicely in our old friend. In no particular order, here are some of the reasons I made the move to Laravel and fell in love.

## Composer

Previously, I wasn't too concerned with copying dependencies and libraries I wanted to use in my apps across to my projects. The libraries I did use I normally monitored pretty closely so I knew when updates came out and could pull them in when I wanted. With CodeIgniter libraries I never bothered with Sparks and would just grab what I wanted to use and be done with it.

The issues with this is that your dependencies can easily fall out of date, miss out on new features and bug fixes and that your application repository is now tracking third-party code which isn't necessary. Composer lets you pull in packages from a plethora of framework-agnostic PHP libraries and then autoloads them for you as you need. In addition, it will help you keep them organised, up to date and allow other developers on your project to easily download the required dependencies.

## Community

Seeing issues on the 3.0-dev branch of CodeIgniter just sit there unanswered and EllisLab so uncommitted to it's future or it's release were worrying signs enough, but you could easily see on sites like Reddit and Twitter that there was a trend toward Laravel. Laravel also had an amazing, active, and downright excited community preparing for the release of version 4, with GitHub issues being ticked off like no tomorrow through the beta, great new packages popping up, [TutsPlus](http://net.tutsplus.com/) articles and videos surfacing constantly and last-minute education for what's new and cool in PHP 5.3+.

I now, too, share this excitement and enthusiasm for Laravel 4 and think it is bringing enlightenment to a language that is often frowned upon. Laravel has great conventions, looks out for user security and steers developers away from the pitfalls of dodgy programming. With PHP being one of the most deployed languages on the web, I believe Laravel 4 will only serve to make it's stranglehold stronger.

## Authentication

This probably isn't a huge issue for most people, as they're happy to drop in an existing auth library to CodeIgniter or quickly throw together their own, but I love the fact theres a great auth class built straight into Laravel with a simple API. Though I've already switched many of my applications over to Sentry 2, it's very powerful to have a simple library in the framework good to go to help you bootstrap your apps.

## Migrations (and seeds)

With migrations it's super simple to put together a database that you can deploy anywhere and keep in sync amongst multiple development environments. They also make it easy to development your database structure over time, and keep track of the way your structure evolves through versions. Laravel's migrations are much more expressive and in-depth than CodeIgniters and also support a wider range of database servers, as well as the super-simple SQLite.

What's more, Laravel has seeding, which allows you to easily populate your database with sample data after a migration to keep testing and making sure you always have a working application to work with.

## ORM (Eloquent)

In our CodeIgniter apps we used a custom `MY_Model` (inspired by [Jamie Rumbelow's base model](http://docs.cartalyst.com/sentry-2)) which saved us from writing a lot of the same boilerplate code and providing a consistent API with which to access data from the database. While this was fine, especially with model validations, it was just difficult to get relationships working the way we wanted in a fashion we liked. Furthermore, actually installing an ORM like Doctrine into CodeIgniter was a pain and felt like too much of a hack to use in production.

With Laravel, we don't have to worry about it anymore. There is a query builder much like the one in CodeIgniter, but a simple ORM called Eloquent makes dealing with the database really easy and descriptive. Also the management of relationships between models in the database is really easy to setup and makes it so easy to deal with the related data in controller and views. You don't have to use an ORM in Laravel, but it certainly makes life a lot easier.

## Testing

I must admit that I am still getting into the whole testing thing, especially test-driven development (TDD), with the help of Jeffrey Way's eBook [Laravel Testing Decoded](https://leanpub.com/laravel-testing-decoded), I feel it's incredibly important to acknowledge the significance of application testing. Not only as a way of assisting you in writing simpler and organised code, you can ensure yourself that changes you make in one part of your application won't break functionality in another part. Testing is a great way of automatically ensuring that your application runs as you expect it to, and it's baked-in super simply with Laravel 4.

## Generators

While the Artisan command line tool allows you to easily generate migrations, there is a package available through Composer, also by Jeffrey Way, called [Laravel 4 Generators](https://github.com/JeffreyWay/Laravel-4-Generators), which takes generation to a whole new level. Much like the scaffolding features of Rails it becomes really simple for you to generate controllers, models, views and more in a single CLI command. Not technically a part of the core framework, but generators such as these make the development process much faster and more enjoyable!

## Environments

Not one of the biggest features, but Laravel provides automatic environment detection and makes it super easy to provide different configuration sets depending on the environment in use. When you have multiple developers on a project, developing and testing in different environments (be it MAMP, Vagrant or the Artisan server discussed below), it becomes a cinch to switch between them and keep your app working properly. It also means that errors and other debugging tools can always be kept hidden from the end-user, without having to worry about it.

## Server

Not just a feature of Laravel, but PHP 5.4 includes a built-in server which lets you quickly host small projects and run them in the browser. What is simply `php -S localhost:8000` is also available through Artisan with `php artisan serve`, which let's you easily develop your app in the local environment without having to run anything else.

Unrelated, but also very cool, is the ability to use SQLite database. While usually not appropriate for the production environment, you can use SQLite databases for your development environment along with the Artisan server to easily build your app without having to setup a server manually, through MAMP or say through a virtual machine with Vagrant.

In conclusion, I think that these features provide a compelling reason for CodeIgniter developers to consider the switch and maximise their development abilities and also make Laravel an important consideration with choosing a framework with which to develop a new PHP application. There is surely much more to be seen in the Laravel community and I believe we can expect many more exciting things to come of PHP in the future.

On a quick side note, I'm planning to start open-sourcing Studious components from CodeIgniter, including our framework extensions, authentication and timetabling libraries as well as some other bits and pieces. They were always intended to be open sourced to give back to the community, and will probably be offered as Composer packages as they are rebuilt.
