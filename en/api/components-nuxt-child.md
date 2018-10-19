---
title: "API: The <nuxt-child> Component"
description: Display the current page.
---

# The &lt;nuxt-child&gt; Component

> This component is used for displaying the children components in a [nested route](/guide/routing#nested-routes).

Example:

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
    <nuxt-child :foobar="123" />
  </div>
</template>
```

`<nuxt-child/>` accepts `keep-alive` and `keep-alive-props`:

```html
<template>
  <div>
    <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- will be converted into something like this -->
<div>
  <keep-alive :exclude="['modal']">
    <router-view />
  </keep-alive>
</div>
```

> Child components can also receive properties like a regular Vue component.

To see an example, take a look at the [nested-routes example](/examples/nested-routes).
