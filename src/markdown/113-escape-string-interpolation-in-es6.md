---
title: "Escape string interpolation in ES6"
path: /posts/escape-string-interpolation-in-es6
author: Dwight Watson
date: 2016-08-11
tags: ["javascript", "vue.js"]
---

I ran into an issue with string interpolation in ES6 and Vue.js today where it was trying to interpolate something that I wanted to be left as it was. I wanted to show a dollar sign followed by a Vue.js binding which looks a lot like the string interpolation syntax: `${}`.

```javascript
`&lt;span&gt;${{ coupon.amount }}&lt;/span&gt;`
```

However, escaping this interpolation is easy - you simply add a backslash `\` in front of either the dollar symbol `$` or the opening brace `{`.

```javascript
// Before the $
`&lt;span&gt;\${{ coupon.amount }}&lt;/span&gt;`

// Or before the {
`&lt;span&gt;$\{{ coupon.amount }}&lt;/span&gt;`
```

Alternatively, it&#039;s worth noting that if you&#039;ve run into the same issue as me (dealing with a dollar amount in Vue.js) then you can instead use the [`currency` filter](https://vuejs.org/api/#currency) which side-steps the issue altogether.

```
`&lt;span&gt;{{ coupon.amount | currency }}&lt;/span&gt;
```
