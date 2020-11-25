---
title: "Laravel controller testing with TestDummy 2"
path: /posts/laravel-controller-testing-with-testdummy-2
author: Dwight Watson
date: 2014-12-22
tags: ["laravel", "php", "phpunit", "testing"]
---

Was excited to see this week that [TestDummy 2](https://github.com/laracasts/TestDummy) has been released, which fixes quite a few of the issues that I had with the first version. The Faker instance is now available in your model definitions, it's possible to create model definitions that extend each other (for example, a variation of a user that is an admin) and you no longer have to keep your definitions in one single YAML (!!!) file. I spent an afternoon on the weekend upgrading our test suite to use TestDummy 2.

First, require the new version of TestDummy in your `composer.json` file:

    "require-dev": {
        "laracasts/testdummy": "~2.0"
    }

Next, create a `factories` directory inside your tests folder. If you're using Laravel 4.2 you'll find it in `app/tests`, otherwise in Laravel 5 it will be located in `tests`. If you're using Laravel 4.2 you'll also need to make a slight adjustment to your `TestCase` to let it know where to find your model definitions.

    class TestCase extends Illuminate\Foundation\Testing\TestCase
    {
        // ...

        public function setUp()
        {
            parent::setUp();

            Laracasts\TestDummy\Factory::$factoriesPath = 'app/tests/factories';
        }
    }

Now, let's go make our first factory for a User. Create a file called `app/tests/factories/Users.php`. You're welcome to call the file whatever you like, I've opted to use [Ruby's factory_girl](https://github.com/thoughtbot/factory_girl) approach as it hold many similarities to TestDummy, also because a singular name would clash with the model's file name (annoying) and if it was lowercase it would be difficult with multi-word model names (like ApiClient).

    <?php

    $factory('User', [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'email' => $faker->unique()->email,
        'password' => $faker->password,
        'gender' => $faker->randomElement(['Male', 'Female']),
        'activated' => $faker->boolean
    ]);

Notice the use of `$faker`, which gives us access to an instance of [Faker](https://github.com/fzaninotto/Faker), a powerful library for generating fake but appropriate data which is really userful for testing and bootstrapping development environments. It's worth having a read up on all the generators that Faker provides as I've only touched the surface of it's capabilities in the above example.

Now it's really easy to get a valid User model for a test.

    // Create a fully-generated model.
    Laracasts\TestDummy\Factory::create('User');

    // Create model with overridden attributes.
    Laracasts\TestDummy\Factory::create('User', ['activated' => 0]);

Let's take a look at testing a couple of methods on an example `UsersControlelr` to see how much easier it is to test your controllers with TestDummy 2. If you haven't worked it out already, I'm a big fan of testing my controllers by hitting the database and performing a full request, rather than mocking out a model repository and making life a pain in the ass for everyone involved. Here's the controller, note that there isn't any validation on the `store()` method as that's entirely up to how you want to handle it and out of the scope of this post (also because form validation changes significantly from Laravel 4.2 to 5).

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

            $this->user = $user;
        }

        /**
         * GET /users
         * Display a list of all the users.
         *
         * @return Response
         */
        public function index()
        {
            $users = $this->user->all();

            return View::make('users.index', compact('users'));
        }

        /**
         * GET /users/create
         * Display the form for creating a new user.
         *
         * @return Response
         */
        public function create()
        {
            return View::make('users.create');
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
                return Redirect::action('UsersController@show', $user->id);
            }

            return Redirect::back()->withError('User could not be created.');
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
            $user = $this->user->findOrFail($userId);

            return View::make('users.show', compact('user'));
        }
    }

Here's a sample test for this controller using PHPUnit loaded with Laravel's test helpers. I've begun to opt for the snake-cased and comment attribute approach to testing with PHPUnit as it reads better and makes it easier to be clear about what each test does.

Note we're extending from TestDummy's `DbTestCase` instead of the normal `TestCase` (don't worry, `DbTestCase` extends from `TestCase` itself). You can use this with the factory and TestDummy will rollback all transactions after every test case meaning you start with a fresh database each test.

    use Laracasts\TestDummy\Factory;
    use Laracasts\TestDummy\DbTestCase;

    class UsersControllerTest extends DbTestCase
    {
        /** @test */
        public function it_displays_index_page()
        {
            $this->action('GET', 'UsersController@index');

            $this->assertResponseOk();
            $this->assertViewHas('users');
        }

        /** @test */
        public funciton it_displays_create_user_form()
        {
            $this->action('GET', 'UsersController@create');

            $this->assertResponseOk();
        }

        /** @test */
        public function it_creates_a_new_user()
        {
            $userAttributes = Factory::build('User')->toArray();

            $this->action('POST', 'UsersController@store', $userAttributes);

            // Get the new user ID
            $user = User::latest()->first();

            $this->assertRedirectedToAction('UsersController@show', $user->id);
        }

        /** @test */
        public function it_redirects_if_creating_a_new_user_fails()
        {
            $this->action('POST', 'UsersController@store');

            $this->assertRedirectedToAction('UsersController@create');
            $this->assertSessionHas('error');
        }

        /** @test */
        public function it_displays_show_page()
        {
            $user = Factory::create('User');

            $this->action('GET', 'UsersController@show', $user->id);

            $this->assertResponseOk();
            $this->assertViewHas('user');
        }
    }

You can see how quickly throwing together a model is useful for testing that the show page works, and building a model to get it's attributes is a handy way to test the create form for a model.

This post only explores some of the newer features of TestDummy and I may write a future post devling into some of the other cool stuff, but it's definitely worth taking a look around to better (and more easily) test your Laravel apps.
