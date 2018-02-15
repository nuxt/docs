---
title: "API : la méthode head"
description: Nuxt.js utilise vue-meta pour mettre à jour les entêtes et les attributs HTML de votre application.
---

# La méthode head

> Nuxt.js utilise [vue-meta](https://github.com/declandewet/vue-meta) pour mettre à jour les entêtes et les attributs HTML de votre application.

- **Type :** `Object` ou `Function`

Utilisez la méthode `head` pour définir les balises d'entête HTML de la page courante.

Les données de votre composant sont disponibles avec `with` au sein de la méthode `head`, vous pouvez définir des balises meta personnalisées avec les données de page.

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  data () {
    return {
      title: 'Hello World !'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'Ma description personnalisée' }
      ]
    }
  }
}
</script>
```

<p class="Alert">Afin d'éviter les doublons quand vous utilisez un composant enfant, utilisez un identifiant unique à l'aide de la clé `hid`. En savoir [plus à ce propos](https://github.com/declandewet/vue-meta#lists-of-tags).</p>
