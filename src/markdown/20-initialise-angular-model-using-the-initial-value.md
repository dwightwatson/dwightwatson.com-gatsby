---
title: "Initialise Angular model using the initial value"
path: /posts/initialise-angular-model-using-the-initial-value
author: Dwight Watson
date: 2013-09-13
tags: ["angular", "laravel"]
---

Thanks to a little help from Stack Overflow, I found out that the reason that my form inputs with values inserted by the server we being emptied upon the Angular controller loading up. What I thought was the fault of `$watch` overwriting the existing input value turns out to be the fault of data binding.

    &lt;input type=&quot;text&quot; name=&quot;first_name&quot; value=&quot;Dwight&quot; ng-model=&quot;name&quot;&gt;
	
As soon as the controller is loaded, the input is emptied and the value of `$scope.name` is `undefined`. This is because, as far as Angular is concerned, data should be coming from the model - and not from the view. This is a little awkward in web apps that aren&#039;t entirely a client-side single page app. For example, in my situation everything is done server-side, and I wanted to use Angular to simply do a few tiny things.

The &quot;proper&quot; Angular solution in this would be to load the form in, empty, and then use Angular to hit up the server and get the data that would fill the fields. That way, maintaining a proper MVC-distinction on the client-side (that is, the model is separated from the view). However, I didn&#039;t really like this solution for the server-side app as it would require re-wiring that whole form just so Angular could use it the way I wanted it. Laravel&#039;s form validation and model binding was doing just fine, if I wanted to totally Ajax-ify the form I could do so later down the track.

The &quot;workaround&quot; Angular solution is to produce a directive that will initialise a model using the value of the input when the page loads. It&#039;s a bit of a hack, but it&#039;s also not really.

    app.directive(&#039;initModel&#039;, function($compile) {
		return {
			restrict: &#039;A&#039;,
			link: function(scope, element, attrs) {
				scope[attrs.initModel] = element[0].value;
				element.attr(&#039;ng-model&#039;, attrs.initModel);
				element.removeAttr(&#039;init-model&#039;);
				$compile(element)(scope);
			}
		};
	}
	
Then, simply use your new `init-model` directive instead of `ng-model`:

    &lt;input type=&quot;text&quot; name=&quot;first_name&quot; value=&quot;Dwight&quot; init-model=&quot;name&quot;&gt;
	
For the sake of completeness, here is another (uglier) solution, should you want to avoid a directive:

   &lt;input type=&quot;text&quot; name=&quot;first_name&quot; value=&quot;Dwight&quot; ng-model=&quot;name&quot; ng-init=&quot;name=&#039;Dwight&#039;&quot;&gt;
