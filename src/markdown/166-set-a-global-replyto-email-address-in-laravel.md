---
title: "Set a global reply-to email address in Laravel"
path: /posts/set-a-global-replyto-email-address-in-laravel
author: Dwight Watson
date: 2018-03-24
tags: []
---

Simple post today, but turns out Laravel has a simple feature that lets you configure the reply-to email address at a high level. Take a look in `config/mail.php` where you set up the default from address - you can simply add another address underneath using the `reply_to` key.

```php
    /*
    |--------------------------------------------------------------------------
    | Global "From" Address
    |--------------------------------------------------------------------------
    |
    | You may wish for all e-mails sent by your application to be sent from
    | the same address. Here, you may specify a name and address that is
    | used globally for all e-mails that are sent by your application.
    |
    */

    'from' => [
        'address' => 'notifications@mail.myapp.com',
        'name' => 'My App',
    ],

    'reply_to' => [
        'address' => 'support@myapp.com',
        'name' => 'My App',
    ],
```
