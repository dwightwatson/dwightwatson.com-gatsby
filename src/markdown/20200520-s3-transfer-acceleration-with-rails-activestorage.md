---
title: "S3 Transfer Acceleration with Rails ActiveStorage"
path: /posts/s3-transfer-acceleration-with-rails-activestorage
author: Dwight Watson
date: 2020-05-20
tags: ["rails", "activestorage", "aws"]
---

I've known about [Amazon S3 Transfer Acceleration](https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html) for a while but haven't had a good use-case. In brief, this feature allows you to speed up direct user uploads to an S3 bucket even if they're further away from a bucket's geographic location. It turns out that using Transfer Acceleration is 50% faster when uploading from Sydney, Australia to an S3 bucket in `us-east-1`.

Rails ActiveStorage supports direct file uploads to S3 - which means your users browser will upload directly to S3 and then confirm the asset with your Rails app. This makes Rails apps a perfect use-case for Transfer Acceleration. In addition, it's also a cinch to configure. After you're enabled Transfer Acceleration on your bucket, just add the `user_accelerate_endpoint` configuration.

```yml
amazon:
  service: S3
  access_key_id: <%= Rails.application.secrets.dig(:aws, :access_key_id) %>
  secret_access_key: <%= Rails.application.secrets.dig(:aws, :secret_access_key) %>
  region: us-east-1
  bucket: <%= Rails.application.secrets.dig(:aws, :bucket) %>
  use_accelerate_endpoint: true
```

Rails will just pass this additional arugment to the S3 Ruby client and the rest is handled for you - it will upload to the accelerate endpoint and deliver faster uploads to your users.
