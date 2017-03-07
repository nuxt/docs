---
title: JSX
description: Nuxt.js で JSX を使うには？
---

<!-- title: JSX -->
<!-- description: How to use JSX with Nuxt.js? -->

<!-- # How to use JSX? -->

# JSX を使うには？

<!-- If you want to use JSX in your components, first, you need to install the Babel plugins for JSX: -->

コンポーネントで JSX を使いたい場合は、まず JSX のための Babel プラグインをインストールする必要があります:

```bash
npm install --save-dev babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props
```

<!-- Then, in your `nuxt.config.js`, tell nuxt.js to use the [transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx) plugin: -->

それから `nuxt.config.js` 内で [transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx) プラグインを使うことを Nuxt.js に伝えます:

```js
module.exports = {
  build: {
    babel: {
      plugins: ['transform-vue-jsx']
    }
  }
}
```

<!-- To learn more about the babel option, take a look at the [build config documentation](/api/configuration-build). -->

Babel のオプションをより深く理解するには [ビルド設定のドキュメント](/api/configuration-build) を参照してください。

<!-- You can now use JSX in your `render` method of your components: -->

ここまでの設定で、コンポーネントの `render` メソッド内で JSX が使えるようになっています:

```html
<script>
export default {
  data () {
    return { name: 'World' }
  },
  render (h) {
    return <h1 class="red">{this.name}</h1>
  }
}
</script>
```

<!-- You can learn more how to use it in the [JSX section](https://vuejs.org/v2/guide/render-function.html#JSX) of the Vue.js documentation. -->

JSX の使い方をより深く理解するには Vue.js ドキュメントの [JSX のセクション](https://vuejs.org/v2/guide/render-function.html#JSX) を参照してください。
