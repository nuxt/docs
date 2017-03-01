---
title: "API: transition プロパティ"
description: ページのトランジションのデフォルト設定を指定します。
---

<!-- title: "API: The transition Property" -->
<!-- description: Set the default properties of the pages transitions. -->

<!-- # The transition Property -->

# transition プロパティ

<!-- - Type: `String` or `Object` -->

- タイプ: `文字列` または `オブジェクト`

<!-- \> Used to set the default properties of the pages transitions. -->

> ページのトランジションのデフォルト設定を指定するために使われます。

<!-- Default: -->

デフォルト:

```js
{
  name: 'page',
  mode: 'out-in'
}
```

<!-- Example (`nuxt.config.js`): -->

例（`nuxt.config.js`）:

<!-- ```js -->
<!-- module.exports = { -->
<!--   transition: 'page' -->
<!--   // or -->
<!--   transition: { -->
<!--     name: 'page', -->
<!--     mode: 'out-in', -->
<!--     beforeEnter (el) { -->
<!--       console.log('Before enter...'); -->
<!--     } -->
<!--   } -->
<!-- } -->
<!-- ``` -->

```js
module.exports = {
  transition: 'page'
  // または
  transition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Before enter...');
    }
  }
}
```

<!-- The transition key in `nuxt.config.js` is used to set the default properties for the pages transitions. To learn more about the available keys when the `transition` key is an object, see the [pages transition property](/api/pages-transition#object). -->

`nuxt.config.js` 内の transition キーはページのトランジションのデフォルト設定を指定するために使われます。`transition` キーがオブジェクトのときに利用可能なキーについてより深く理解するには [ページのトランジションプロパティ](/api/pages-transition#object) を参照してください。
