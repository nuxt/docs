---
title: "API : le composant <nuxt-link>"
description: Lie les pages entre elles avec `<nuxt-link>`.
---

# Le composant &lt;nuxt-link&gt;

> Ce composant est utilisé pour lier les composants de page entre eux.

Actuellement, `<nuxt-link>` est identique à [`<router-link>`](https://router.vuejs.org/fr/api/router-link.html). Nous vous recommandons d'apprendre à l'utiliser avec la [documentation de Vue Router](https://router.vuejs.org/fr/api/router-link.html).

Exemple (`pages/index.vue`) :

```html
<template>
  <div>
    <h1>Home page</h1>
    <nuxt-link to="/a-propos">À propos</nuxt-link>
  </div>
</template>
```

Dans le futur, nous ajouterons des fonctionnalités au composant `<nuxt-link>`, comme du préchargement en tâche de fond pour améliorer la réactivité des applications Nuxt.js.
