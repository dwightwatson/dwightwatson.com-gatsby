---
title: "Scaffolding Laravel tests"
path: /posts/scaffolding-laravel-tests
author: Dwight Watson
date: 2017-08-13
tags: ["laravel", "php", "phpunit", "testing"]
---

I’ve been a big fan of forced resourcefulness – that is to ensure your controllers map to a single resource only and have exposed at most the 7 resourceful actions; `index`, `create`, `store`, `show`, `edit`, `update`, `destroy` (or similar, depending on what framework you’re using). 

There are many benefits to writing your apps this way, including keeping your code organised, your classes shorter and cleaner and easier to navigate. In addition it also allows you to scaffold the CRUD logic relatively easy. Not in the sense of using controller generators (not ruling that out, though), but that the core logic in a CRUD controller generally matches a pattern.

The `index` action will get a collection of the resource and return a view. The `create` action will return a view. The `store` action will validate a request, create a resource and redirect. The `show` and `edit` actions will fetch a resource and return a view. The `update` action will validate a request, fetch and update a resource and redirect. The `destroy` action will fetch and destroy a resource and redirect. Simple.

As an example of a resourceful controller let’s take a look at the [`PostsController.php`](https://github.com/dwightwatson/gold-standard/blob/master/app/Http/Controllers/PostsController.php) that I put together as part of my [`gold-standard`](https://github.com/dwightwatson/gold-standard) repository.  It’s a demonstration (at the most basic level) how a controller would fulfil the requirements of all 7 actions. 

```php
&lt;?php

namespace App\Http\Controllers;

use App\Post;
use App\Http\Requests\PostRequest;

class PostsController extends Controller
{
    /**
     * GET /posts
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $posts = Post::latest()-&gt;get();

        return view(&#039;posts.index&#039;, compact(&#039;posts&#039;));
    }

    /**
     * GET /posts/create
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view(&#039;posts.create&#039;);
    }

    /**
     * POST /posts
     *
     * @param  \App\Http\Requests\PostRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(PostRequest $request)
    {
        $post = Post::create($request-&gt;all());

        return redirect()-&gt;route(&#039;posts.show&#039;, $post)
            -&gt;withSuccess(&#039;Post was created successfully.&#039;);
    }
    /**
     * GET /posts/1
     *
     * @param  \App\Post  $post
     * @return \Illuminate\View\View
     */
    public function show(Post $post)
    {
        return view(&#039;posts.show&#039;, compact(&#039;post&#039;));
    }

    /**
     * GET /posts/1/edit
     *
     * @param  \App\Post  $post
     * @return \Illuminate\View\View
     */
    public function edit(Post $post)
    {
        return view(&#039;posts.edit&#039;, compact(&#039;post&#039;));
    }

    /**
     * PUT /posts/1
     *
     * @param  \App\Post  $post
     * @param  \App\Http\Requests\PostRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Post $post, PostRequest $request)
    {
        $post-&gt;update($request-&gt;all());

        return redirect()-&gt;route(&#039;posts.show&#039;, $post)
            -&gt;withSuccess(&#039;Post was updated successfully.&#039;);
    }

    /**
     * DELETE /posts/1
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Post $post)
    {
        $post-&gt;delete();

        return redirect()-&gt;route(&#039;posts.index&#039;);
    }
}
```

When writing new controllers I often follow this scaffold so that my code is clean and predictable. You completely cover the necessary actions of a resource in just under 100 lines. If we take this approach to scaffolding/templating our resourceful controllers we can take this one step further as well - apply it to our tests.

Now let’s take a look at [`PostsControllerTest.php`](https://github.com/dwightwatson/gold-standard/blob/master/tests/Feature/PostsControllerTest.php) also in the `gold-standard` repository. This template provides tests for all 7 actions and their expected outcomes, including validation errors when creating and updating a resource.

```php
&lt;?php

namespace Tests\Feature;

use App\Post;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PostsControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    function it_displays_the_index_page()
    {
        $response = $this-&gt;get(&#039;/posts&#039;);

        $response-&gt;assertStatus(200);
    }

    /** @test */
    function it_displays_the_create_page()
    {
        $response = $this-&gt;get(&#039;/posts/create&#039;);

        $response-&gt;assertStatus(200);
    }

    /** @test */
    function it_stores_a_valid_post()
    {
        $attributes = factory(Post::class)-&gt;raw();

        $response = $this-&gt;post(&#039;/posts&#039;, $attributes);

        $post = Post::first();

        $response-&gt;assertRedirect(&quot;/posts/{$post-&gt;id}&quot;);
    }

    /** @test */
    function it_does_not_store_invalid_post()
    {
        $response = $this-&gt;post(&#039;/posts&#039;, []);

        $response-&gt;assertSessionHasErrors();

        $this-&gt;assertNull(Post::first());
    }

    /** @test */
    function it_displays_the_show_page()
    {
        $post = factory(Post::class)-&gt;create();

        $response = $this-&gt;get(&quot;/posts/{$post-&gt;id}&quot;);

        $response-&gt;assertStatus(200);
    }

    /** @test */
    function it_displays_the_edit_page()
    {
        $post = factory(Post::class)-&gt;create();

        $response = $this-&gt;get(&quot;/posts/{$post-&gt;id}/edit&quot;);

        $response-&gt;assertStatus(200);
    }

    /** @test */
    function it_updates_valid_post()
    {
        $post = factory(Post::class)-&gt;create();

        $attributes = factory(Post::class)-&gt;raw([&#039;title&#039; =&gt; &#039;Updated&#039;]);

        $response = $this-&gt;put(&quot;/posts/{$post-&gt;id}&quot;, $attributes);

        $response-&gt;assertRedirect(&quot;/posts/{$post-&gt;id}&quot;);

        $this-&gt;assertEquals(&#039;Updated&#039;, $post-&gt;fresh()-&gt;title);
    }

    /** @test */
    function it_does_not_update_invalid_post()
    {
        $post = factory(Post::class)-&gt;create([&#039;title&#039; =&gt; &#039;Example&#039;]);

        $response = $this-&gt;put(&quot;/posts/{$post-&gt;id}&quot;, []);

        $response-&gt;assertSessionHasErrors();

        $this-&gt;assertEquals(&#039;Example&#039;, $post-&gt;fresh()-&gt;title);
    }

    /** @test */
    function it_deletes_post()
    {
        $post = factory(Post::class)-&gt;create();

        $response = $this-&gt;delete(&quot;/posts/{$post-&gt;id}&quot;);

        $response-&gt;assertRedirect(&#039;/posts&#039;);

        $this-&gt;assertNull($post-&gt;fresh());
    }
}
```

You can see that the template is pretty simple, and not much longer than the controller itself. It utilises model factories to interact with actual models and generate model attributes on the fly. It hits the database hard and fast to actually test the application is working how you expect.

For the most part it’s easy to see how you can re-purpose a scaffold like this when working with a resourceful controller. If you’re using Artisan commands or Sublime Text/whatever text editor you use snippets to generate controller code, consider doing the same with your tests.

Write tight resourceful controllers and you can drop in these resourceful controller tests with little customisation to get them green and give you confidence that your app works.
