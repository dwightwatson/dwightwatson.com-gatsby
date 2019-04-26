---
title: "Laravel controller testing with TestDummy 2"
path: /posts/laravel-controller-testing-with-testdummy-2
author: Dwight Watson
date: 2014-12-22
tags: ["laravel", "php", "phpunit", "testing"]
---

Was excited to see this week that [TestDummy 2](https://github.com/laracasts/TestDummy) has been released, which fixes quite a few of the issues that I had with the first version. The Faker instance is now available in your model definitions, it&#039;s possible to create model definitions that extend each other (for example, a variation of a user that is an admin) and you no longer have to keep your definitions in one single YAML (!!!) file. I spent an afternoon on the weekend upgrading our test suite to use TestDummy 2.

First, require the new version of TestDummy in your `composer.json` file:

    &quot;require-dev&quot;: {
        &quot;laracasts/testdummy&quot;: &quot;~2.0&quot;
    }

Next, create a `factories` directory inside your tests folder. If you&#039;re using Laravel 4.2 you&#039;ll find it in `app/tests`, otherwise in Laravel 5 it will be located in `tests`. If you&#039;re using Laravel 4.2 you&#039;ll also need to make a slight adjustment to your `TestCase` to let it know where to find your model definitions.

    class TestCase extends Illuminate\Foundation\Testing\TestCase
    {
        // ...

        public function setUp()
        {
            parent::setUp();

            Laracasts\TestDummy\Factory::$factoriesPath = &#039;app/tests/factories&#039;;
        }
    }

Now, let&#039;s go make our first factory for a User. Create a file called `app/tests/factories/Users.php`. You&#039;re welcome to call the file whatever you like, I&#039;ve opted to use [Ruby&#039;s factory_girl](https://github.com/thoughtbot/factory_girl) approach as it hold many similarities to TestDummy, also because a singular name would clash with the model&#039;s file name (annoying) and if it was lowercase it would be difficult with multi-word model names (like ApiClient).

    &lt;?php

    $factory(&#039;User&#039;, [
        &#039;first_name&#039; =&gt; $faker-&gt;firstName,
        &#039;last_name&#039; =&gt; $faker-&gt;lastName,
        &#039;email&#039; =&gt; $faker-&gt;unique()-&gt;email,
        &#039;password&#039; =&gt; $faker-&gt;password,
        &#039;gender&#039; =&gt; $faker-&gt;randomElement([&#039;Male&#039;, &#039;Female&#039;]),
        &#039;activated&#039; =&gt; $faker-&gt;boolean
    ]);

