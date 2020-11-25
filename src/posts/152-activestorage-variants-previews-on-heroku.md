---
title: "ActiveStorage variants & previews on Heroku"
path: /posts/activestorage-variants-previews-on-heroku
author: Dwight Watson
date: 2018-01-02
tags: ["activestorage", "ruby on rails"]
---

**This solution does not work as expected - please see the comments for some more information regarding first-party support being added by Heroku down the line.**

Rails 5.2 will ship with a new feature called ActiveStorage which makes it a breeze to upload files to the cloud. In addition it provides an easy way to produce variants and previews of these files. Variants are great for when you need images cropped/resized or otherwise adjusted for certain views, and previews are great when you want to provide a thumbnail of media - for example a screenshot of a video or a cover page of a PDF.

In order to generate variants and previews Rails has some additional dependencies - third-party software that is better suited to the job. For images you’ll need `imagemagick`, for PDFs you’ll need `mupdf` and for video you’ll need the tried-and-true `ffmpeg`. Depending on how your production environment is configured you’ll need to investigate your installation options, but here’s how to get it up and running on Heroku.

First you’ll need to add an `Aptfile` to the root of your project which simply lists out the dependencies your app requires with a new line for each. Obviously, adjust these as you need.

```
imagemagick
ffmpeg
mupdf
```

Finally, you’ll need to add a new build pack provided by Heroku - [`heroku-buildpack-apt`](https://github.com/heroku/heroku-buildpack-apt) You can choose to add it in Heroku’s dashboard or your `app.json` file if you prefer. It’s important to note that this is a first-party build pack so it’s officially supported and likely to be maintained. The buildpack works by installing additional dependencies from `apt` and also ensuring they’re cached between deployments so you aren’t re-installing from scratch each time.

Edit: updated post to add the `Aptfile` before the buildpack, as the buildpack will say it's not compatible with your app unless the `Aptfile` is present.
