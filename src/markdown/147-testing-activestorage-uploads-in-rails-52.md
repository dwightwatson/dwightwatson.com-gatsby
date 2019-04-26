---
title: "Testing ActiveStorage Uploads in Rails 5.2"
path: /posts/testing-activestorage-uploads-in-rails-52
author: Dwight Watson
date: 2017-08-23
tags: ["activestorage", "rspec", "ruby on rails"]
---

With ActiveStorage it’s pretty simple to test your controllers and check that file uploads are working the way you expect. Just configure your disk for the test environment and submit a fixture as part of the request and you’re good to go.

First configure your test environment to use ActiveStorage’s test disk. You can do this in `config/environments/test.rb`.

```rb
Rails.application.configure do
	config.active_storage.service = :test
end
```

Once that’s done you can use `fixture_file_upload` to get an image object you can submit with your request. In this example I’m using an image that’s in my public folder, but you can use whatever file you like.

```rb
describe 'POST #create' do
  it 'attaches the uploaded file' do
    file = fixture_file_upload(Rails.root.join('public', 'apple-touch-icon.png'), 'image/png')
    expect {
		post :create, params: { post: { image: file } }
    }.to change(ActiveStorage::Attachment, :count).by(1)
  end
end
```

By checking that an `ActiveStorage::Attachment` model was created we can be sure that the file was accepted and uploaded as expected. If you’re curious to see what the controller code for this example might look like, take a look at the following code.

```rb
def create
  @post = Post.find(params[:id])
  @post.image.attach(params.dig(:post, :image)
  redirect_to @post
end
```
