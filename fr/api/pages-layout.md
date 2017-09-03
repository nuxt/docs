---
title: "API: la propriété layout"
description: Chaque fichier (premier niveau) dans le répertoire layouts créera un layout personnalisé accessible avec la propriété layout dans le composant page.
---

# La propriété layout

> Chaque fichier (premier niveau) dans le répertoire layouts créera un layout personnalisé accessible avec la propriété layout dans le composant page.

- **Type:** `String` ou `Function` (defaut: `'default'`)

Utilisez la clef `layout` dans vos composants de pages pour définir le layout à utiliser:

```js
export default {
  layout: 'blog',
  // OU
  layout (context) {
    return 'blog'
  }
}
```

Dans cet exemple, Nuxt.js incluera le fichier `layouts/blog.vue` comme layout pour ce composant page.

En action dans [cette vidéo de démonstration](https://www.youtube.com/watch?v=YOKnSTp7d38).

Afin de comprendre comment les layouts fonctionnent avec nuxt.js, regarder la [documentation sur les layouts](/guide/views#layouts).
