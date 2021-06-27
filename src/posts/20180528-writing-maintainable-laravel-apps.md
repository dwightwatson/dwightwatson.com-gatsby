---
title: Writing maintainable Laravel apps
path: /posts/writing-maintainable-laravel-apps
author: Dwight Watson
date: 2018-05-28
tags: ["laravel"]
---

I currently work on a 5 year old Laravel app. The first commit was back in June 2013 just as Laravel 4.0 had been released. Since then it has been consistently updated through every major Lavarel version. Along the way it has adopted new framework conventions, remain a joy to work on and continues to serve millions of users every year.

Maintaining your app over time can be hard work, but it does pay off. The more effort you put in to keeping it up to date and in line with community standards the less friction you'll run into going forward. It prevents you from getting bogged down in legacy code and allows you to keep moving quickly.

This post will cover some of the practices our team uses to keep apps tight and maintainable through years of continued development. From keeping dependencies up to date, staying in touch with framework changes, following the "Laravel Way" and writing tests you're benefiting your development team and your customers.

## Do your updates

It's important to keep the dependencies of your app up to date - both front- and back-end. Running `composer update` and `yarn upgrade` once a week or so ensure that you're on the latest releases. There are a number of good reasons to do this.

1. New releases often contain bug fixes or patch security flaws.
2. Your team to use new features which can be both enjoyable to use but also improve your existing code.
3. It eases the pain for when you are forced to do updates (for example, a major Laravel release).

### Bug fixes/security patches

This one is self-explanatory. Bugs and security flaws are found all the time and patch releases plug them up. By ensuring that you are running the latest code often you can help prevent your app from being vulnerable.

### New features

Sometimes new releases will introduce features or syntax that can improve the developer experience. Laravel patch releases often include functionality that can clean up your code.

> For example, the `now()` function that was introduced to give you quick access to `Carbon\Carbon::now()`. Also, the date-oriented query builder helpers like `whereMonth()` which added native support for querying dates instead of having to use raw SQL.

Giving your developers the chance to use the latest features helps build morale and gives them incentive to stay up to date with what is new. When you start implementing code that uses these new features you expose it to other developers which can in turn help them improve the code they write.

### Ease the pain for major updates

Major releases can sometimes be a pain to upgrade to. Luckily most versions of Laravel have a simple migration path (though some have been more difficult than others - like 4.2 to 5.0). By making an effort to keep your dependency chain up-to-date the easier it will be to maintain your code going forward.

If you leave your dependencies and then return to upgrade a lot at once it is likely you'll run into issues compatibility issues where things don't work or tests don't pass. It can be really hard to isolate which specific change broke your app. By constantly updating incrementally you can ease the frustration in identifying the culprit when other upgrades don't work.

### Don't forget about outdated dependencies

Even when you do your updates religiously remember that you can still end up running old versions of depenendies. This is because these update will only fetch changes that meet the constraints of your `composer.json` and `package.json` files. If there are new releases that don't meet these constraints then you won't know about them - for example, `~2.0` will be totally unaware that later versions like `3.0` exist.

For this reason it's also important to run `composer outdated` and `yarn outdated` from time to time. These will show you a list of what dependencies you're using that are not actually the latest release available.

Often there will not be much you can do about these - if they are dependencies of your dependencies that are locked to specific constraints then you'll need to wait until they have updated these constraints themselves.

However if there are new releases then it is worth revisiting their documentation/changelogs. If there's nothing major you can spend the 5-10 minutes required to make and changes and update your dependency constraints, otherwise allocate some time to make the changes when you have a chance.

---

There are a number of benefits to keeping your dependencies updated but at the end of the day it comes down to keeping your app secure, your developers happy and making it easier for you to upgrade to newer versions of Laravel as they become available. Do your updates.

## Keep your finger on the pulse

The Laravel community has grown substantially over the last few years. It is lucky to have a large following, especially with the number of vocal contributors that help develop the framework further and benefit the audience around it.

It is important to keep in tune with this community the changes it brings along the way. It gives you an opportunity to participate in this conversation (if you so desire). It also gives you insight into the way other Laravel developers are writing code which can help inspire and improve your own.

> For example, validation in Laravel has evolved a number of times. From calling manually `Validator::make()` to being able to call `$this->validate($request, [...])` in your controllers and finally to `FormRequest`s and requests that can validate themselves. All of these options _still_ work but it's important to know what's newer and what people are using.

As these sorts of changes propagate around I have always found it best to follow the convention, even when it's something I might not have a preference for. We use a "convention over configuration" framework so that we have less decisions to make.

> Another example is when Laravel had it's own code style guide and later switched to PSR-2. The change did annoy a lot of people but it did bring Laravel back into line with the rest of the modern PHP community.

### New release changelogs

With every new release of Laravel (even the minor patch releases) the GitHub repo is updated with a breakdown of the changes included. This outlines clearly what is new, what has changed and what has been fixed along with references to the associated commits and pull requests.

