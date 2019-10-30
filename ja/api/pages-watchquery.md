---
title: watchQuery プロパティ
description: クエリ文字列を監視し、変更時にコンポーネントメソッドを実行します （asyncData, fetch, validate, layout,
  ...）
---

> クエリ文字列を監視し、変更時にコンポーネントメソッドを実行します（asyncData, fetch, validate, layout, ...）

- **型:** `Boolean`、`Array` または `Function` (デフォルト: `[]`)

`watchQuery` キーを設定し、監視するクエリ文字列を設定します。定義した文字列に変更が生じると、全てのコンポーネントメソッド（asyncData, fetch, validate, layout, ...）が呼ばれます。パフォーマンス向上のため、監視はデフォルトで無効になっています。

すべてのクエリ文字列に対して監視を設定したい場合は、`watchQuery：true` を設定してください。

```js
export default {
  watchQuery: ['page']
}
```

より洗練された監視のために、`watchQuery(newQuery, oldQuery)` 関数を使用することもできます。

```js
export default {
  watchQuery (newQuery, oldQuery) {
    // 古いクエリストリングに `bar` が含まれ、新しいクエリストリングに `foo` が含まれている場合のみ、コンポーネントメソッドを実行します
    return newQuery.foo && oldQuery.bar
  }
}
```
