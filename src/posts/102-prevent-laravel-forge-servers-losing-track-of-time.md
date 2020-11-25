---
title: "Prevent Laravel Forge servers losing track of time"
path: /posts/prevent-laravel-forge-servers-losing-track-of-time
author: Dwight Watson
date: 2015-07-30
tags: ["aws", "forge", "laravel"]
---

I recently ran into an issue where our Laravel Forge servers were falling out of sync with the actual time, some getting up to 5 minutes slow and one even going 7 minutes into the future. These servers had been running for 6 months without a restart, but it shouldn't happen and it's not ideal - especially when each server is writing completely different timestamps to your database.

Luckily there's a great tool for Ubuntu called NTP which will help keep your server's times up to date and in sync. Here's my recipe for Laravel Forge which you can install using the UI, or do it manually through the command line. I've commented what each line does as some bits are for my own needs (for example, I change the default time servers to be Amazon ones because my servers are hosted on AWS, but this might differ for you).

    # This simply installs the NTP tool.
    apt-get install ntp -y

    # This replaces the default servers with Amazon NTP servers. Not necessary if you're not on AWS
    sed -i 's/.ubuntu.pool.ntp.org/.amazon.pool.ntp.org iburst/g' /etc/ntp.conf

    # This will stop the service, force it to sync the clock immediately and then start it again.
    service ntp stop
    ntpd -gq
    service ntp start
