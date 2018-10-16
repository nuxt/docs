---
title: "API: La propriété buildDir"
description: Définissez le dossier dist de votre application Nuxt.js
---

# La propriété buildDir

- Type: `String`
- Par défaut: `.nuxt`

> Définissez le répertoire dist de votre application Nuxt.js

Exemple (`nuxt.config.js`):

```js
module.exports = {
  buildDir: 'nuxt-dist'
}
```

Par défaut, de nombreux outils supposent que `.nuxt` est un répertoire caché, car son nom commence par un point. Vous pouvez utiliser cette option pour rendre le dossier dist non masqué.
