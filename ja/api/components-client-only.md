---
title: "API: <client-only> コンポーネント"
description: コンポーネントをクライアント側でのみレンダリングし、サーバー側でプレースホルダーテキストを表示します。
---

# The &lt;client-only&gt; コンポーネント

> このコンポーネントは、クライアント側でのみコンポーネントを意図的にレンダリングするために使用されます。


<div class="Alert Alert--orange">

**警告：** Nuxt のバージョンが `v2.9.0` 以下の場合、`<client-only>` のかわりに `<no-ssr>` を使用してください。

</div>


**Props**:
- placeholder: `string`
  - `<client-only />` がクライアント側にマウントされるまで、プレースホルダーとしてテキストを使用します。

```html
<template>
  <div>
    <sidebar />
    <client-only placeholder="Loading...">
      <!-- このコンポーネントは、クライアント側でレンダリングするためだけに使用されます -->
      <comments />
    </client-side>
  </div>
</template>
```

**Slots**:

- placeholder:
  - `<client-only />` がクライアント側にマウントされるまで、プレースホルダーとしてスロットを使用します。
 
 ```html
<template>
  <div>
    <sidebar />
    <client-only>
      <!-- このコンポーネントは、クライアント側でレンダリングするためだけに使用されます -->
      <comments />
  
      <!-- サーバー側でレンダリングされた loading indicator -->
      <comments-placeholder slot="placeholder" />
    </client-only>
  </div>
</template>
```

このコンポーネントは [egoist/vue-client-only](https://github.com/egoist/vue-client-only) からインポートされました。 ありがとう [@egoist](https://github.com/egoist)！
