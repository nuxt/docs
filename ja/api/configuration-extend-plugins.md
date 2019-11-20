---
title: "API: extendPlugins プロパティ"
description: extendPlugins プロパティは Nuxt.js の plugins をカスタマイズできます。
---

> extendPlugins プロパティは Nuxt.js の plugins をカスタマイズできます。 ([options.plugins](/api/configuration-plugins)).

- 型: `Function`
- デフォルト: `undefined`

plugins を拡張したり、 Nuxt.js によって作成され plugins の順序を変更したりできます。
この関数は [plugin](/api/configuration-plugins) オブジェクトの配列を受け取って、plugin オブジェクトの配列を返します。

(`nuxt.config.js`) の plugins の順番を変更する例:

```js
export default {
  extendPlugins (plugins) {
    const pluginIndex = plugins.findIndex(
      ({ src }) => src === '~/plugins/shouldBeFirst.js'
    )
    const shouldBeFirstPlugin = plugins[pluginIndex]

    plugins.splice(pluginIndex, 1)
    plugins.unshift(shouldBeFirstPlugin)

    return plugins
  }
}
```
