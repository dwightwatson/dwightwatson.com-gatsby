---
title: "Using debugger-ruby_core_source fails to build native gem extension"
path: /posts/using-debugger-ruby-code-source-fails-to-build-native-gem-extension
author: Dwight Watson
date: 2014-09-07
tags: ["bundler", "ruby", "ruby on rails"]
---

I just ran into an issue where my Rails app would no longer bundle, and I couldn't get it running. It all looks good up until it gets to `debugger-ruby_core_source` and it fails to build gem native extension. If you've come across a similar problem you might be looking at something like this.

    Fetching gem metadata from https://rubygems.org/.........
    Fetching additional metadata from https://rubygems.org/..
    Resolving dependencies...
    ...
    Using debugger-linecache 1.2.0
    Using debugger-ruby_core_source 1.3.5

    Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

        /Users/Dwight/.rvm/rubies/ruby-2.1.2/bin/ruby extconf.rb
    *** extconf.rb failed ***
    Could not create Makefile due to some reason, probably lack of necessary
    libraries and/or headers.  Check the mkmf.log file for more details.  You may
    need configuration options.

    Provided configuration options:
        --with-opt-dir
        --without-opt-dir
        --with-opt-include
        --without-opt-include=${opt-dir}/include
        --with-opt-lib
        --without-opt-lib=${opt-dir}/lib
        --with-make-prog
        --without-make-prog
        --srcdir=.
        --curdir
        --ruby=/Users/Dwight/.rvm/rubies/ruby-2.1.2/bin/ruby
/Users/Dwight/.rvm/rubies/ruby-2.1.2/lib/ruby/2.1.0/fileutils.rb:1573:in `stat': No     such file or directory @ rb_file_s_stat - ./212/ruby_debug.h (Errno::ENOENT)
    from /Users/Dwight/.rvm/rubies/ruby-2.1.2/lib/ruby/2.1.0/fileutils.rb:1573:in     `block in fu_each_src_dest'
    from /Users/Dwight/.rvm/rubies/ruby-2.1.2/lib/ruby/2.1.0/fileutils.rb:1587:in     `fu_each_src_dest0'
    from /Users/Dwight/.rvm/rubies/ruby-2.1.2/lib/ruby/2.1.0/fileutils.rb:1571:in     `fu_each_src_dest'
        from /Users/Dwight/.rvm/rubies/ruby-2.1.2/lib/ruby/2.1.0/fileutils.rb:399:in `cp'
        from extconf.rb:83:in `block in <main>'
        from extconf.rb:82:in `each'
        from extconf.rb:82:in `<main>'

    extconf failed, exit code 1

    Gem files will remain installed in /Users/Dwight/.rvm/gems/ruby-2.1.2/gems/    debugger-1.6.8 for inspection.
    Results logged to /Users/Dwight/.rvm/gems/ruby-2.1.2/extensions/x86_64-darwin-13/2.1.0    -static/debugger-1.6.8/gem_make.out
        An error occurred while installing debugger (1.6.8), and Bundler cannot continue.
        Make sure that `gem install debugger -v '1.6.8'` succeeds before bundling.

Turns out, this is simply a result of the [debugger](https://github.com/cldwalker/debugger) gem not supporting Ruby 2+. I find it odd that it is therefore still included with the `Gemfile` that ships with Rails, but nonetheless if you want to replace the gem you might look at [debugger2](https://github.com/ko1/debugger2) or Pry.
