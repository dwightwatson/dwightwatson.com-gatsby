---
title: "Xcode Command Line Tools on Mac OS X 10.9 (Mavericks)"
path: /posts/xcode-command-line-tools-on-mac-os-x-10-9-(mavericks)
author: Dwight Watson
date: 2013-11-04
tags: ["osx", "xcode"]
---

Here's a great little command I just saw pop up on Twitter that lets you install the Xcode Command Line Tools on Mac OS X 10.9 (Mavericks) without actually needing to install Xcode first. This is great if you don't actually plan on developing iOS/Mac apps becuse the Xcode install is quite big (and can take a while) and it will then attempt to download large documentation libraries and iOS simulators.

 xcode-select --install

Of course if you're like me and you do want to use Xcode for various other things, just install it from the App Store as per usual and the tools will now be installed automatically.
