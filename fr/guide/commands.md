---
title: Commandes et déploiement
description: Nuxt.js est livré avec un ensemble de commandes utiles, tant pour le développement que pour la production.
---

> Nuxt.js est livré avec un ensemble de commandes utiles, tant pour le développement que pour la production.

## Liste des commandes

| Commande      | Description                                                                                                       |
|---------------|-------------------------------------------------------------------------------------------------------------------|
| nuxt          | Lancer un serveur de développement sur localhost:3000 avec du rechargement à chaud.                               |
| nuxt build    | Créez votre application avec un serveur web et minifiez les JS & CSS (pour la production).                        |
| nuxt start    | Démarrez le serveur en mode production (après avoir exécuté `nuxt build`).                                        |
| nuxt generate | Créez l'application et générez toutes les routes en tant que fichiers HTML (utilisé pour l'hébergement statique). |

#### Arguments

Vous pouvez utiliser `--help` avec n'importe quelle commande pour obtenir des détails d'utilisation. Les arguments communs sont :

- **`--config-file` ou `-c`:** spécifie le chemin vers le fichier `nuxt.config.js`.
- **`--spa` ou `-s`:** lance la commande en mode application monopage en désactivant le rendu côté serveur.

#### Utiliser un fichier package.json

Vous devriez ajouter ces commandes au `package.json` :

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

Ensuite, vous pouvez lancer vos commandes via `npm run <command>` (exemple : `npm run dev`).

<p class="Alert Alert--nuxt-green"><b>Astuce :</b> pour passer des arguments à une commande npm, vous devez utiliser un <code>--</code> supplémentaire après le nom du script (exemple : <code>npm run dev -- --spa</code>).</p>

## Environnement de développement

Pour lancer Nuxt dans le mode de développement avec le rechargement à chaud :

```bash
nuxt
// OU
npm run dev
```

## Déploiement en production

Nuxt.js permet de choisir entre trois modes de déploiement pour votre application : rendu côté serveur, application monopage ou généré de manière statique.

### Déploiement pour un rendu côté serveur (universelle)

Pour déployer, au lieu d'exécuter `nuxt`, vous voulez probablement faire d'abord la construction. Par conséquent, la construction et le démarrage sont des commandes distinctes :

```bash
nuxt build
nuxt start
```

Le fichier `package.json` suivant est recommandé :

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

Note : nous recommandons d'ajouter `.nuxt` dans `.npmignore` ou `.gitignore`.

### Déploiement pour une génération statique

Nuxt.js vous offre la possibilité d'héberger votre application web sur tout hébergement statique.

Pour générer votre application web en fichiers statiques :

```bash
npm run generate
```

Il créera un dossier `dist` avec tout à l'intérieur prêt à être déployé sur un hébergement de site statique.

Si vous avez un projet avec des [routes dynamiques](/guide/routing#dynamic-routes), regardez la [configuration de la commande generate](/api/configuration-generate) afin de dire à Nuxt.js comment générer ces routes dynamiques.

<div class="Alert">Lors de la génération de votre application web avec `nuxt generate`, [le contexte](/api/context) donné à [data()](/guide/async-data#la-m-thode-data) et [fetch()](/guide/vuex-store#la-m-thode-fetch) n'aura pas de `req` et `res`.</div>

### Déploiement pour une application monopage (SPA)

`nuxt generate` a toujours besoin du SSR pendant le temps de génération afin de prérendre nos pages dans le but d'obtenir un chargement de page rapide et du contenu solide pour la SEO. Le contenu est généré lors de la *phase de build*. Il ne faut pas l'utiliser, par exemple, pour les applications ou le contenu dépend de l'authentification de l'utilisateur ou pour une API en temps réel (du moins pour le premier chargement).

L'idée de l'application monopage est simple ! Quand le mode SPA est activé en utilisant `mode: 'spa'` ou l'option `--spa`, la génération se lance automatiquement après le build mais cette fois sans contenu de page et seulement avec les meta, ressources et liens communs.

Donc pour un déploiement en mode SPA, vous devez :

- Changez le `mode` dans `nuxt.config.js` pour `spa`.
- Lancez `npm run build`.
- Déployez le dossier `dist/` créé sur votre hébergement statique comme Surge, GitHub Pages ou nginx.

Une autre possibilité de déploiement est que nous pouvons utiliser Nuxt comme un middleware dans des frameworks si le mode est `spa`. Ceci aide à réduire le temps de chargement et à utiliser Nuxt dans des projets ou le SSR n'est pas possible.

<div class="Alert">Consultez [Comment déployer sur Heroku ?](/faq/heroku-deployment) pour un exemple de déploiement sur des hébergements populaires.</div>

<div class="Alert">Counsultez [Comment déployez sur GitHub Pages ?](/faq/github-pages) pour plus d'informations sur un hébergement GitHub Pages.</div>
