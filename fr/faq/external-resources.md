---
title: Ressources externes
description: Comment utiliser des ressources externes avec Nuxt.js?
---

# Comment utiliser des ressources externes?

## Paramètres globaux

Inclure vos ressources dans le fichier `nuxt.config.js`:

```js
module.exports = {
  head: {
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  }
}
```

## Paramètres locaux

Inclure vos ressources dans votre fichier .vue dans votre répertoire *pages*:

```html
<template>
  <h1>Page avec jQuery et la police de caractère Roboto</h1>
</template>

<script>
export default {
  head: {
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  }
}
</script>
```
