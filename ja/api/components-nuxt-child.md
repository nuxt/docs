---
title: "API: <nuxt-child> コンポーネント"
description: 現在のページを表示します。
---

# &lt;nuxt-child&gt; コンポーネント

> このコンポーネントは [ネストされたルート](/guide/routing#ネストされたルート) 内で子コンポーネントを表示するために使われます。

例:

```bash
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

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

`child.vue` コンポーネントを表示するには `pages/parent.vue` 内に `<nuxt-child/>` を挿入する必要があります:

```html
<template>
  <div>
    <h1>I am the parent view</h1>
    <nuxt-child/>
  </div>
</template>
```

実際の例を見たいときは [ネストされたルートの例](/examples/nested-routes) を参照してください。
