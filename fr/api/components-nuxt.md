---
title: "API : le composant <nuxt> (EN)"
description: Affiche un composant de page à l'intérieur d'une mise en page.
---

# Le composant &lt;nuxt&gt; (EN)

> Ce composant est utilisé seulement dans les [mises en page](/guide/views#mises-en-page) pour afficher les composants de page.

Example (`layouts/default.vue`):

```html
<template>
  <div>
    <div>Ma barre de navigation</div>
    <nuxt/>
    <div>Mon pied de page</div>
  </div>
</template>
```

Pour voir un exemple, consultez l'[exemple de mise en page](/examples/layouts).

**Props** :

- nuxtChildKey : `string`
  - Cette prop va être appliquée à `<router-view/>`. Utile pour faire des transitions à l'intérieur d'une page dynamique et d'une route différente.
  - par défaut : `$route.path`

There are 3 ways to handle internal `key` prop of `<router-view/>`.

1. `nuxtChildKey` prop

  ```html
  <template>
     <div>
       <nuxt :nuxt-child-key="someKey"/>
     </div>
  </template>
  ```

2. `key` option in page components: `string` or `function`

  ```js
  export default {
     key(route) {
       return route.fullPath
     }
  }
  ```

- name: `string` (_introduced with Nuxt v2.4.0_)
  - This prop will be set to `<router-view/>`, used to render named-view of page component.
  - Default: `default`

To see an example, take a look at the [named-views example](/examples/named-views).

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p>
