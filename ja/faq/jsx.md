---
title: JSX
description: Nuxt.js で JSX を使うには？
---

# JSX を使うには？

Nuxt.js は babel のデフォルト設定のために公式の [babel-preset-vue-app](https://github.com/vuejs/babel-preset-vue-app) を使います。したがって、コンポーネント内で JSX を使うことができます。

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

<p class="Alert Alert--info">`h` を `createElement` のエイリアスにすることは、Vue エコシステムでは一般的な慣例であり、また、JSX では必要とされています。`h` がスコープの中で利用できないときは **アプリケーションは例外を投げます**.</p>

JSX の使い方をより深く理解するには Vue.js ドキュメントの [JSX のセクション](https://vuejs.org/v2/guide/render-function.html#JSX) を参照してください。
