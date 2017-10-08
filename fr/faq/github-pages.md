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
