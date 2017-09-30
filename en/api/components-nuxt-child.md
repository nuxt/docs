---
title: "API: The <nuxt-child> Component"
description: Display the current page
---

# The &lt;nuxt-child&gt; Component (En)

> This component is used for displaying the children components in a [nested route](/guide/routing#nested-routes).

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Example:</p>

```bash
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

This file tree will generate these routes:
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

To display the `child.vue` component, we have to insert `<nuxt-child/>` inside `pages/parent.vue`:

```html
<template>
  <div>
    <h1>I am the parent view</h1>
    <nuxt-child/>
  </div>
</template>
```

To see an example, take a look at the [nested-routes example](/examples/nested-routes).
