---
title: "API: cache プロパティ"
description: Nuxt.js はレンダリングのパフォーマンス向上を目的としてコンポーネントをキャッシュするために lru-cache を使います。
---

<!-- title: "API: The cache Property" -->
<!-- description: Nuxt.js use lru-cache to allow cached components for better render performances -->

# cache プロパティ

<!-- \> Nuxt.js use [lru-cache](https://github.com/isaacs/node-lru-cache) to allow cached components for better render performances -->

> Nuxt.js はレンダリングのパフォーマンス向上を目的としてコンポーネントをキャッシュするために [lru-cache](https://github.com/isaacs/node-lru-cache) を使います。

<!-- ## Usage -->

## 使い方

<!-- - **Type:** `Boolean` or `Object` (Default: `false`) -->

- **タイプ:** `ブーリアン` または `オブジェクト`（デフォルト: `false`）

<!-- If an object, see [lru-cache options](https://github.com/isaacs/node-lru-cache#options). -->

オブジェクトの場合は [lru-cache オプション](https://github.com/isaacs/node-lru-cache#options) を参照してください。

<!-- Use the `cache` key in your `nuxt.config.js`: -->

`nuxt.config.js` 内で `cache` キーを使います:

<!-- ```js -->
<!-- module.exports = { -->
<!--   cache: true -->
<!--   // or -->
<!--   cache: { -->
<!--     max: 1000, -->
<!--     maxAge: 900000 -->
<!--   } -->
<!-- } -->
<!-- ``` -->

```js
module.exports = {
  cache: true
  // または
  cache: {
    max: 1000,
    maxAge: 900000
  }
}
```

<!-- If `cache` is set to `true` the default keys given are: -->

`cache` に `true` がセットされた場合はデフォルトのキーが適用されます:

<!-- | key  | Optional? | Type | Default | definition | -->
<!-- |------|------------|-----|---------|------------| -->
<!-- | `max` | Optional | Integer | 1000 | The maximum size of the cached components, when the 1001 is added, the first one added will be removed from the cache to let space for the new one. | -->
<!-- | `maxAge` | Optional | Integer | 900000 | Maximum age in ms, default to 15 minutes. | -->

| キー | 必須か否か | タイプ | デフォルト | 説明 |
|------|------------|-----|---------|------------|
| `max` | 必須ではない | 整数 | 1000 | キャッシュするコンポーネントの最大数。1001個目のコンポーネントが追加されるときに、スペースを空けるために、最初にキャッシュされたコンポーネントがキャッシュから削除されます |
| `maxAge` | 必須ではない | 整数 | 900000 | キャッシュさせる最大時間をミリ秒で指定します。デフォルトは 15分間です |
