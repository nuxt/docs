---
title: 'API:  '
description: サーバーサイドレンダリングでのコンポーネントレンダリングをスキップします。そしてplaceholderのテキストを表示できます。
---

# <no-ssr> コンポーネント

> このコンポーネントは意図的にサーバーサイドレンダリングの対象からコンポーネントを除外するために使われます。

**Props**:

- placeholder: `String`
    - このプロパティは`div`タグ内のコンテンツに利用され、サーバーサイドレンダリングの時のみテキストとして表示されます。

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

このコンポーネントは[egoist/vue-no-ssr](https://github.com/egoist/vue-no-ssr)のcloneしたものです。
[@egoist](https://github.com/egoist)に感謝します!
