---
title: "API: <no-ssr> コンポーネント"
description: サーバーサイドレンダリングでのコンポーネントレンダリングをスキップします。そしてプレースホルダーのテキストを表示できます。
---

# &lt;no-ssr&gt; コンポーネント

> このコンポーネントは意図的にサーバーサイドレンダリングの対象からコンポーネントを除外するために使われます。

**Props**:
- placeholder: `文字列`
  - `<no-ssr>`がクライアント側にマウントされるまで、テキストをプレスホルダとして使用します。

```html
<template>
  <div>
    <sidebar />
    <no-ssr placeholder="Loading...">
      <!-- このコンポーネントはクライアントサイドでのみレンダリングされます -->
      <comments />
    </no-ssr>
  </div>
</template>
```

**Slots**:

- placeholder:
  - `<no-ssr>`がクライアント側にマウントされるまで、スロットをプレスホルダとして使用します。
 
 ```html
<template>
  <div>
    <sidebar />
    <no-ssr>
      <!-- このコンポーネントはクライアントサイドでのみレンダリングされます -->
      <comments />
  
      <!-- loading indicator -->
      <comments-placeholder slot="placeholder" />
    </no-ssr>
  </div>
</template>
```

> `<no-ssr />` は子コンポーネント/要素を1つのみ含むことができます。

このコンポーネントは [egoist/vue-no-ssr](https://github.com/egoist/vue-no-ssr) の clone したものです。[@egoist](https://github.com/egoist) に感謝します！
