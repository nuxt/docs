---
title: "API: The <nuxt-child> Component"
description: Display the current page.
---

# Le composant &lt;nuxt-child&gt;

> Ce composant est utilisé pour afficher les composants enfants dans une [route imbriquée](/guide/routing#routes-imbriqu-es).

Exemple :

```bash
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

Cet arbre de fichier va générer ces routes :

```js
[
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~/pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```

Pour afficher le composant `child.vue`, nous avons dû insérer `<nuxt-child/>` à l'intérieur de `pages/parent.vue` :

```html
<template>
  <div>
    <h1>Je suis la vue parente</h1>
    <nuxt-child/>
  </div>
</template>
```

Pour voir un exemple, consultez l'[exemple de routes imbriquées](/examples/nested-routes).
