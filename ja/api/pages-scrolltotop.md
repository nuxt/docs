---
title: "API: scrollToTop プロパティ"
description: scrollToTop プロパティで、ページをレンダリングする前にトップまでスクロールか否かを指定できます。
---

# scrollToTop プロパティ

> scrollToTop プロパティで、ページをレンダリングする前にトップまでスクロールか否かを指定できます。

- **型:** `ブーリアン`（デフォルト: `false`）

別のページへ遷移する際にトップまでスクロールしますが、子ルートがあるときはスクロール位置をキープする、というのが Nuxt.js のデフォルトの挙動です。子ルートをレンダリングするときにトップまでスクロールさせたいときは `scrollToTop: true` と設定してください:

```html
<template>
  <h1>My child component</h1>
</template>

<script>
export default {
  scrollToTop: true
}
</script>
```

スクロールについて Nuxt.js のデフォルトの挙動を上書きしたいときは [scrollBehavior オプション](/api/configuration-router#scrollBehavior) を参照してください。
