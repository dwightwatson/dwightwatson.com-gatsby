---
title: "Testing Laravel with PHPUnit and GitHub Actions"
path: /posts/testing-laravel-with-phpunit-and-github-actions
author: Dwight Watson
date: 2019-08-21
tags: ["laravel", "phpunit", "testing", "github"]
---

GitHub recently announced a new release of [GitHub Actions](https://github.com/features/actions) which allows you to automate workflows in response to events that occur in your repos. One key new feature in the new release is the ability to use GitHub as your CI/CD tool. Instead of having a third-party build your commits/pull requests you now have the ability to run it all in the GitHub ecosystem. It's free for public repos, and you get 2,000 free minutes for private repos or 3,000 free minutes if you have a pro account. If you don't have access already, be sure to sign up for the beta.

Once you have access to the beta (you'll get an email, and the "Actions" tab will appear on your repo) you can start adding workflows. Here's my boilerplate for building my Laravel app - including building front-end assets - which I've placed in `.github/workflows/ci.yml`.

```yaml
name: CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1

    - name: Use Node.js 12.x
      uses: actions/setup-node@v1
      with:
        node-version: 12.x

    - name: Install composer dependencies
      run: composer install --prefer-dist

    - name: Install npm dependencies
      run: npm install

    - name: Run Mix
      run: npm run production

    - name: Run PHPUnit
      run: php7.3 vendor/bin/phpunit
```

You can explore the documenation to exercise greater control over different parts of the environemnt - if you wanted to use an earlier version of Node or PHP, for example. Though the documentation isn't fully fleshed out for PHP just yet `composer` and a number of `php7.x` executables are still available.

## Environment variables/secrets

In addition you might need to inject environment variables into your build process - I needed in order to get Laravel Nova installed. First, go to your repo's settings tab and then click secrets. For Laravel Nova I added a `COMPOSER_AUTH` environment variable, which Composer will use out of the box to authenticate correctly during installation.

```
{ "http-basic": { "nova.laravel.com": { "username": "dwight@example.com", "password": "secret" } } }
```

Then you can adjust your install script to be aware the specific secrets you need and use them appropriately.

```yaml
- name: Install composer dependencies
  env:
    COMPOSER_AUTH: ${{ secrets.COMPOSER_AUTH }}
  run: composer install --prefer-dist
```

It works just the same if you had other variables you wanted to use in your scripts.

## Deployment

Still working on getting a tight solution to deploy straight to Laravel Vapor, and I'll post it here once it's ready.

