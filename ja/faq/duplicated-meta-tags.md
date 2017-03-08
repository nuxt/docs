---
title: 重複したメタタグ
description: Nuxt.js でメタタグが重複したときは？
---

<!-- title: Duplicated Meta tags -->
<!-- description: Duplicated Meta tags with Nuxt.js? -->

<!-- # Duplicated Meta tags? -->

# メタタグが重複したときは？

<!-- This is a "feature" of [vue-meta](https://github.com/declandewet/vue-meta), please take a look at the [documentation of head elements](https://nuxtjs.org/guide/html-head#defaults-meta). -->

これは [vue-meta](https://github.com/declandewet/vue-meta) の "特徴" です。[head 要素のドキュメント](https://nuxtjs.org/guide/html-head#defaults-meta) を参照してください。

<!-- \> To avoid any duplication when used in child component, please give a unique identifier with the hid key, please [read more](https://github.com/declandewet/vue-meta#lists-of-tags) about it. -->

コンポーネントで vue-meta が使われたときに重複を避けるためには、ユニーク識別子を hid キーで付与してください。詳細は [こちら](https://github.com/declandewet/vue-meta#lists-of-tags) を参照してください。

<!-- For the meta description, you need to add the unique identifier `hid` so vue-meta will know that it has to overwrite the default tag. -->

例えば description のメタタグについて、`hid` ユニーク識別子を付与する必要があります。そうすれば vue-meta は、デフォルトのタグを上書きすべきということを知ることができます。

<!-- Your `nuxt.config.js`: -->

`nuxt.config.js`:

```js
...head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'keyword 1, keyword 2'},
      { hid: 'description', name: 'description', content: 'This is the generic description.'}
    ],
  },
...
```

<!-- An then in your individual page: -->

それから個別ページには次のように記述します:

```js
export default {
  head () {
    return {
      title: `Page 1 (${this.name}-side)`,
      meta: [
        { hid: 'description', name: 'description', content: "Page 1 description" }
      ],
    }
  }
}
```

<!-- To learn how to use the `head` property in your pages, please see the [HTML head documentation](/guide/views/#html-head). -->

ページ内の `head` プロパティの使い方をより深く理解するには [HTML の head 情報のドキュメント](/guide/views/#html-head) を参照してください。
