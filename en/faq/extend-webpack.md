---
title: Extend Webpack
description: How to extend webpack config into my Nuxt.js application?
---

# How to extend webpack config? (En)

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>You can extend the webpack configuration via the `extend` option in your `nuxt.config.js`:</p>

```js
module.exports = {
  build: {
     extend (config, { dev, isClient }) {
       // ...
     }
  }
}
```
