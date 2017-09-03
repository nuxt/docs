---
title: Commandes
description: Nuxt.js est livré avec un ensemble de commandes utiles, tant pour le développement que pour la production.
---

> Nuxt.js est livré avec un ensemble de commandes utiles, tant pour le développement que pour la production.

## Liste des commandes

| Commande | Description |
|---------|-------------|
| nuxt | Lancer un serveur de développement sur [localhost:3000](http://localhost: 3000) avec hot-reloading. |
| nuxt build | Créez votre application avec un serveur Web et minifiez le JS & CSS (pour la production). |
| nuxt start | Démarrez le serveur en mode production (après avoir exécuté `nuxt build`). |
| nuxt generate | Créez l'application et générez toutes les routes en tant que fichiers HTML (utilisé pour l'hébergement statique). |

Vous devriez ajouter ces commandes à `package.json`:

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

Ensuite, vous pouvez lancer vos commandes via `npm run <command>` (exemple: `npm run dev`).

## Environnement de développement

Pour lancer Nuxt dans le mode de développement avec le hot-reloading:

```bash
nuxt
// OU
npm run dev
```

## Déploiement en production

Nuxt.js permet de choisir entre 2 modes de déploiement de votre application: Rendu côté serveur ou généré de manière statique.

### Rendu côté serveur

Pour déployer, au lieu d'exécuter nuxt, vous voulez probablement construire à l'avance. Par conséquent, la construction et le démarrage sont des commandes distinctes:

```bash
nuxt build
nuxt start
```

Le fichier `package.json` suivant est recommandé:
```json
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```

Note: nous recommandaons d'ajouter `.nuxt` dans `.npmignore` ou `.gitignore`.

### Généré de manière statique

Nuxt.js vous offre la possibilité d'héberger votre application Web sur tout hébergement statique.

Pour générer votre application Web en fichiers statiques:

```bash
npm run generate
```

Il créera un dossier `dist` avec tout à l'intérieur prêt à être déployé sur un hébergement statique.

Si vous avez un projet avec des [routes dynamiques](/guide/routing#dynamic-routes), regarder la [configuration de la commande generate](/api/configuration-generate) afin de dire à nuxt.js comment générer ces routes dynamiques.

<div class="Alert">Lors de la génération de votre application Web avec `nuxt generate`, le contexte donné à [data()](/guide/async-data#the-data-method) et [fetch()](/guide/vuex-store#the-fetch-method) n'a pas de `req` et `res`.</div>
