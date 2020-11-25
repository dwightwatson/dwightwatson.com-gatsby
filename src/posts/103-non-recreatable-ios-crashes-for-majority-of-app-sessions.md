---
title: "Non-recreatable iOS crashes for majority of app sessions"
path: /posts/non-recreatable-ios-crashes-for-majority-of-app-sessions
author: Dwight Watson
date: 2015-10-06
tags: ["ios", "swift", "xcode"]
---

I ran into a very curious issue with one of the apps I'd written for iOS in Swift recently. I was seeing a large number of crash reports show up in Xcode (ranging from around 70-80% of app sessions in the same period), and yet I was getting no feedback about crashing and the app reviews were still flowing in with 5 stars. The crash reports were very vague and not giving me much indication about what was going wrong, but I eventually narrowed it down to code running in `applicationWillTerminate(application: UIApplication)`.

Turns out, `applicationWillTerminate` is no longer called every time the application closes - since multi-tasking was introduced the app will usually be held around longer, and there is no guarantee that it will be closed any time soon. However, it will often be terminated when the memory it was using is required. This was a very important clue, as it explains why the crash wasn't affecting 100% of sessions and also why it wasn't having a negative effect on customer experience.

Once I moved the offending code into another part of the app to have it execute immeditately I found the cause of the issue and was able to fix it up without any issue. Hopefully the crash reporter in Xcode 7 that can find the offending line of code for you will make this problem a thing of the past. But this was a good lesson in real-world debugging for me.
