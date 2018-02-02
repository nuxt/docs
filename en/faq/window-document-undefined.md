---
title: window / document undefined
description: window / document undefined avec Nuxt.js ?
---

# window / document undefined ?

Cette erreur est due au rendu côté serveur. Si vous devez spécifier que vous souhaitez importer une ressource uniquement côté client, vous devez utiliser la variable `process.browser`.

Par exemple, dans votre fichier `.vue` :

```js
if (process.browser) {
  require('external_library')
}
```

N'oubliez pas d'ajouter la librairie dans votre [paquetage vendor](/api/configuration-build#build-vendor) dans `nuxt.config.js` :

```js
  build: {
    vendor: ['external_library']
  }
```
