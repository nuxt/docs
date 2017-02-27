---
title: "API: <nuxt-child> コンポーネント"
description: 現在のページを表示します。
---

<!-- title: "API: The <nuxt-child> Component" -->
<!-- description: Display the current page -->

<!-- # The &lt;nuxt-child&gt; Component -->

# &lt;nuxt-child&gt; コンポーネント

<!-- \> This component is used for displaying the children components in a [nested route](/guide/routing#nested-routes). -->

> このコンポーネントは [ネストしたルーティング](/guide/routing#nested-routes) 内で子コンポーネントを表示するために使われます。

<!-- Example: -->

例:

```bash
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

<!-- This file tree will generate these routes: -->

このファイルの木構造から次のルーティングが生成されます:

```js
[
  {
    path: '/parent',
    component: '~pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```

<!-- To display the `child.vue` component, I have to insert `<nuxt-child/>` inside `pages/parent.vue`: -->

`child.vue` コンポーネントを表示するには `pages/parent.vue` 内に `<nuxt-child/>` を挿入する必要があります:

```html
<template>
  <div>
    <h1>I am the parent view</h1>
    <nuxt-child/>
  </div>
</template>
```

<!-- To see an example, take a look at the [nested-routes example](/examples/nested-routes). -->

実際の例を見たいときは [ネストしたルーティングの例](/examples/nested-routes) を参照してください。
