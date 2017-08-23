---
title: Déploiement sur Dokku
description: Déployer nuxt.js sur Dokku
---

# Déployer sur Dokku

Nous vous recommandons de lire la [documentation du setup Dokku](http://dokku.viewdocs.io/dokku/getting-started/installation/) et [Deploying a Node.js Application on Digital Ocean using dokku](http://jakeklassen.com/post/deploying-a-node-app-on-digital-ocean-using-dokku/)

Pour l'exemple, nous allons appeler notre application nuxt.js `my-nuxt-app`.

Demandons à Dokku d'installer les `devDependencies` de notre projet (afin de pouvoir exécuter `npm run build`):
```bash
// on Dokku Server
dokku config:set my-nuxt-app NPM_CONFIG_PRODUCTION=false
```

Nous voulons également que notre application écoute le port `0.0.0.0` et s'exécute en mode production:
```bash
// on Dokku Server
dokku config:set my-nuxt-app HOST=0.0.0.0 NODE_ENV=production
```

Vous devriez voir ces trois lignes quand vous tapez `dokku config my-nuxt-app`

![nuxt config vars Dokku](https://i.imgur.com/9FNsaoQ.png)

Puis nous pouvons demander à Dokku d'exécuter `npm run build` via le script `scripts.dokku.predeploy` dans `app.json`:
`créez un fichier nommé app.json dans le répertoire racine de votre projet`
```js
{
  "scripts": {
    "dokku": {
      "predeploy": "npm run build"
    }
  }
}
```

Pour finir, nous pouvons déployer notre application sur Dokku:
```bash
// commit your change before push.
git remote add dokku dokku@yourServer:my-nuxt-app
git push dokku master
```

Voilà! Votre application nuxt.js est hébergée sur Dokku!
