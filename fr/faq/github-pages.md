---
title: Déployer sur GitHub Pages
description: Comment déployer une application Nuxt.js sur GitHub Pages
---

# Comment déployer sur GitHub Pages ?

Nuxt.js vous offre la possibilité d'héberger votre application web sur n'importe quel hébergeur statique tel que [GitHub Pages](https://pages.github.com/) par exemple.

Pour déployer sur GitHub Pages, vous devez générer votre application web de manière statique :

```bash
npm run generate
```

Cette commande crée un répertoire `dist` contenant l'intégralité de l'application prête à être déployée sur GitHub Pages. Cela sur la branche `gh-pages` pour un dépôt de projet OU sur la branche `master` pour le site d'un utilisateur ou d'une organisation.

<p class="Alert Alert--nuxt-green"><b>Info :</b> si vous utilisez un nom de domaine personnalisé pour GitHub Pages à l'aide d'un fichier `CNAME`, il est recommandé de placer ce fichier dans le répertoire `static`. [Plus d'informations](/guide/assets#static) à ce propos.</p>

## Déploiement d'un dépôt sur GitHub Pages

Si vous avez créer un système GitHub Pages pour un dépôt spécifique et que vous n'avez pas de domaine personnalisé, l'URL de la page sera de au format suivant `http://<utilisateur>.github.io/<nom-du-depot>`.

Si vous déployez le dossier `dist` sans ajouter une [base du router](https://nuxtjs.org/api/configuration-router/#base), quand vous visiterez le site déployé, les ressources de celui-ci seront indisponibles. Cela est du au fait que la base du site est `/` alors que dans le cas de GitHub Pages cette base est `/<repository-name>`.

Pour régler ce problème nous devons ajouter la configuration d'une [base au router](https://nuxtjs.org/api/configuration-router/#base) dans `nuxt.config.js` :

```js
module.exports = {
  router: {
    base: '/<nom-du-depot>/'
  }
}
```

De cette manière, tous les chemins aux ressources seront préfixés avec `/<nom-du-depot>/` et le prochain déploiement de code sur GitHub Pages ferra que votre site fonctionnera.

Il existe un inconvénient à ajouter un `router.base` par défaut dans `nuxt.config.js` cependant. Quand vous lancez `npm run dev`, cela ne fonctionnera plus puisque le chemin a changé. Pour résoudre ce problème, nous allons créer une condition pour `router.base` qui incluera le `<nom-du-depot>` :

```js
/* nuxt.config.js */
// ajouter seulement `router.base = '/<nom-du-depot>/'` si `DEPLOY_ENV` est `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/<nom-du-depot>/'
  }
} : {}

module.exports = {
  ...routerBase
}
```

et maintenant nous avons juste besoin de mettre `DEPLOY_ENV='GH_PAGES'` pour créer le site pour GitHub Pages :

```js
/* package.json */
"scripts": {
  "build:gh-pages": "DEPLOY_ENV=GH_PAGES nuxt build",
  "generate:gh-pages": "DEPLOY_ENV=GH_PAGES nuxt generate"
},
```

Pour les utilisateurs Windows, vous voudrez peut-être installer [cross-env](https://github.com/kentcdodds/cross-env) si vous n'utilisez pas `bash`.

```sh
npm install cross-env --save-dev
```

puis l'utiliser de cette manière :

```js
  "build:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt build",
  "generate:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt generate"
```

## Déploiement en ligne de commande

Vous pouvez également utiliser le package [push-dir](https://github.com/L33T-KR3W/push-dir):

Installez-le via npm :

```bash
npm install push-dir --save-dev
```

Ajoutez une commande `deploy` à votre `package.json` avec la branche `gh-pages` pour un dépôt de projet OU avec la branche `master` pour le site d'un utilisateur ou d'une organisation.

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate",
  "deploy": "push-dir --dir=dist --branch=gh-pages --cleanup"
},
```

Puis générez et déployez votre application statique :

```bash
npm run generate
npm run deploy
```
