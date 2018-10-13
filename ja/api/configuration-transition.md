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


# The layoutTransition Property

- Type: `String` or `Object`

> Used to set the default properties of the layout transitions. Configurations are same as `layout`

Default:

```js
{
  name: 'layout',
  mode: 'out-in'
}
```

Example (`nuxt.config.js`):

```js
export default {
  layoutTransition: 'layout'
  // or
  transition: {
    name: 'layout',
    mode: 'out-in'
  }
}
```

Example global `css`:

```css
.layout-enter-active, .layout-leave-active {
  transition: opacity .5s
}
.layout-enter, .layout-leave-active {
  opacity: 0
}
```
