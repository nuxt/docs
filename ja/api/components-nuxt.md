---
title: 'API: '
description: レイアウト内でページコンポーネントを表示します。
---

# <nuxt> コンポーネント

> このコンポーネントは [レイアウト](/guide/views#%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88) 内でのみ、ページコンポーネントを表示するために使われます。

**Props**:

- nuxt 子キー：`文字列`
    - この prop は `<router-view/>` に設定され、動的なページと異なるルートの中で遷移させるのに便利です。
    - デフォルト: `$route.fullPath`

例（`layouts/default.vue`）:

```html
<template>
  <div>
    <div>My nav bar</div>
    <nuxt/>
    <div>My footer</div>
  </div>
</template>
```

実際の例を見たいときは [レイアウトの例](/examples/layouts) を参照してください。
