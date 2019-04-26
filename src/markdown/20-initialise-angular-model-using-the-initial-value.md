---
title: "Initialise Angular model using the initial value"
path: /posts/initialise-angular-model-using-the-initial-value
author: Dwight Watson
date: 2013-09-13
tags: ["angular", "laravel"]
---

Thanks to a little help from Stack Overflow, I found out that the reason that my form inputs with values inserted by the server we being emptied upon the Angular controller loading up. What I thought was the fault of `$watch` overwriting the existing input value turns out to be the fault of data binding.

    <input type="text" name="first_name" value="Dwight" ng-model="name">

As soon as the controller is loaded, the input is emptied and the value of `$scope.name` is `undefined`. This is because, as far as Angular is concerned, data should be coming from the model - and not from the view. This is a little awkward in web apps that aren't entirely a client-side single page app. For example, in my situation everything is done server-side, and I wanted to use Angular to simply do a few tiny things.

The "proper" Angular solution in this would be to load the form in, empty, and then use Angular to hit up the server and get the data that would fill the fields. That way, maintaining a proper MVC-distinction on the client-side (that is, the model is separated from the view). However, I didn't really like this solution for the server-side app as it would require re-wiring that whole form just so Angular could use it the way I wanted it. Laravel's form validation and model binding was doing just fine, if I wanted to totally Ajax-ify the form I could do so later down the track.

The "workaround" Angular solution is to produce a directive that will initialise a model using the value of the input when the page loads. It's a bit of a hack, but it's also not really.

    app.directive('initModel', function($compile) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				scope[attrs.initModel] = element[0].value;
				element.attr('ng-model', attrs.initModel);
				element.removeAttr('init-model');
				$compile(element)(scope);
			}
		};
	}

Then, simply use your new `init-model` directive instead of `ng-model`:

    <input type="text" name="first_name" value="Dwight" init-model="name">

For the sake of completeness, here is another (uglier) solution, should you want to avoid a directive:

   <input type="text" name="first_name" value="Dwight" ng-model="name" ng-init="name='Dwight'">
