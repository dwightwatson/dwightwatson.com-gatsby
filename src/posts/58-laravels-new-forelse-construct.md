---
title: "Laravel's new @forelse construct"
path: /posts/laravels-new-forelse-construct
author: Dwight Watson
date: 2014-07-15
tags: ["laravel", "php"]
---

Fun to note that there is a new [@forelse](https://twitter.com/laravelphp/status/487695515673710593) construct in Laravel 4.2, something that has apparently just made it's way back into the framework after last making its appearance in Laravel 3. You can have a look at the finer implementation details in [the pull request on GitHub](https://github.com/laravel/framework/pull/5028) but I thought I would go over the feature here, as it's something that I might start using in the right circumstances.

	@forelse($users as $user)
	    <li>{{{ $user->full_name }}}</li>
	@empty
		<p>There are no users yet!</p>
	@endforelse

This simple syntax allows you to provide alternate content if you don't have any results for the page to display. It's really nice and simple, but at the same time there are some very good reasons not to use it (in my opinion). For example, take a look at what I would traditionally do in my applications.

    @unless($users->count())
	    // Content if there are no users.
	@else
		// We have users.
		<table class="table table-striped">
			<thead>
				<th>Full name</th>
			</thead>
			<tbody>
				@foreach($users as $user)
					<tr>
						<td>{{{ $user->full_name }}}</td>
					</tr>
				@endforeach
			</tbody>
		</table>
	@endunless

What are the benefits to this? As far as I see it, there are two:

1. What you would display when you have no records to display is usually a lot shorter than whatever you would display if there is content. Because of this I feel it is preferable to keep it as your first clause so you know where it is when you need to find it. If it was placed at the bottom you would have to scroll through the actual content which can vary in length.

2. It allows you to provide content around your records if do have any. If I wanted to use a table in the top example I would have to place it around the whole `@forelse` construct and have it display whether or not I have records. The bottom solution allows me to only display a table if I have records and then show something completely difference if I don't.

Of course there are use cases for both and it really depends on what you want to achieve, but it is definitely worth knowing the tools that Blade makes available to you.
