---
title: 'API: '
description: 現在のページを表示します。
---

# <nuxt-child> コンポーネント

> このコンポーネントは [ネストされたルート](/guide/routing#%E3%83%8D%E3%82%B9%E3%83%88%E3%81%95%E3%82%8C%E3%81%9F%E3%83%AB%E3%83%BC%E3%83%88) 内で子コンポーネントを表示するために使われます。

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
