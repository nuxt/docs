---
title: Assets
description: Nuxt utilise vue-loader, file-loader et url-loader avec Webpack par défaut pour un servir les fichiers statiques, mais vous pouvez également utiliser le répertoire "Static" pour les fichiers statiques.
---

> Nuxt utilise vue-loader, file-loader et url-loader avec Webpack par défaut pour un servir les fichiers statiques, mais vous pouvez également utiliser le répertoire "Static" pour les fichiers statiques.

## Avec Webpack

Par défaut, [vue-loader](http://vue-loader.vuejs.org/en/) traite automatiquement vos fichiers de style et vos templates à l'aide de `css-loader` et du compilatuer de template de Vue. Dans ce processus de compilation, toutes les URLs des fichiers comme `<img src="...">`, `background: url(...)` et le CSS `@import` sont résolues en tant que dépendances des modules.

Par exemple, avec cette arborescence:

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

Dans notre CSS, si nous utilisons `url('~assets/image.png')`, ce sera transformé en `require('~assets/image.png')`.

Ou si dans `pages/index.vue` nous utilisons:
```html
<template>
  <img src="~assets/image.png">
</template>
```

Ce sera compilé en:

```js
createElement('img', { attrs: { src: require('~assets/image.png') }})
```

Puisque que les fichiers `.png` ne sont pas des fichiers JavaScript, nuxt.js configure Webpack afin d'utiliser [file-loader](https://github.com/webpack/file-loader) et [url-loader](https://github.com/webpack/url-loader) afin de pouvoir s'en charger.

Leurs avantages sont:
- `file-loader` vous laisse définir ou copier les assets, comment les nommer et vous permets d'utiliser des hash de version pour un meilleur cache.
- `url-loader` vous permet d'insérer de façon conditionnelle un fichier en tant qu'URL encodée en base 64 si sa taille est inférieure à un seuil donné. Cela peut réduire un certain nombre de demandes HTTP pour les fichiers triviaux. Si la taille du fichier est supérieur au seuil, il retombe automatiquement sur `file-loader`.

Actuellement, la configuration des loaders par défaut de Nuxt.js est la suivante:

```js
[
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1KO
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1KO
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

Ce qui signifie que tous les fichiers inférieurs à 1KO seront intégrés comme URL base-64. Sinon, l'image/police sera copiée dans son dossier correspondant (dans le répertoire `.nuxt`) avec un nom contenant des hach de version pour une meilleure mise en cache.

Lors du lancement de notre application avec `nuxt`, notre modèle dans` pages/index.vue`:

```html
<template>
  <img src="~assets/image.png">
</template>
```

Sera transformé en:
```html
<img src="/_nuxt/img/image.0c61159.png">
```

Si vous désirez modifier ou désactiver ces loaders, regarder la [documentation sur les loaders](/api/configuration-build#loaders).

## Static

Si vous ne souhaitez pas utiliser les assets à l'aide de Webpack à partir du répertoire `assets`, vous pouvez créer et utiliser le répertoire` static` dans le répertoire racine du projet.

Ces fichiers seront automatiquement servis par Nuxt et accessibles via l'URL racine du projet.

Cette option est utile pour les fichiers tels que `robots.txt`,` sitemap.xml` ou `CNAME` (pour GitHub Pages et autres).

À partir de votre code, vous pouvez ensuite référencer ces fichiers avec de URLs commencant par `/`:

```html
<!-- Static image from static directory -->
<img src="/my-image.png"/>

<!-- Webpacked image from assets directory -->
<img src="/assets/my-image-2.png"/>
```
