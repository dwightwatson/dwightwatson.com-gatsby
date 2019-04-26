---
title: "Using Fractal with Laravel and Lumen"
path: /posts/using-fractal-with-laravel-and-lumen
author: Dwight Watson
date: 2015-06-17
tags: ["laravel", "lumen", "php"]
---

Using Fractal with Laravel/Lumen

I've recently discovered the immense joy of using [The PHP League's Fractal](http://fractal.thephpleague.com/) to generate responses for JSON APIs over hacking my Eloquent models from Laravel and Lumen to give me the output I want. Much like the ActiveModel Serializer for Rails this package gives you fine control over the exact output you give to clients, and more importantly it separates the logic for your JSON formation from your Eloquent model. Now that I've had the pleasure of developing sane APIs for a while I thought I'd document some of the ways I integrated Fractal with my Laravel and Lumen applications (it has to be done differently in Lumen as it doesn't support `Response` macros).

# Custom serializers
First off, the Fractal supports a number of [serializers](http://fractal.thephpleague.com/serializers/) for generating a structure for your response. It will default to one called `DataArraySerializer` which effectively adds a root `data` key to your response, so if you're okay with that you can skip this step. If you'd like to use another serializer then you should register the `Manager` class with the IoC container, either in the `AppServiceProvider` or another one if you find it more appropriate. Note that at this stage the support for the `JSON-API` standard isn't yet complete.

```
public function register()
{
    $this->app->bind('League\Fractal\Manager', function($app) {
        $manager = new \League\Fractal\Manager;

        // Use the serializer of your choice.
        $manager->setSerializer(new \App\Http\Serializers\RootSerializer);

        return $manager;
    });
}
```

# Creating transformers
Next, you'll need to create some transformers - one for every type of Eloquent model you're going to want to output through the API. For this example I'll use a blog, where an `App\User` model has many `App\Post` models, and we want to return the user with their posts. I create a transformers directory inside my `Http` directory: `app/Http/Transformers` and then I can create two transformers; one for my `User` model and one for my `Post` model.

The `User` transfomer is easy, just return the fields that my API requires. Note that in this example my `User` model has an `is_admin` attribute which is a boolean. I could cast that in the transformer with a `(bool) $user->is_admin` but Laravel 5.0+ allows you to use the `$casts` property on the model and then Eloquent can handle the casting for you. This sort of thing is better off handled in your model as then it is application-wide.

```
<?php namespace App\Http\Transformers;

use App\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{
    /**
     * Turn this item object into a generic array.
     *
     * @param  \App\User  $user
     * @return array
     */
    public function transform(User $user)
    {
        return [
            'id'         => $user->id,
            'first_name' => $user->first_name,
            'last_name'  => $user->last_name,
            'email'      => $user->email,
            'is_admin'   => $user->is_admin,
            'created_at' => $post->created_at->toDateTimeString(),
            'updated_at' => $post->updated_at->toDateTimeString()
        ];
    }
}
```

Because the date properties on an Eloquent model are actually instances of `Carbon` you can use the handy helpers that provides to return the date in the format you prefer. In this instance, `toDateTimeString()` will be of the format `Y-m-d H:i:s`.

Next we need a transformer for the `Post` model. This will differ slightly because we want to include the associated `User` model with this response. You can read more [about including data in the transfomers documentation](http://fractal.thephpleague.com/transformers/).

```
<?php

namespace App\Http\Transforers;

use App\Post;
use League\Fractal\TransformerAbstract;

class PostTransformer extends TransformerAbstract
{
    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = ['user'];

    /**
     * List of resources to automatically include.
     *
     * @var array
     */
    protected $defaultIncludes = ['user'];

    /**
     * Turn this item object into a generic array.
     *
     * @param  \App\Post  $post
     * @return array
     */
    public function transform(Post $post)
    {
        return [
            'id'           => $post->id,
            'title'        => $post->title,
            'content'      => $post->content,
            'created_at'   => $post->created_at->toDateTimeString(),
            'updated_at'   => $post->updated_at->toDateTimeString(),
            'published_at' => $post->published_at->toDateTimeString()
        ];
    }

    /**
     * Include user.
     *
     * @param  \App\Post  $post
     * @return League\Fractal\ItemResource
     */
    public function includeLevels(Post $post)
    {
        return $this->item($post->user, new UserTransformer);
    }
}
```

*Note that you can also return `$this->collection` from within a transformer if you wanted to attach a collection rather than an item.*

# Generating responses in Laravel
With Laravel I would usually make a `FractalServiceProvider` that has the `register()` method I described earlier and would then register some response macros in the `boot()` method as you can see here. This adds two additional methods to Laravel's `Response` factory making it easy to return item or collection responses.

*Note that I typehint the transformer to be an instance of `TransformerAbstract` - this is because I always create transformers for my responses instead of the closure syntax as I believe it keeps my codebase better structured. If you'd rather use the closure syntax instead of a transformer then simply remove the typehint from that argument.*

```
public function boot()
{
    $fractal = $this->app->make('League\Fractal\Manager');

    response()->macro('item', function ($item, \League\Fractal\TransformerAbstract $transformer, $status = 200, array $headers = []) use ($fractal) {
        $resource = new \League\Fractal\Resource\Item($item, $transformer);

        return response()->json(
            $fractal->createData($resource)->toArray(),
            $status,
            $headers
        );
    });

    response()->macro('collection', function ($collection, \League\Fractal\TransformerAbstract $transformer, $status = 200, array $headers = []) use ($fractal) {
        $resource = new \League\Fractal\Resource\Collection($collection, $transformer);

        return response()->json(
            $fractal->createData($resource)->toArray(),
            $status,
            $headers
        );
    });
}
```

With this in place, it's really easy to generate a single response (say for a user) and collection responses (say for all blog posts).

```
/**
 * GET /users/1
 *
 * @param  int  $userId
 * @return \Illuminate\Http\Response
 */
public function showUser($userId)
{
    $user = \App\User::findOrFail($userId);

    return response()->item($user, new \App\Http\Transformers\UserTransformer);
}

/**
 * GET /posts
 *
 * @return \Illuminate\Http\Response
 */
public function showPosts()
{
    $posts = \App\Post::with('user')->get();

    return response()->collection($posts, new \App\Http\Transformers\PostTransformer);
}
```

If you need to use a different HTTP response status, like `201` for created or `204` for no content, then you can easily pass that as the third parameter to the macro.

# Generating responses in Lumen
With Lumen I need to use a slighty different approach to create these responses, as Lumen does not support macros on the `Response` factory. Instead, I add these methods to my base controller for the API.

```
/**
 * Create the response for an item.
 *
 * @param  mixed                                $item
 * @param  \League\Fractal\TransformerAbstract  $transformer
 * @param  int                                  $status
 * @param  array                                $headers
 * @return Response
 */
protected function buildItemResponse($item, \League\Fractal\TransformerAbstract $transformer, $status = 200, array $headers = [])
{
    $resource = new \League\Fractal\Resource\Item($item, $transformer);

    return $this->buildResourceResponse($resource, $status, $headers);
}

/**
 * Create the response for a collection.
 *
 * @param  mixed                                $collection
 * @param  \League\Fractal\TransformerAbstract  $transformer
 * @param  int                                  $status
 * @param  array                                $headers
 * @return Response
 */
protected function buildCollectionResponse($collection, \League\Fractal\TransformerAbstract $transformer, $status = 200, array $headers = [])
{
    $resource = new \League\Fractal\Resource\Collection($collection, $transformer);

    return $this->buildResourceResponse($resource, $status, $headers);
}

/**
 * Create the response for a resource.
 *
 * @param  \League\Fractal\Resource\ResourceAbstract  $resource
 * @param  int                                        $status
 * @param  array                                      $headers
 * @return Response
 */
protected function buildResourceResponse(\League\Fractal\Resource\ResourceAbstract $resource, $status = 200, array $headers = [])
{
    $fractal = app('League\Fractal\Manager');

    return response()->json(
        $fractal->createData($resource)->toArray(),
        $status,
        $headers
    );
}
```

With these methods in place, you can now call them on any of the children controllers to create the same responses as you would have with Laravel.

```
return $this->buildItemResponse($user, new \App\Http\Transformers\UserTransformer);

return $this->buildCollectionResponse($posts, new \App\Http\Transformers\PostTransformer);
```
