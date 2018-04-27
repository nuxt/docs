---
title: "API: The buildDir Property"
description: Define the dist directory for your nuxt.js application
---

# The buildDir Property (EN)

- Type: `String`
- Default: `.nuxt`

> Define the dist directory for your nuxt.js application

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Example (`nuxt.config.js`):</p>

```js
module.exports = {
  buildDir: 'nuxt-dist'
}
```

By default, many tools assumes that `.nuxt` is hidden directory, because it's name starts with dot. You can use this option to make dist folder not hidden.
