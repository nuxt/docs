---
title: "API: layout プロパティ"
description: layouts ディレクトリの（第一階層の）ファイルはカスタムレイアウトになります。これらはページコンポーネントの layout プロパティで指定して利用できます。
---

<!-- title: "API: The layout Property" -->
<!-- description: Every file (first level) in the layouts directory will create a custom layout accessible with the layout property in the page component. -->

<!-- # The layout Property -->

# layout プロパティ

<!-- \> Every file (first level) in the layouts directory will create a custom layout accessible with the layout property in the page component. -->

> layouts ディレクトリの（第一階層の）ファイルはカスタムレイアウトになります。これらはページコンポーネントの layout プロパティで指定して利用できます。

<!-- - **Type:** `String` (default: `'default'`) -->

- **タイプ:** `文字列`（デフォルト: `'default'`）

<!-- Use the `layout` key in your pages components to define which layout to use: -->

どのレイアウトを使うか指定するために、ページコンポーネントで `layout` キーを使ってください:

```js
export default {
  layout: 'blog'
}
```

<!-- In this example, Nuxt.js will include the `layouts/blog.vue` file as a layout for this page component. -->

この例では Nuxt.js は `layouts/blog.vue` ファイルをこのページコンポーネントのレイアウトとしてインクルードします。

<!-- Check the [demonstration video](https://www.youtube.com/watch?v=YOKnSTp7d38) to see it in action. -->

動作する様子を [デモ動画](https://www.youtube.com/watch?v=YOKnSTp7d38) で確認してみてください。

<!-- To understand how the layouts work with nuxt.js, take a look at the [layout documentation](/guide/views#layouts). -->
Nuxt.js でレイアウトがどのように動作するかをより深く理解するには [layout ドキュメント](/guide/views#layouts) を参照してください。
