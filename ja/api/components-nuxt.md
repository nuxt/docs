---
title: "API: <nuxt> コンポーネント"
description: レイアウト内でページコンポーネントを表示します。
---

<!-- title: "API: The <nuxt> Component" -->
<!-- description: Display the page components inside a layout. -->

<!-- # The &lt;nuxt&gt; Component -->

# &lt;nuxt&gt; コンポーネント

<!-- \> This component is used only in [layouts](/guide/views#layouts) to display the page components. -->

> このコンポーネントは [レイアウト](/guide/views#layouts) 内でのみ、ページコンポーネントを表示するために使われます。

<!-- Example (`layouts/default.vue`): -->

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

<!-- To see an example, take a look at the [layouts example](/examples/layouts). -->

実際の例を見たいときは [レイアウトの例](/examples/layouts) を参照してください。
