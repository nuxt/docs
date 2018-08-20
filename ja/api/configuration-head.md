---
title: "API: head プロパティ"
description: Nuxt.js では nuxt.config.js 内にアプリケーションのデフォルトのメタ情報を定義できます。
---

# head プロパティ

> Nuxt.js では `nuxt.config.js` 内にアプリケーションのデフォルトのメタ情報を定義できます。それには `head` プロパティを使います:

- 型: `オブジェクト`

```js
module.exports = {
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
```

`head` に設定できるオプション一覧は [vue-meta のドキュメント](https://github.com/declandewet/vue-meta#recognized-metainfo-properties) を参照してください。

<p class="Alert Alert--teal"><b>情報:</b> ページのコンポーネントでも `head` を使うことができ、`this` を経由してコンポーネントのデータにアクセスできます。詳しくは [コンポーネントの head プロパティ](/api/pages-head) を参照してください。</p>
