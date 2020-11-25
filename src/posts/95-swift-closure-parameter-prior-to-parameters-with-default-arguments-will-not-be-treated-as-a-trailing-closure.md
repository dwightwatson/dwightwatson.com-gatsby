---
title: "Swift: Closure parameter prior to parameters with default arguments will not be treated as a trailing closure"
path: /posts/swift-closure-parameter-prior-to-parameters-with-default-arguments-will-not-be-treated-as-a-trailing-closure
author: Dwight Watson
date: 2015-04-09
tags: ["ios", "swift"]
---

I just finished upgrading one of my Swift projects to the newly-released XCode 6.3, which now includes Swift 1.2. The upgrade is mostly painless, and using the migrator hidden in the edit menu will actuall migrate most of your code for you, which for the most part will usually be updating your `as`'s to `as!`'s. However, I ended up with another warning/error combination in my project as well.

    Closure parameter prior to parameters with default arguments will not be treated as a trailing closure

Trailing closures is one of the little syntactical sugars of Swift. If the final argument of a function is a closure you can use it as a trailing closure instead of part of your method call. Let me show you how this works in code. Let's say we have a user repository, which pulls our User objects from the user defaults.

    class UserRepository {
        class func all(handler: (users: [User]) -> Void) {
            if let users = NSUserDefaults().standardUserDefaults().objectForKey("users") as? [User] {
                handler(users)
            }
        }
    }

You can effectively use this method in two ways, either by passing in a closure or by using a trailing closure - an option that is arguably simpler. It's a subtle difference, but decide for yourself:

    // Closure argument
    UserRepository.all({ users in
        println(users)
    })

    // Trailing closure
    UserRepository.all { users in
        println(users)
    }

But what if we wanted to extend our method, say to add a second parameter that would only return admin users (granted, these are trite examples, probably from my background in web development - but stick with me).

    class UserRepository {
        class func all(handler: (users: [User]) -> Void, onlyAdmin = false) {
            if let users = NSUserDefaults().standardUserDefaults().objectForKey("users") as? [User] {
                if onlyAdmin {
                    handler(users.filter { $0.isAdmin })
                }

                handler(users)
            }
        }
    }

Because the final argument has a default value Swift 1.1 continued to allow you to use the trailing closure syntax for calling the method. If you wanted to provide a different value for the arugment however, you would need to use the closure argument syntax.

However, in Swift 1.2 this is no longer the case. If you have arguments with default values after your closure, you are unable to use the trailing closure syntax. From here you have two options: *replace your use of the trailing closure syntax with the closure argument syntax* or *change the method to put your closure argument last*.

Pick the approach that works best for you - if you're a fan of the trailing closure syntax moving forward you'll probably want to avoid using arguments with default values after closure arguments.

    // Make the closure argument the last argument
    class UserRepository {
        class func all(onlyAdmin = false, handler: (users: [User]) -> Void) {
            if let users = NSUserDefaults().standardUserDefaults().objectForKey("users") as? [User] {
                if onlyAdmin {
                    handler(users.filter { $0.isAdmin })
                }

                handler(users)
            }
        }
    }

    // Change the methods to suit your needs
    class UserRepository {
        class func all(handler: (users: [User]) -> Void) {
            if let users = NSUserDefaults().standardUserDefaults().objectForKey("users") as? [User] {
                handler(users)
            }
        }

        class func admin(handler: (users: [User]) -> Void) {
            UserRepository.all { users in
                handler(users.filter { $0.isAdmin })
            }
        }
    }
