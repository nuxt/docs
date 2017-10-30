---
title: "API : le composant <nuxt>"
description: Affiche un composant de page à l'intérieur d'une mise en page.
---

# Le composant &lt;nuxt&gt;

> Ce composant est utilisé seulement dans les [mises en page](/guide/views#mises-en-page) pour afficher les composants de page.

**Props** :
- nuxtChildKey : `string`
  - Cette prop va être appliquée à `<router-view/>`. Utile pour faire des transitions à l'intérieur d'une page dynamique et d'une route différente.
  - par défaut : `$route.fullPath`

Exemple (`layouts/default.vue`) :

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
