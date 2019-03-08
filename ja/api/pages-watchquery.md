---
title: watchQuery プロパティ
description: クエリ文字列を監視し、変更時にコンポーネントメソッドを実行します （asyncData, fetch, validate, layout,
  ...）
---

# watchQuery プロパティ

> クエリ文字列を監視し、変更時にコンポーネントメソッドを実行します（asyncData, fetch, validate, layout, ...）

- **Type:** `Boolean` or `Array` (default: `[]`)
- **型:** `配列` (デフォルト: `[]`)

`watchQuery` キーを設定し、監視するクエリ文字列を設定します。定義した文字列に変更が生じると、全てのコンポーネントメソッド（asyncData, fetch, validate, layout, ...）が呼ばれます。パフォーマンス向上のため、監視はデフォルトで無効になっています。

If you want to set up a watcher for all query strings, set `watchQuery: true`.

```js
export default {
  watchQuery: ['page']
}
```
