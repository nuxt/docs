---
title: "API: <nuxt-link> コンポーネント"
description: ページ間を nuxt-link を使ってリンクさせます。
---

# &lt;nuxt-link&gt; コンポーネント

> ページ間を nuxt-link を使ってリンクさせます。

現在のところ `<nuxt-link>` は [`<router-link>`](https://router.vuejs.org/en/api/router-link.html) と同じです。したがって、このコンポーネントの使い方を [vue-router のドキュメント](https://router.vuejs.org/en/api/router-link.html) で確認することをお勧めします。

例（`pages/index.vue`）:

```html
<template>
  <div>
    <h1>ホーム</h1>
    <nuxt-link to="/about">このサイトについて</nuxt-link>
  </div>
</template>
```

将来においては、Nuxt.js アプリケーションの応答性を改善するためにバックグランドでプリフェッチするような機能を nuxt-link コンポーネントに追加する予定です。
