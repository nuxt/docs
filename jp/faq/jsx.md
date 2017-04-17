---
title: JSX
description: Nuxt.js で JSX を使うには？
---

<!-- title: JSX -->
<!-- description: How to use JSX with Nuxt.js? -->

<!-- # How to use JSX? -->

# JSX を使うには？

<!-- Nuxt.js use the official [babel-preset-vue-app](https://github.com/vuejs/babel-preset-vue-app) for babel default configuration, so you can use JSX in your components. -->

Nuxt.js は babel のデフォルト設定のために公式の [babel-preset-vue-app](https://github.com/vuejs/babel-preset-vue-app) を使います。したがって、コンポーネント内で JSX を使うことができます。

<!-- You can now use JSX in your `render` method of your components: -->

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

<!-- <p class="Alert Alert--info">Aliasing `createElement` to `h` is a common convention you’ll see in the Vue ecosystem and is actually required for JSX. If `h` is not available in the scope, **your app will throw an error**.</p> -->

<p class="Alert Alert--info">`h` を `createElement` のエイリアスにすることは、Vue エコシステムでは一般的な慣例であり、また、JSX では必要とされています。`h` がスコープの中で利用できないときは **アプリケーションは例外を投げます**.</p>

<!-- You can learn more how to use it in the [JSX section](https://vuejs.org/v2/guide/render-function.html#JSX) of the Vue.js documentation. -->

JSX の使い方をより深く理解するには Vue.js ドキュメントの [JSX のセクション](https://vuejs.org/v2/guide/render-function.html#JSX) を参照してください。
