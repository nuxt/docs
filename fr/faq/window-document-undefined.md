---
title: Window/Document undefined
description: Window/Document undefined avec Nuxt.js?
---

# Window/Document undefined?

Cette erreur est du au rendu côté serveur.
Si vous devez spécifier que vous souhaitez importer une ressource uniquement côté client, vous devez utiliser la variable `process.BROWSER_BUILD`.

Par exemple, dans votre fichier .vue:
```js
if (process.BROWSER_BUILD) {
  require('external_library')
}
```

N'oubliez pas d'ajouter la librairie dans le [bundle vendor](/api/configuration-build#build-vendor) dans `nuxt.config.js`:
```js
  build: {
    vendor: ['external_library']
  }
```
