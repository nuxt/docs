---
title: 'API: '
description: ページ間を nuxt-link を使ってリンクさせます。
---

# <nuxt-link> コンポーネント

> ページ間を nuxt-link を使ってリンクさせます。

現時点では、`<nuxt-link>` は [`<router-link>`](https://router.vuejs.org/en/api/router-link.html) と同じです。そのため、[Vue Router のドキュメント](https://router.vuejs.org/en/api/router-link.html) でこのコンポーネントの使い方を確認することをお勧めします。

例（`pages/index.vue`）:

```html
<template>
  <div>
    <h1>ホーム</h1>
    <nuxt-link to="/about">このサイトについて</nuxt-link>
  </div>
</template>
```

将来的には、バックグラウンドでプリフェッチするような Nuxt.js アプリケーションの応答性を改善するような機能を `<nuxt-link>` コンポーネントに追加する予定です。
