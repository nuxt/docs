---
title: "API: The buildDir Property"
description: Define the dist directory for your Nuxt.js application
---

# The buildDir Property

- Type: `String`
- Default: `.nuxt`

> Define the dist directory for your Nuxt.js application

Example (`nuxt.config.js`):

```js
module.exports = {
  buildDir: 'nuxt-dist'
}
```

By default, many tools assumes that `.nuxt` is hidden directory, because it's name starts with dot. You can use this option to make dist folder not hidden.
