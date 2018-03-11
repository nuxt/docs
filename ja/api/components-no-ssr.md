---
title: "API: <no-ssr> コンポーネント"
description: サーバーサイドレンダリングでのコンポーネントレンダリングをスキップします。そしてプレースホルダーのテキストを表示できます。
---

# &lt;no-ssr&gt; コンポーネント

> このコンポーネントは意図的にサーバーサイドレンダリングの対象からコンポーネントを除外するために使われます。

**Props**:

- placeholder: `文字列`
  - このプロパティは `div` タグ内のコンテンツに利用され、サーバーサイドレンダリングの時のみテキストとして表示されます。

```html
<template>
  <div>
    <ssrfrendly-component />
    <no-ssr>
      <not-ssrfrendly />
    </no-ssr>
  </div>
</template>
```

このコンポーネントは [egoist/vue-no-ssr](https://github.com/egoist/vue-no-ssr) の clone したものです。[@egoist](https://github.com/egoist) に感謝します！
