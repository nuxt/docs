---
title: Window or Document undefined
description: Window or Document undefined with Nuxt.js?
---

# Window or Document undefined? (En)

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>This is due to the server-side rendering.
If you need to specify that you want to import a resource only on the client-side, you need to use the `process.browser` variable.</p>

For example, in your `.vue` file:
```js
if (process.browser) {
  require('external_library')
}
```

If you are using this library within multiple files, we recommend that you add it into your [vendor bundle](/api/configuration-build#build-vendor) via `nuxt.config.js`:
```js
  build: {
    vendor: ['external_library']
  }
```
