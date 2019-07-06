---
title: "API : le composant <nuxt-link> (EN)"
description: Lie les pages entre elles avec `<nuxt-link>`.
---

# Le composant &lt;nuxt-link&gt; (EN)

> Ce composant est utilisé pour fournir une navigation entre les composants de page et amériorer les performances avec du préchargement intelligent.

Le composant `<nuxt-link>` est une base de Nuxt. Il **devrait être utilisé pour naviguer** à traver votre application, tout comme le composant `<router-link>` l'est pour une application Vue traditionnelle. En fait, `<nuxt-link>` étend [`<router-link>`](https://router.vuejs.org/api/#router-link). Cela signifie qu'il prend les mêmes propriétés et qu'il peut être utilisé de la même manière. Nous vous recommandons d'apprendre à l'utiliser avec la [documentation de Vue Router](https://router.vuejs.org/fr/api/#router-link).

Exemple (`pages/index.vue`) :

```html
<template>
  <div>
    <h1>Home page</h1>
    <nuxt-link to="/a-propos">À propos (lien interne appartenant à l'application Nuxt)</nuxt-link>
    <a href="https://nuxtjs.org">Lien externe vers une autre page</a>
  </div>
</template>
```

**Aliases:** `<n-link>`, `<NuxtLink>`, and `<NLink>`

> Added with Nuxt.js v2.4.0

To improve the responsiveness of your Nuxt.js applications, when the link will be displayed within the viewport, Nuxt.js will automatically prefetch the *code splitted* page. This feature is inspired by [quicklink.js](https://github.com/GoogleChromeLabs/quicklink) by Google Chrome Labs.

To disable the prefetching of the linked page, you can use the `no-prefetch` prop:

```html
<n-link to="/about" no-prefetch>About page not pre-fetched</n-link>
```

You can configure globally this behaviour with [router.prefetchLinks](/api/configuration-router#prefetchlinks).

The `prefetched-class` prop is also available to customize the class added when the code splitted page has been prefetched. Make sure to set up this functionality globally with [router.linkPrefetchedClass](/api/configuration-router#linkprefetchedclass).

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>
