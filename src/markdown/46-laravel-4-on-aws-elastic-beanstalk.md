---
title: "Laravel 4 on AWS Elastic Beanstalk"
path: /posts/laravel-4-on-aws-elastic-beanstalk
author: Dwight Watson
date: 2014-03-12
tags: ["aws", "laravel", "php"]
---

I&#039;ve been doing a bit of research into [AWS Elastic Beanstalk](http://aws.amazon.com/elasticbeanstalk/) recently as an alternative to our current hosting arrangement. Elastic Beanstalk provides pre-configured EC2 instances to easily deploy apps on a bunch of languages including PHP, Ruby and Node.js. There&#039;s a lot of cool things about the service. For one, it allows you to automatically scale, so it will boot up more instances when your app takes a lot of traffic. It has a dedicated instance for your database, provided through [AWS RDS](http://aws.amazon.com/rds/), it&#039;s dirt cheap, and the AWS platform also provides a [Route 53](http://aws.amazon.com/route53/) (DNS), [SQS](http://aws.amazon.com/sqs/) (Queues), [CloudFront](http://aws.amazon.com/cloudfront/) (CDN) and of course [S3](http://aws.amazon.com/s3/). Plus, it deploys simply through Git.

Now, I haven&#039;t quite cracked getting my app onto EB just yet, and I&#039;m working through it one step at a time. The app I&#039;m trying to get up has a lot of dependencies and external things which make deploying a little harder than usual, but I intend to document my continued attempts on getting to working on this blog. For now, I&#039;m going to run you through getting a clean install of Laravel 4 up and running. Once you see how it&#039;s done I&#039;m sure you&#039;ll find most regular Laravel 4 apps should go up quite easily.

## Install Laravel

First things first, let&#039;s get a new copy of Laravel. Depending on how you have Composer installed, do something like this:

    // Install a new copy of Laravel
    composer create-project laravel/laravel
	
	// Move into the Laravel directory
	cd laravel
	
Next, we need to initiate Git for the new app and make an initial commit. Assuming you have Git installed, do the following:

    // Initiate Git
	git init
	
	// Add all files and commit
	git add -A
	git commit -m &quot;Initial commit&quot;
	
## Setting up Elastic Beanstalk

First, you&#039;re going to need to download the [Elastic Beanstalk Command Line Tools](http://aws.amazon.com/code/6752709412171743). Pop them somewhere easy to find. Now, these instructions will be for Mac OS X, but should be fairly similar if you are using a different OS. While you&#039;re in the root directory of your Laravel app, reference the location of the EB executable. On most Mac installations, you&#039;ll be using Python 2.7 (default).

    // Initiate the Elastic Beanstalk app
    ~/Sites/aws/eb/macosx/python2.7/eb init
	
This will run you through the setup of your application on Elastic Beanstalk. You&#039;ll be able to pick which data centre to place your application, which version of PHP you&#039;d like to run, whether or not you&#039;d like to autoscale and more. However, first you&#039;ll be asked for your security credentials. Login to the AWS console and visit the [security credentials](https://console.aws.amazon.com/iam/home?#security_credential) page to get these. Name your app accordingly and pick an environment name like `production` or `staging`, depending on what this instance will be.

You&#039;ll want to make an RDS instance - this is your database. Make sure you choose a secure username and password for the database and keep a record of it.

## Configuring Laravel to connect to RDS

Now, we just need to configure Laravel to talk to the RDS database. Turns out this is really easy. Edit the `app/config/database.php` file like so (and pick the driver depending on the on the database type you selected while setting up EB, for example I used MySQL).

		&#039;mysql&#039; =&gt; array(
			&#039;driver&#039; =&gt; &#039;mysql&#039;,
			&#039;host&#039; =&gt; $_SERVER[&#039;RDS_HOSTNAME&#039;],
			&#039;port&#039; =&gt; $_SERVER[&#039;RDS_PORT&#039;],
			&#039;database&#039; =&gt; $_SERVER[&#039;RDS_DB_NAME&#039;],
			&#039;username&#039; =&gt; $_SERVER[&#039;RDS_USERNAME&#039;],
			&#039;password&#039; =&gt; $_SERVER[&#039;RDS_PASSWORD&#039;],
			&#039;charset&#039; =&gt; &#039;utf8&#039;,
			&#039;collation&#039; =&gt; &#039;utf8_unicode_ci&#039;,
			&#039;prefix&#039; =&gt; &#039;&#039;,
		),

As you can see, Elastic Beanstalk provides the database configuration to the application through the environment variables (neat)! Also note that we had to add the port key in, so it knows how to connect.

## Pushing

Last step is to commit the database change and push it all up to EB. By now, your EB instances should be up and waiting.

    git add app/config/database.php
	git commit -m &quot;Add database configuration for AWS&quot;
	
Now, let the magic happen!

    git aws.push
	
This will push your whole app up to Elastic Beanstalk. EB is thankfully smart enough to recognise that you&#039;ve got a `composer.json` and run `composer install` for you, so your dependencies are good.

Now, visit the AWS console and go into Elastic Beanstalk. At the top right, select the datacentre location you chose earlier. You&#039;ll now see your application and the environment you created (which should hopefully be green!). Click on it and then the configuration tab on the left. Next to web server, click the cog to make changes. You&#039;ll need to edit the public directory to be `/public`, as that is the default public directory for Laravel.

And finally, click the link for your app at the top of the AWS page. `You&#039;ve arrived!` should appear - your stock standard Laravel app is now running on AWS!

For more information, browse the AWS docs for Elastic Beanstalk. In particular, have a look at [deploying PHP applications on EB](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_PHP_eb.html).
