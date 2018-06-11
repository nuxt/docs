---
title: Ressources
description: Nuxt utilise vue-loader, file-loader et url-loader avec webpack par défaut pour servir les fichiers statiques mais vous pouvez également utiliser un répertoire `static` pour les fichiers statiques.
---

> Nuxt utilise vue-loader, file-loader et url-loader avec webpack par défaut pour servir les fichiers statiques mais vous pouvez également utiliser un répertoire `static` pour les fichiers statiques.

## Avec webpack

Par défaut, [vue-loader](http://vue-loader.vuejs.org/) traite automatiquement vos fichiers de styles et vos templates à l'aide de `css-loader` et du compilateur de template de Vue. Dans ce processus de compilation, toutes les URL des fichiers comme `<img src="...">`, `background: url(...)` et les CSS `@import` sont résolus en tant que dépendances des modules.

Imaginons par exemple cette arborescence :

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

Dans votre CSS, si nous utilisons `url('~/assets/image.png')`, ce sera transformé en `require('~/assets/image.png')`.

Ou si dans `pages/index.vue` vous utilisez :

```html
<template>
  <img src="~assets/image.png">
</template>
```

Ce sera compilé en :

```js
createElement('img', { attrs: { src: require('~/assets/image.png') }})
```

Puisque que les fichiers `.png` ne sont pas des fichiers JavaScript, Nuxt.js configure webpack pour utiliser [file-loader](https://github.com/webpack/file-loader) et [url-loader](https://github.com/webpack/url-loader) afin de pouvoir s'en charger.

Leurs avantages sont :

- file-loader vous laisse définir ou copier les ressources, comment les nommer et vous permet d'utiliser des hashs de version pour un meilleur cache.
- url-loader vous permet d'insérer de façon conditionnelle un fichier en tant qu'URL encodé en base 64 si sa taille est inférieure à un seuil donné. Cela peut réduire un certain nombre de demandes HTTP pour les fichiers triviaux. Si la taille du fichier est supérieure au seuil, il retombe automatiquement sur file-loader.

Actuellement, la configuration des loaders par défaut de Nuxt.js est la suivante :

```js
[
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1 ko
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1 ko
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

Ce qui signifie que tous les fichiers inférieurs à 1 ko seront intégrés comme URL base-64. Sinon, l'image / police sera copiée dans son dossier correspondant (dans le répertoire `.nuxt`) avec un nom contenant des hashs de version pour une meilleure mise en cache.

Lors du lancement de notre application avec `nuxt`, notre template dans `pages/index.vue` :

```html
<template>
  <img src="~/assets/image.png">
</template>
```

Sera transformé en :

```html
<img src="/_nuxt/img/image.0c61159.png">
```

Si vous désirez modifier ou désactiver ces loaders, consultez la documentation sur [la propriété `extend` de la page La propriété `build`](/api/configuration-build#extend).

## Avec des fichiers statiques

Si vous ne souhaitez pas utiliser les ressources à l'aide de webpack à partir du répertoire `assets`, vous pouvez créer et utiliser le répertoire `static` dans le répertoire racine du projet.

Ces fichiers seront automatiquement servis par Nuxt et accessibles via l'URL racine du projet.

Cette option est utile pour les fichiers tels que `robots.txt`, `sitemap.xml` ou `CNAME` (pour les pages hébergées sur GitHub par ex.).

À partir de votre code vous pouvez ensuite référencer ces fichiers avec un URL commencant par `/` :

```html
<!-- Image statique du répertoire `static` -->
<img src="/mon-image.png"/>

<!-- Image avec webpack du répertoire `assets` -->
<img src="~/assets/mon-image-2.png"/>
```
