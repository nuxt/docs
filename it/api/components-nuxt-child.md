---
title: 'API: Il '
description: Guarda questa pagina.
---

# Il componente <nuxt-child>

> Questo componente è utilizzato per mostrare i componenti figli come definiti nell'albero delle [route](/guide/routing#nested-routes).

Esempio:

```bash
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

Questo albero genererà queste routes.

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

Per mostrare il componente `child.vue`, dobbiamo inserire `<nuxt-child/>` all'interno della pagina `pages/parent.vue`:

```html
<template>
  <div>
    <h1>I am the parent view</h1>
    <nuxt-child/>
  </div>
</template>
```

Per visualizzare un esempio, dai uno sguardo a [nested-routes example](/examples/nested-routes).
