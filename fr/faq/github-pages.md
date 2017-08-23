---
title: Déployer sur GitHub Pages
description: Déployer nuxt.js sur GitHub Pages
---

# Déployer sur GitHub Pages

Nuxt.js vous offre la possibilité d'héberger votre application web sur n'importe quel hébergeur statique tel que [GitHub Pages](https://pages.github.com/) par exemple.

Pour déployer sur GitHub Pages, vous devez générer votre applicaiton web de manière statique:
```bash
npm run generate
```

Cette commande créé un répertoire `dist` contenant l'intégralité de l'application prêts à être déployés sur GitHub Pages.
Branche `gh-pages` pour un repository de projet OU branche `master` pour un site d'un utilisateur/d'une organisation.

<p class="Alert Alert--nuxt-green"><b>INFO:</b> Si vous utilisez un nom de domaine personalisé pour GitHub Pages à l'aide d'un fichier `CNAME`, il est recommandé de placer ce fichier dans le répertoire `static`. [Plus d'informations](/guide/assets#static) à ce propos.</p>

## Déploiement en ligne de commande

Vous pouvez également utiliser le package [push-dir](https://github.com/L33T-KR3W/push-dir):

Installez le via npm:
```bash
npm install push-dir --save-dev
```

Ajouter une commande `deploy` à votre package.json avec la branche `gh-pages` un repository de projet OU branche `master` pour un site d'un utilisateur/d'une organisation.

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate",
  "deploy": "push-dir --dir=dist --branch=gh-pages --cleanup"
},
```

Puis générez et déployez votreapplication statique:
```bash
npm run generate
npm run deploy
```
