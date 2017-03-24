---
title: "API: <nuxt-link> コンポーネント"
description: ページ間を nuxt-link を使ってリンクさせます。
---

<!-- title: "API: The <nuxt-link> Component" -->
<!-- description: Link the pages between them with nuxt-link. -->

<!-- # The &lt;nuxt-link&gt; Component -->

# &lt;nuxt-link&gt; コンポーネント

<!-- \> This component is used to link the page components between them. -->

ページ間を nuxt-link を使ってリンクさせます。

<!-- At the moment, `<nuxt-link>` is the same as [`<router-link>`](https://router.vuejs.org/en/api/router-link.html), so we recommend you to see how to use it on the [vue-router documentation](https://router.vuejs.org/en/api/router-link.html). -->

現在のところ `<nuxt-link>` は [`<router-link>`](https://router.vuejs.org/en/api/router-link.html) と同じです。したがって、このコンポーネントの使い方を [vue-router のドキュメント](https://router.vuejs.org/en/api/router-link.html) で確認することをお勧めします。

<!-- Example (`pages/index.vue`): -->

例（`pages/index.vue`）:

<!-- ```html -->
<!-- <template> -->
<!--   <div> -->
<!--     <h1>Home page</h1> -->
<!--     <nuxt-link to="/about">About</nuxt-link> -->
<!--   </div> -->
<!-- </template> -->
<!-- ``` -->

```html
<template>
  <div>
    <h1>ホーム</h1>
    <nuxt-link to="/about">このサイトについて</nuxt-link>
  </div>
</template>
```

<!-- In the future, we will add features to the nuxt-link component, like pre-fetching on the background for improving the responsiveness of nuxt.js applications. -->

将来においては、Nuxt.js アプリケーションの応答性を改善するためにバックグランドでプリフェッチするような機能を nuxt-link コンポーネントに追加する予定です。
