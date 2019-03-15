---
title: "API: transition プロパティ"
description: ページのトランジションのデフォルト設定を指定します。
---

# transition プロパティ

- 型: `String` または `Object`

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
export default {
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


# layoutTransition プロパティ

- 型: `String` または `Object`

> レイアウトトランジションのデフォルト設定を指定するために使われます。設定は `layout` と同じです。

デフォルト:

```js
{
  name: 'layout',
  mode: 'out-in'
}
```

例 (`nuxt.config.js`):

```js
export default {
  layoutTransition: 'layout'
  // または
  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  }
}
```

例グローバル `css` :

```css
.layout-enter-active, .layout-leave-active {
  transition: opacity .5s
}
.layout-enter, .layout-leave-active {
  opacity: 0
}
```
