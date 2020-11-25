---
title: "Rails Webpacker and Sass undefined variable error"
path: /posts/rails-webpacker-and-sass-undefined-variable-error
author: Dwight Watson
date: 2017-07-13
tags: ["javascript", "ruby on rails", "webpacker"]
---

I've recently started using Webpacker with Rails as an alternative to the asset pipeline. In addition to compiling my Javascript assets I've opted to pipe my Sass through it as well, so everything is going through the one place. However, I've been running into some `undefined variable` issues as Webpacker compiles the Sass stylesheets. Interestingly enough it doesn't prevent the build completing but it's still just an annoying error.

```
Child extract-text-webpack-plugin:
       [0] ./node_modules/css-loader?{"minimize":false}!./node_modules/postcss-loader/lib?{"sourceMap":true}!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js?{"sourceMap":true}!./app/javascript/packs/styles/app.scss 227 bytes {0} [built] [failed] [1 error]

    ERROR in ./node_modules/css-loader?{"minimize":false}!./node_modules/postcss-loader/lib?{"sourceMap":true}!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js?{"sourceMap":true}!./app/javascript/packs/styles/app.scss
    Module build failed:
      background: $white !important;
                 ^
          Undefined variable: "$white".
          in /Users/Dwight/Sites/rails/app/javascript/packs/styles/app.scss (line 2, column 15)
```

It turns out this was because of the location I was placing my Sass files. My pack was located in an `app/javascript/packs/application.js` and in it I had the following relative import:

```js
import './styles/app.scss';
```

What you'll need to do it move your styles up a directory, into just `app/javascript/styles`. You can then adjust the import to grab it from the parent directory instead.

```js
import '../styles/app.scss';
```

The boilerplate for the blank `application.js` file acually does warn you that the `app/javascript/packs` directory should only be used to create entry points to your packs, so taking notice of this would have prevented this and also shows how moving your assets up a directory is the expected solution.

```
/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb
```
