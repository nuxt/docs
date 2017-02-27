---
title: "API: head メソッド"
description: Nuxt.js はアプリケーションの `headers` 及び `html attributes` を更新するために vue-meta と使います。
---

<!-- title: "API: The head Method" -->
<!-- description: Nuxt.js uses vue-meta to update the `headers` and `html attributes` of your application. -->

<!-- # The head Method -->

# head メソッド

<!-- \> Nuxt.js uses [vue-meta](https://github.com/declandewet/vue-meta) to update the `headers` and `html attributes` of your application. -->

> Nuxt.js はアプリケーションの `headers` 及び `html attributes` を更新するために [vue-meta](https://github.com/declandewet/vue-meta) を使います。

<!-- - **Type:** `Object` or `Function` -->

- **タイプ:** `オブジェクト` または `関数`

<!-- Use the `head` method to set the HTML Head tags for the current page. -->

現在のページの HTML の head タグを設定するために `head` メソッド使います。

<!-- Your component data are available with `this` in the `head` method, you can use set custom meta tags with the page data. -->

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

<!-- <p class="Alert">To avoid any duplication when used in child component, please give a unique identifier with the `hid` key, please [read more about it](https://github.com/declandewet/vue-meta#lists-of-tags).</p> -->

<p class="Alert">子コンポーネント利用されたときにメタ情報が重複してしまうことを避けるために `hid` キーでユニーク識別子を与えてください。これについてより深く理解するには [こちら](https://github.com/declandewet/vue-meta#lists-of-tags) を参照してください。</p>
