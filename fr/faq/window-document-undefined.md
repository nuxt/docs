---
title: window ou document non défini
description: window ou document non défini avec Nuxt.js ?
---

# window ou document non défini ?

Cette erreur est due au rendu côté serveur. Si vous devez spécifier que vous souhaitez importer une ressource uniquement côté client, vous devez utiliser la variable `process.client`.

Par exemple, dans votre fichier `.vue` :

```js
if (process.client) {
  require('external_library')
}
```

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>