Notice the use of `$faker`, which gives us access to an instance of [Faker](https://github.com/fzaninotto/Faker), a powerful library for generating fake but appropriate data which is really userful for testing and bootstrapping development environments. It&#039;s worth having a read up on all the generators that Faker provides as I&#039;ve only touched the surface of it&#039;s capabilities in the above example.

Now it&#039;s really easy to get a valid User model for a test.

    // Create a fully-generated model.
    Laracasts\TestDummy\Factory::create(&#039;User&#039;);

    // Create model with overridden attributes.
    Laracasts\TestDummy\Factory::create(&#039;User&#039;, [&#039;activated&#039; =&gt; 0]);

Let&#039;s take a look at testing a couple of methods on an example `UsersControlelr` to see how much easier it is to test your controllers with TestDummy 2. If you haven&#039;t worked it out already, I&#039;m a big fan of testing my controllers by hitting the database and performing a full request, rather than mocking out a model repository and making life a pain in the ass for everyone involved. Here&#039;s the controller, note that there isn&#039;t any validation on the `store()` method as that&#039;s entirely up to how you want to handle it and out of the scope of this post (also because form validation changes significantly from Laravel 4.2 to 5).

    class UsersController extends BaseController
    {
        /**
         * User instance.
         *
         * @var \User
         */
        protected $user;

        /**
         * Construct the controller.
         * 
         * @param  \User  $user
         * @return void
         */
        public function __construct(User $user)
        {
            parent::__construct();

            $this-&gt;user = $user;
        }

        /**
         * GET /users
         * Display a list of all the users.
         *
         * @return Response
         */
        public function index()
        {
            $users = $this-&gt;user-&gt;all();

            return View::make(&#039;users.index&#039;, compact(&#039;users&#039;));
        }

        /**
         * GET /users/create
         * Display the form for creating a new user.
         *
         * @return Response
         */
        public function create()
        {
            return View::make(&#039;users.create&#039;);
        }

        /**
         * POST /users/create
         * Store a new user in storage.
         *
         * @return Response
         */
        public function store()
        {
            // Tight validation here.
            $input = Input::all();

            if (User::create($input)) {
                return Redirect::action(&#039;UsersController@show&#039;, $user-&gt;id);            
            }

            return Redirect::back()-&gt;withError(&#039;User could not be created.&#039;);
        }

        /**
         * GET /users/1
         * Display the given user.
         *
         * @param  int  $userId
         * @return Response
         */
        public function show($userId)
        {
            $user = $this-&gt;user-&gt;findOrFail($userId);

            return View::make(&#039;users.show&#039;, compact(&#039;user&#039;));
        }
    }

Here&#039;s a sample test for this controller using PHPUnit loaded with Laravel&#039;s test helpers. I&#039;ve begun to opt for the snake-cased and comment attribute approach to testing with PHPUnit as it reads better and makes it easier to be clear about what each test does.

Note we&#039;re extending from TestDummy&#039;s `DbTestCase` instead of the normal `TestCase` (don&#039;t worry, `DbTestCase` extends from `TestCase` itself). You can use this with the factory and TestDummy will rollback all transactions after every test case meaning you start with a fresh database each test.

    use Laracasts\TestDummy\Factory;
    use Laracasts\TestDummy\DbTestCase;

    class UsersControllerTest extends DbTestCase
    {
        /** @test */
        public function it_displays_index_page()
        {
            $this-&gt;action(&#039;GET&#039;, &#039;UsersController@index&#039;);

            $this-&gt;assertResponseOk();
            $this-&gt;assertViewHas(&#039;users&#039;);
        }

        /** @test */
        public funciton it_displays_create_user_form()
        {
            $this-&gt;action(&#039;GET&#039;, &#039;UsersController@create&#039;);

            $this-&gt;assertResponseOk();
        }

        /** @test */
        public function it_creates_a_new_user()
        {
            $userAttributes = Factory::build(&#039;User&#039;)-&gt;toArray();

            $this-&gt;action(&#039;POST&#039;, &#039;UsersController@store&#039;, $userAttributes);

            // Get the new user ID
            $user = User::latest()-&gt;first();

            $this-&gt;assertRedirectedToAction(&#039;UsersController@show&#039;, $user-&gt;id);
        }

        /** @test */
        public function it_redirects_if_creating_a_new_user_fails()
        {
            $this-&gt;action(&#039;POST&#039;, &#039;UsersController@store&#039;);

            $this-&gt;assertRedirectedToAction(&#039;UsersController@create&#039;);
            $this-&gt;assertSessionHas(&#039;error&#039;);
        }

        /** @test */
        public function it_displays_show_page()
        {
            $user = Factory::create(&#039;User&#039;);

            $this-&gt;action(&#039;GET&#039;, &#039;UsersController@show&#039;, $user-&gt;id);

            $this-&gt;assertResponseOk();
            $this-&gt;assertViewHas(&#039;user&#039;);
        }
    }

You can see how quickly throwing together a model is useful for testing that the show page works, and building a model to get it&#039;s attributes is a handy way to test the create form for a model.

This post only explores some of the newer features of TestDummy and I may write a future post devling into some of the other cool stuff, but it&#039;s definitely worth taking a look around to better (and more easily) test your Laravel apps.
