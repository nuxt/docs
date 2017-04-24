---
title: Déployer avec Surge.sh
description: Déployer nuxt.js avec Surge.sh
---

# Déployer avec Surge.sh

Nuxt.js vous donne la possibilité d'héberger votre application web sur n'importe quel hébergeur statique tel que [surge.sh](https://surge.sh/) par exemple.

Pour déployer sur surge.sh, installez surge sur votre ordinateur:
```bash
npm install -g surge
```

Puis demander à nuxt.js de générer votre applicaiton web:
```bash
npm run generate
```

Cela créera un répertoire `dist` contenant les fichiers prêts à être déployés sur un hébergement statique.

Nous pouvons alors déployer sur surge.sh:
```bash
surge dist/
```

Tadaaa :)

Si vous avez un projet avec des [routes dynamiques](/guide/routing#dynamic-routes), lisez la configuration de [generate](/api/configuration-generate) afin d'expliquer à nuxt.js comment les générer.

<div class="Alert">Quand vous générez votre application web via `nuxt generate`, [le contexte](/api) passé to [data()](/guide/async-data#the-data-method) et [fetch()](/guide/vuex-store#the-fetch-method) ne disposent pas de `req` ni de `res`</div>