By staying on top of these changes you'll get insight into a lot of what goes on under the hood that usually goes unnoticed. New helpers that could improve your code, or changes/fixes that might affect your code are important to be aware of.

Often great new functionality is included in Laravel but never makes its way to documentation or other channels which means developers are never exposed to it. If you see something you like, make an effort to apply it to your app.

Shout out to [Till Krüss](https://github.com/tillkruss) who is often responsible for the maintenance of these changelogs.

### Laravel News Podcast

If the changelog is perhaps too dry or abstract for your liking you shouldn't miss out. The [Laravel News Podcast](https://laravel-news.com/podcast) is another way to stay on top with what is going on in the community.

They'll often cover the aforementioned changelogs but also discuss the relevance and importance of these changes in real-world applications. For many it can be easier to throw a podcast on during the commute rather than read through release notes.

### Vocal contributors

Laravel is lucky to have a lot of vocal contributors that provide the community with a lot of useful material and resources.

If you use Twitter or enjoy listening to Podcasts then these are definitely some people worth following, or at least checking out the resources they publish. These guys are leading the Laravel community so they can help you get a feel for what the framework is going through and the direction it's heading in.

#### Taylor Otwell

Obviously the creator of the framework [Taylor Otwell](https://twitter.com/taylorotwell) is a great place to start. He often tweets about problems he's solving or code that he's riffing on. He also wrote [Laravel: From Apprentice to Artisan](https://leanpub.com/laravel) which provides some solid insight into some core patterns in the framework.

#### Jeffrey Way

You know [Jeffrey Way](https://twitter.com/jeffrey_way) as the guy behind [Laracasts](https://laracasts.com/). While he's not only teaching people about Laravel and the framework it's important to remember that he's running a substantial app as well, which he often provides insight into.

#### Adam Wathan

[Adam Wathan](https://twitter.com/adamwathan) also often discusses interesting problems and tackling them in (arguably) better ways. His book [Refactoring to Collections](https://adamwathan.me/refactoring-to-collections/) is just one example of his great resources, including the video courses he sells. His podcast [Full Stack Radio](http://www.fullstackradio.com/) has a tonne of technical interviews/discussions on current and emerging tech.

#### Matt Stauffer

[Matt Stauffer](https://twitter.com/stauffermatt) wrote the book (literally) on getting started - [Laravel: Up & Running](https://laravelupandrunning.com/). In addition he runs a Laravel agency which means he has a lot of insight into consistency creating solid apps shared [on his blog](https://mattstauffer.com/). He also hosts the [Laravel Podcast](http://www.laravelpodcast.com/) which has also featured Taylor and Jeffrey.

---

If you can find a way to keep up to date with the changes in the framework and the direction the community is moving it will help you keep your code up-to-date and (hopefully) more future proof. Not everyone will have time for Twitter and listening to podcasts, but the changelogs are a great place to start.

## The Laravel Way

Laravel is a "convention over configuration" framework. This means it's heavily opinionated in the way things should work rather than giving us complete flexibility.

This is beneficial to us as developers as it means there are less decisions for us to make - we can focus on creating the parts of the app that matter. It also makes our apps more familiar as we onboard new developers who will recognise the consistency of the patterns used.

> I should note that while Laravel is opinionated it is still very flexible - it's rare that I've come across some sort of default that I can't customise. However, let's not stray too far from that default.

The "Laravel Way" is where you try and write code the way Taylor would write it (WWTD). If you write code the way the framework wants you to then you're on the path of least resistance - it will guide you along and you won't be fighting it. When you start to fight your framework things start to fall apart.

Here are just some of the conventions Laravel and it's ecosystem seem to follow and are worth considering adopting in your projects as well.

### RESTful resources

Take a look at the controller scaffold when you use the `--model` or `--resource` flags. It'll generate a controller for you with 7 actions that map to specific, unique actions you can take on a resource.

This is a convention that has flowed over from Rails and there is quite a bit you can read about it online. Effectively you use a single controller to manage each of the actions for a resource (or model).

| Request                  | Controller               |
| :----------------------- | :----------------------- |
| `GET /posts`             | `PostController@index`   |
| `GET /posts/create`      | `PostController@create`  |
| `POST /posts`            | `PostController@store`   |
| `GET /posts/{post}`      | `PostController@show`    |
| `GET /posts/{post}/edit` | `PostController@edit`    |
| `PUT /posts/{post}`      | `PostController@update`  |
| `DELETE /posts/{post}`   | `PostController@destroy` |

The `index` action is responsible for showing a list of the posts, `create`/`store` are for the form and storing a new post, `show` for displaying a single post, `edit`/`update` for the form and updating an existing post and finally `destroy` for removing a single resource.

If you follow this convention you'll keep your controllers smaller and single purpose, along with keeping your code in predictable locations so you and others can find it when you need.

### Vue.js

Laravel now ships with a Vue.js scaffold. There are presets to switch it out to other front-end libraries if you need, but there is some real benefit to sticking with the default.

A lot of community education now is around Laravel & Vue.sj integration - think Laracasts and series by Adam Wathan. This means when new Laravel developers join your team they are more likely to be familiar with Vue and able to get off the ground sooner.

In addition the Laravel ecosystem includes a number of other tools that leverage Vue.js. Spark, Passport and Horizon all ship with Vue.js components that you'll want to use if you use these packages. If you're already using React or something else then you might end up with having both frameworks installed just for these features.

### Strong parameters

Laravel models feature protection against mass assignment. This is meant to prevent you from accidentally passing all the request input into a model create/update query. Without this attackers could attempt to alter columns in the database that should be out of their reach.

```php
/**
 * The attributes that aren't mass assignable.
 *
 * @var array
 */
protected $guarded = ['*'];
```

By default models have everything guarded so it requires you to customise the model in order to make the appropriate attributes fillable. Generally this means setting `$fillable` on your model as whitelist.

```php
/**
 * The attributes that aren't mass assignable.
 *
 * @var array
 */
protected $guarded = [];
```

However, there has been some pretty vocal discussion about this. Many in the community have instead adopted another approach whereby you remove mass assignment protection from your models and instead whitelist request parameters in your controllers.

```php
/**
 * Store a newly created resource in storage.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return \Illuminate\Http\Response
 */
public function store(Request $request)
{
    $post = Post::create($request->only('title', 'content'));

    return redirect()->route('posts.show', $post);
}
```

> This example obviously forgoes validation, but it's also worth nothing that the return value of `$this->validate()` or `$request->validate()` is the input filtered by fields that are validated. If you validate for only the fields you want to assign to your model then you can use that return value instead of `$request->only()`.

---

By writing code the way the framework expects you to you're making it easier for yourself and others to follow along. It's more likely to stand the test of time as it won't be broken by backwards incompatible changes in the framework.

## Make the hard changes

As we progress as developers and as our apps change we are bound to come across (and come up with) better ways of doing things we've already built. There are parts of our apps that work alright, but if we were going to write that again today it would be totally different. But to migrate to a better system is going to be a pain in the ass.

Often, I find it's best to just rip this band-aid off.

This goes against the old "if it ain't broke, don't fix it" argument, and I get that. But I don't see it as unnecessary change and instead look at the benefits that can be reaped.

Cleaning up the sore points of your app that haven't aged well can improve the happiness of your developers, increase the development of future features and simplify the architecture of your app.

Often you might leave these sorts of feature rewrites until something comes along that requires some substantial changes and it gives you a good opportunity to make some overreaching improvements. However there have been times I've scheduled these sorts of changes just to better the app.

> One example of this has been our (as yet, incomplete) project to replace our jQuery code with Vue components. The jQuery code _worked fine_ and our customers will see no benefit from the migration to Vue components, but there's a morale boost in moving the app forward by adopting Laravel's front-end framework of choice and leaving old, unpleasant code behind.

---

This might be a more controversial suggestion but it's an approach I've worked with for a while and it hasn't bitten me in the ass _yet_. If you have the time to fix old design decisions even though it's going to hurt I think it's worth it.

## Write tests

First getting into testing _is hard_. It's hard to get a sense of what to test and how to test it. It's hard to convince your superiors that the additional time to learn and implement these flows are worth it. The thing is that they are very much worth it.

> If you don't have tests in your app then there's no better time to start then now. You don't need to start from scratch, instead just incrementally add tests as you can. For some real-world learning check out [Test Driven Laravel](https://course.testdrivenlaravel.com/) by Adam Wathan.

Once you start to build test coverage you're also building confidence. You can be confident when you push a new feature or make a change to existing code that you haven't broken anything. This helps your team move faster as you're not wasting time manually testing flows, which also means happier customers.

This confidence extends to your maintenance cycle as well. When you pull in new dependencies you can run your tests and see if all it still well. When you re-write a controller to be more RESTful or take advantage of some new fancy feature of Laravel you can be sure that you haven't broken anything.

On this project we're only up to around 60% test coverage. You don't need to aim for 100% coverage - and any coverage is better than none. However, the coverage we have is over the most important user flows (and includes Laravel Dusk tests, actually run inside a real browser). Getting these most important flows covered by tests gives you the most bang for your buck in terms of knowing you aren't impacting customer experiences.

---

Having any test coverage gives you the freedom to move fast without worrying about impacting your customers. You can test against new dependencies and also attempt solid refactoring of your code with ease.

## Worth it

Maintaining a Laravel app over time takes a lot of time and care. I don't think it's important to do for every use-case. If you have small apps that are not touched often then it's fine to leave them as-is and deal with any pain points as they come up. But if you have an app that is going to see continued use then it it well worth the effort to incrementally keep it up to date.

Keeping your dependencies up to date is a dull but it's easy enough. Keeping on top of changes in the community and getting a feel for the direction of the framework help you write more future-proof code. Getting a feel for the "Laravel Way" means your code will be simpler and less fragile through new releases. Writing tests gives you the confidence to keep moving forward without breaking anything for your customers.
