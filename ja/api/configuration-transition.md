---
title: "API: transition プロパティ"
description: ページのトランジションのデフォルト設定を指定します。
---

# transition プロパティ

- 型: `文字列` または `オブジェクト`

> ページのトランジションのデフォルト設定を指定するために使われます。

デフォルト:

```js
{
  name: 'page',
  mode: 'out-in'
}
```

例（`nuxt.config.js`）:

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

`nuxt.config.js` 内の transition キーはページのトランジションのデフォルト設定を指定するために使われます。`transition` キーがオブジェクトのときに利用可能なキーについてより深く理解するには [ページのトランジションプロパティ](/api/pages-transition#オブジェクト) を参照してください。
