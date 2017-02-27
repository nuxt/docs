---
title: "API: scrollToTop プロパティ"
description: scrollToTop プロパティを使うと、ページをレンダリングする前にトップまでスクロールか否かを Nuxt.js に伝えることができます。
---

<!-- title: "API: The scrollToTop Property" -->
<!-- description: The scrollToTop property lets you tell nuxt.js to scroll to the top before rendering the page. -->

<!-- # The scrollToTop Property -->

# scrollToTop プロパティ

<!-- \> The scrollToTop property lets you tell nuxt.js to scroll to the top before rendering the page. -->

> scrollToTop プロパティを使うと、ページをレンダリングする前にトップまでスクロールか否かを Nuxt.js に伝えることができます。

<!-- - **Type:** `Boolean` (default: `false`) -->

- **タイプ:** `ブーリアン`（デフォルト: `false`）

<!-- By default, nuxt.js scroll to the top when you go to another page, but with children routes, nuxt.js keep the scroll position, if you want to tell nuxt.js to scroll to the top when rendering your child route, set `scrollToTop: true`: -->

デフォルトでは、Nuxt.js は別のページへ遷移する際にトップまでスクロールしますが、子ルートがあるときは、Nuxt.js はスクロール位置をキープします。もし子ルートをレンダリングするときにトップまでスクロールさせたいときは `scrollToTop: true` と設定してください:

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

<!-- If you want to overwrite the default scroll behavior of nuxt.js, take a look at the [scrollBehavior option](/api/configuration-router#scrollBehavior). -->

もし Nuxt.js のデフォルトのスクロールの挙動を上書きしたいときは [scrollBehavior オプション](/api/configuration-router#scrollBehavior) を参照してください。
