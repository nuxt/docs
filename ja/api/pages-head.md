---
title: "API: head メソッド"
description: Nuxt.js はアプリケーションの `headers` 及び `html attributes` を更新するために vue-meta と使います。
---

# head メソッド

> Nuxt.js はアプリケーションの `headers` 及び `html attributes` を更新するために [vue-meta](https://github.com/declandewet/vue-meta) を使います。

- **型:** `オブジェクト` または `関数`

現在のページの HTML の head タグを設定するために `head` メソッド使います。

コンポーネントのデータは `head` メソッド内で `this` を使って利用できます。ページのデータを使って独自のメタタグを設定することもできます。

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  data () {
    return {
      title: 'Hello World!'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
}
</script>
```

<p class="Alert">子コンポーネント利用されたときにメタ情報が重複してしまうことを避けるために `hid` キーでユニーク識別子を与えてください。これについてより深く理解するには [こちら](https://github.com/declandewet/vue-meta#lists-of-tags) を参照してください。</p>
