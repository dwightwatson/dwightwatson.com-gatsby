---
title: "EXC_BAD_INSTRUCTION fetching CoreData's NSManagedObjectModel"
path: /posts/exc_bad_instruction-fetching-coredatas-nsmanagedobjectmodel
author: Dwight Watson
date: 2015-10-06
tags: ["coredata", "ios", "swift", "xcode"]
---

I ran into an issue where I was unable to use CoreData in my application because whenever it tried to get the `managedObjectModel` it would crash with a fatal error, and if you're lucky `unexpectedly found nil while unwrapping an Optional value` showing up in the console in addition to an `EXC_BAD_INSTRUCTION` notice.

    lazy var managedObjectModel: NSManagedObjectModel = {
        // The managed object model for the application. This property is not optional. It is a fatal error for the application not to be able to find and load its model.
        let modelURL = NSBundle.mainBundle().URLForResource("Studious_maps", withExtension: "momd")!
            return NSManagedObjectModel(contentsOfURL: modelURL)!
    }()

Turns out my app was failing to create the model URL (which as you can see, is required). *It's worth noting that with this application I added CoreData after the project had been created, rather than using the CoreData template that Xcode provides).* I copied the CoreData boilerplate into my existing project and created the CoreData data model that my application should use, however I was still running into this issue.

It appears as though when compiling Xcode is meant to take your `App.xcdatamodel` and create a `App.momd` file available for your app to use, but in my instance this wasn't the case. But I narrowed the issue down to the fact that I had `App.xcdatamodel` when the CoreData template actually ships with `App.xcdatamodeld` (note the trailing `d`). When I added the data model to my app manually I believe I may have added an older (or just plain wrong) data model, which was causing the issue.

To remedy this, you can do one of two things.

First, delete the data model and create a new one using a new `Data Model` file template (under `iOS > Core Data > Data Model`) and double-check that the file it creates ends with the correct suffix (`*.xcdatamodeld`). You should be then to go.

The second option means you can keep your existing data model if you've already created one. Open your data model and go `Editor > Add Model Version`. This will translate your file to the container with the correct suffix. You'll have two versions of your schema in the data model now - you can leave it if you don't mind (and your app should work now).

If you'd rather ditch the unnecessary version now that you've fixed the issue you'll need to edit the project code - but you can delete the second version of the data model yourself (browse inside the `App.xcdatamodeld` container, it'll be called `App 2.xcdatamodel`) and then remove all references to that filename from your project (for which you'll need to fire up your text editor most likely). A little more work, but if you're a perfectionist it's very possible.
