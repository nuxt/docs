---
title: JSX
description: Nuxt.js で JSX を使うには？
---

# JSX を使うには？

Nuxt.js は babel のデフォルトの設定のために公式の [babel-preset-vue-app](https://github.com/vuejs/babel-preset-vue-app) を使用しています。そのため、コンポーネントに JSX を使うことができます。

コンポーネントの `render` メソッド内で JSX が使えます:

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

<p class="Alert Alert--info">`createElement`を `h` にエイリアスすることは、Vue エコシステムで見られる共通の慣例ですが、実は JSX 向けのオプションです。JSX を持つ ES2015 の構文で宣言された（関数またはアロー関数ではない）メソッドやゲッターに `const h = this.$createElement` を[自動的にインェジクト](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection)するため、(h) パラメータを削除することができます。</p>

JSX の使い方をより深く理解するには Vue.js ドキュメントの [JSX のセクション](https://vuejs.org/v2/guide/render-function.html#JSX) を参照してください。
