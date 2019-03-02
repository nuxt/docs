---
title: "API: <nuxt-link> コンポーネント"
description: ページ間を nuxt-link を使ってリンクさせます。
---

# <nuxt-link> コンポーネント

> ページ間を nuxt-link を使ってリンクさせます。

現時点では、`<nuxt-link>` は [`<router-link>`](https://router.vuejs.org/ja/api/#router-link) と同じです。そのため、[Vue Router のドキュメント](https://router.vuejs.org/ja/api/#router-link) でこのコンポーネントの使い方を確認することをお勧めします。

例（`pages/index.vue`）:

```html
<template>
  <div>
    <h1>ホーム</h1>
    <nuxt-link to="/about">このサイトについて</nuxt-link>
  </div>
</template>
```

将来的には、Nuxt.js アプリケーションの応答性を改善するためにバックグラウンドでプリフェッチするような機能を `<nuxt-link>` コンポーネントに追加する予定です。
