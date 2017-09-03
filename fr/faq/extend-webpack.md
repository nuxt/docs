---
title: Étendre Webpack
description: Comment étendre la configuration de webpack?
---

# Comment étendre la configuration de webpack?

Vous pouvez étendre la configuration de webpack via l'option `extend` de votre fichier `nuxt.config.js`:

```js
module.exports = {
  build: {
     extend (config, { isDev, isClient }) {
       // ...
     }
  }
}
```
