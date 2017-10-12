---
title: Plugins PostCSS
description: Comment utiliser des plugins PostCSS ?
---

# Comment utiliser des plugins PostCSS ?

Dans votre fichier `nuxt.config.js` :

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
