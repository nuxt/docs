---
title: 'API: head メソッド'
description: Nuxt.js はアプリケーションの headers 及び html attributes を更新するために vue-meta を使います。
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
        // `hid` は一意の識別子として使用されます。 `vmid` は動作しないので使わないでください。
        { hid: 'description', name: 'description', 
        content: 'My custom description' }
      ]
    }
  }
}
</script>
```

<div class="Alert Alert--teal">

<b>情報:</b> 子コンポーネント利用されたときにメタ情報が重複してしまうことを避けるために `hid` キーを使ってユニーク識別子を meta 要素に設定してください。 詳しくは ([こちら](https://github.com/declandewet/vue-meta#lists-of-tags))を参照してください。

</div>
