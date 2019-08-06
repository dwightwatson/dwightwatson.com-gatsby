---
title: Using MapKit JS with Rails
path: /posts/using-mapkit-js-with-rails
author: Dwight Watson
date: 2019-08-06
tags: ["rails", "mapkit"]
---

Recently we migrated a website to use Apple's MapKit JS service - one that is currently in beta, but comes with plenty of daily quota for rendering static and dynamic maps. Rather than using a single token to load maps, MapKit appears to prefer you generate short-lived tokens for users, and also to sign any URL that links to a static map. The documentation only included example code for JavaScript (intended for server-side use) and so I've compiled our implementation for Rails (though mostly plain old Ruby) in case it's useful.

First, make your key ID and team ID available as application secrets in `config/secrets.yml`. For whatever reason I couldn't get the private key to load through here properly so I loaded it separately as you'll see later. Might be worth experimenting on your end to see if you get different results.

```yml
shared:
  mapkit:
    key_id: <%= ENV['MAPKIT_KEY_ID'] %>
    team_id: <%= ENV['MAPKIT_TEAM_ID'] %>
```

Next, here is the main `MapKit` class that is responsible for generating JWT and signing strings. They're just class methods with no additional magic going on - but you'll see the method `private_key` which loads the key file directly from the ENV, as it wasn't loading correctly through the application secrets.

```rb
class MapKit
  class << self
    def token
      headers = {
        'alg': ALGORITHM,
        'kid': Rails.application.secrets.dig(:mapkit, :key_id),
        'typ': 'JWT'
      }

      payload = {
        'iss': Rails.application.secrets.dig(:mapkit, :team_id),
        'iat': Time.now.to_i,
        'exp': 1.day.from_now.to_i
      }

      JWT.encode(payload, private_key, ALGORITHM, headers)
    end

    def sign(path)
      JWT::Base64.url_encode(JWT::Signature.sign(ALGORITHM, path, private_key))
    end

    private

    def private_key
      OpenSSL::PKey::EC.new(ENV['MAPKIT_PRIVATE_KEY'])
    end
  end
end
```

## Dynamic maps

You can use `MapKit.JWT` to generate the token you'll need to pass into the `authorizationCallback` to initialize MapKit JS. How you pass the token into your JavaScript will depend on your front-end approach, but with Stimulus.JS I just pass it through as a data attribute.

```html
<div data-controller="map" data-map-token="<%= MapKit.jwt %>">
</div>
```

Then it's easy to access in the controller connection phase.

```js
connect() {
  mapkit.init({
    authorizationCallback: (done) => {
      done(this.data.get('token'));
    }
  });
}
```

## Static maps

There are plenty of options to configure static maps - and whether you want markers on them or not, but here's my example for a plain old map centered on a given region. This shows how you use `MapKit.sign` to add the URL signature to authorize the request and adjust how you see fit.

```rb
def static_map(latitude, longitude, size: '400x150')
  options = {
    center: "#{address.latitude},#{address.longitude}",
    teamId: Rails.application.secrets.dig(:mapkit, :team_id),
    keyId: Rails.application.secrets.dig(:mapkit, :key_id),
    size: size,
    poi: 0,
    expires: 1.minute.from_now.to_i,
    z: 14
  }

  path = "/api/v1/snapshot?#{Rack::Utils.build_query(options)}"
  signature = MapKit.sign(path)
  "https://snapshot.apple-mapkit.com#{path}&signature=#{signature}"
end
```

That's all there is to it to get up and running. Though getting the authentication stuff working took a bit of stuffing around - I haven't used JWT before - I've really enjoyed working with MapKit JS. The documentation is still early and basic but there's enough detail there to get what you need out of it, and it's well designed enough to poke around and find that things work the way you expect. I look forward to seeing what more they do with MapKit JS going forward.
