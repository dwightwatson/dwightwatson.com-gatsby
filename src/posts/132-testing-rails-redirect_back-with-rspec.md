---
title: "Testing Rails redirect_back with RSpec"
path: /posts/testing-rails-redirect_back-with-rspec
author: Dwight Watson
date: 2017-07-17
tags: ["rspec", "ruby on rails"]
---

Rails has a handy redirect method called `redirect_back(fallback_location:)` which replaces the old `redirect_to :back` syntax. It's improved now because it gracefully handles the case where there is no referrer and allows you to indicate where the visitor should be sent to. The only issue is there's no testing support for it out of the box.

You can of course just test that a visitor is redirected to the fallback location, that's fine. But if it's important to your app that the visitor is redirected back to where they came from you'll need to make some changes.

First, make a helper module in `spec/support/redirect_back.rb` which simply defines the `from` method:

```rb
module RedirectBack
  def from(url)
    request.env['HTTP_REFERER'] = url
  end
end
```

Really simple - just sets the `HTTP_REFERER` ([typo intended](https://en.wikipedia.org/wiki/HTTP_referer)) which Rails will then attempt to use as the "back" location. Then, simply include the `RedirectBack` helper module with RSpec so you can use the method in your specs.

```rb
RSpec.configure do |config|
  config.include RedirectBack
end
```

Then you can call the `from` method in your tests whenever you want to test the `redirect_back` functionality. Here's an example test which shows how we come "from" the about page and then expect to get redirected back there should the request be handled successfully.

```rb
RSpec.describe InterestsController, type: :controller do
  describe 'POST #create' do
    context 'with valid attributes' do
      it 'redirects to referer' do
        from about_path
        post :create, params: { interest: attributes_for(:interest) }
        expect(response).to redirect_to about_url
      end
    end
  end
end
```
