---
title: Plugins postcss
description: Comment utiliser des plugins postcss
---

# Comment utiliser des plugins postcss

Dans votre fichier `nuxt.config.js`:

```js
module.exports = {
  build: {
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')(),
    ]
  }
}
```
