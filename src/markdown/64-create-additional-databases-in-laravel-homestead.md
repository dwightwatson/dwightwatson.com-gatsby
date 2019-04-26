---
title: "Create additional databases in Laravel Homestead"
path: /posts/create-additional-databases-in-laravel-homestead
author: Dwight Watson
date: 2014-09-01
tags: ["laravel", "mysql", "postgresql"]
---

I often see Homestead users just using the default `homestead` database that ships with a new Homestead box, rather than creating a new database specific to their application. When you&#039;re hosting multiple applications through your Homestead instance it makes a lot more sense to name your databases per-application, often with a `_testing` suffix for your test databses. It&#039;s actually really easy to add new databases inside your Homestead instance, and here are the instructions for both MySQL and PostgreSQL.

# MySQL

	// Login to MySQL (password is &quot;secret&quot;)
	mysql -u homestead -p
	
	// Create the new database
	CREATE DATABASE your_app_name;
	
	// Exit MySQL
	exit;

# PostgreSQL

	// Login to PostgreSQL (password is &quot;secret&quot;)
	psql -U homestead -h localhost
	
	// Create the new database
	CREATE DATABASE your_app_name;
	
	// Exit PostgreSQL
	\q
