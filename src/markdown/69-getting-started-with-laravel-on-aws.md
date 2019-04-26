---
title: "Getting started with Laravel on AWS"
path: /posts/getting-started-with-laravel-on-aws
author: Dwight Watson
date: 2014-09-07
tags: ["aws", "forge", "laravel", "php"]
---

To kick off a new series on scaling Laravel on AWS I want to start with discussing Forge and the AWS platform. If you've been following Forge from the very beginning you might remember that it launched with support for AWS and Rackspace, however that was removed shortly after because those providers weren't playing as nice with the system as [Digital Ocean](https://www.digitalocean.com/) and [Linode](https://www.linode.com/). Luckily there is still the option to deploy Forge to any hosting provider with Ubuntu instances so it is still possible to get your apps running on AWS.

# Why AWS?
I'm a big fan of the AWS ecosystem. Sure, you can get away with putting your sites on Digital Ocean and Linode - they're both great providers, and I also like that Linode provides Node Balancers. However beyond that it's up to you to get the rest of your architecture up and running. Want a MySQL instance, read the guides and set it up yourself. Want a caching or queueing service outside that provided by the Forge instance, do the same. Want to send emails or pop your assets behind a CDN? You're on your own.

The AWS ecosystem provides a heap of optimised, ready-to-go architecture which makes running your applications at scale really easy. Route into your app with the [Route 53](http://aws.amazon.com/route53/) DNS service, which makes it super simple to point to your instances, like your [Elastic Load Balancer](http://aws.amazon.com/elasticloadbalancing/) which monitors your [EC2](http://aws.amazon.com/ec2/) instances and directs traffic where it needs to go. Your EC2 instances are managed by powerful security groups which control their access to the rest of your network.

[S3](http://aws.amazon.com/s3/) is right there to store your assets away from your application, then you've got the [CloudFront](http://aws.amazon.com/cloudfront/) to serve them around the world from local endpoints. Use [RDS](http://aws.amazon.com/rds/) to host a high performance database for your application (choose from MySQL, PostgreSQL, Oracle and more) and then use [SQS](http://aws.amazon.com/sqs/) to manage your global application queue and [SES](http://aws.amazon.com/ses/) to send email out from your application.

Because so much amazing infrastructure is made available to your out of the box, you're left to simply configure your EC2 instaces to get your app serving. You know you can trust Amazon to get the rest right because they know a thing or two about hosting big sites.

# Getting started (with terminology)
I'll admit, at first I was scared off by AWS. I thought "enterprise" or "that's for the big boys". I was intimidated by "security groups", "key pairs" and IAM. I spent a lot of time reading Linode and Digital Ocean guides to configure my own setups. It was a very educational and rewarding experience, and I now recommend to everyone I work with that they at least get their hands dirty getting some applications up and running from the bare metal. Knowing your way around the server is a very crucial component. However, though this worked, I realised I'd like to spend more time working on my apps and leave server management to someone else.

Now while AWS will provide you with the infrastructure you need to scale and Laravel Forge will configure your servers to serve your PHP applications it is still very much worth your while learning how things work at Amazon. Their console isn't the sexiest thing around and their documentation certainly isn't the most readable (perhaps bedtime reading, if you have trouble sleeping it will definitely help) but it is very functional and will get what you need done.

I'll go over some of the terminology that got me, if there's something that I've missed that you don't quite get let me know and I'll add it to my list.

### IAM
This is the service Amazon users to manage users in your console. Normally you'll have own root account for your AWS console which provides access to everything. They reccomend that this account is secured with [multi-factor authentication](http://aws.amazon.com/iam/details/mfa/). You can either get an app for your phone or purchase a hardware token device. This requires that every time you log in with your root account you also enter a code from your token device. It adds an additional, physical, layer of security to your root account (and keeps your servers safe).

You then create additional user accounts for everyone at your company. IAM lets you assign them passwords (that adhere to a password policy of your choice) and then decide what access they have to the infrastructure - and it's very powerful. You can give some users access to Route 53 if they need to work with DNS, management rights for S3 if they look after assets or maybe just access to the billing information if they are in accounting. It's got a handy little tool for picking what actions a user account is allowed to perform. You might just find you're creating an administrator account for yourself to use the services you want, but it still adds an additional layer of security to the whole AWS account.

### Security groups
Security groups are simply a group of rules that defines what ports an EC2 is allowed to listen to or broadcast on to, and the IP range they are restricted to. For example, your web servers will want to have port 80 (HTTP) or 443 (HTTPS) open to the world, but 22 (SSH) open to only the IP address of your workplace. Your MySQL server might only want to take inbound connections on port 3306. You can define as many security groups as you like and apply them as you see fit to your instances. Better yet they can be changed at any time, they're not locked in place once you boot an instance.

### Key pairs
Key pairs belong to an IAM user account and are simply SSH keys that allow access to services. When you create a key pair it will be downloaded to your computer (for example, `Dwights-MacBook-Pro.pem`) and when you boot an EC2 instance it will ask you what key pairs you would like to assign to that instance. Once it's booted you authenticate using the key.

    ssh ubuntu@127.0.0.1 -i ~/Sites/Dwights-MacBook-Pro.pem

# What would I know
To be honest, I'm still very new to this. In case you don't normally follow my blog, I work on a number of high-traffic Laravel apps that get millions of hits a month, and get hit especially hard (10x the usual traffic) during peak periods twice a year. We've been using big powerful 24-core, 32GB RAM servers running cPanel for far too long and know it's time to move on. It doesn't make sense to keep expensive hardware around all year when it's only put to the test 4 months of the year, and it doesn't make sense to keep an app where performance matters running on PHP 5.4 with the dog that is cPanel (hey, it get's stuff done, but it isn't pretty).

I've spent the last month or so testing various ways to get Laravel running in the AWS ecosystem properly, effectively and securely. We have moved parts of our application to the platform already - CloudFront now serves our assets over SSL, S3 has all of our user content and we use a few other parts of AWS for different things. We're putting together our plan to get everything running in the cloud with continuous integration and delivery pushing green builds of our application to our auto-scaling, load balanced instances.

This series will roughly document the process by which we deploy and scale our high-traffic apps on the AWS cloud.

# What's next?
In the next part of the series I will go into deploying Forge on AWS using the new "Custom VPS" provider from Forge. We'll go into setting up the proper security group and key pair for you to get Forge running on your EC2 instance and then how to SSH into it.
