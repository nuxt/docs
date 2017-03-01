---
title: "API: loading プロパティ"
description: Nuxt.js はルートから別のルートへ遷移する間、プログレスバーを表示するために自身のコンポーネントを使います。これをカスタマイズしたり、プログレスバーを使わないようにしたり、独自のコンポーネントを作成したりできます。
---

<!-- title: "API: The loading Property" -->
<!-- description: Nuxt.js uses it's own component to show a progress bar between the routes. You can customize it, disable it or create your own component. -->

<!-- # The loading Property -->

# loadding プロパティ

<!-- - Type: `Boolean` or `Object` or `String` -->

- タイプ: `ブーリアン` または `オブジェクト` または `文字列`

<!-- \> Nuxt.js uses it's own component to show a progress bar between the routes. You can customize it, disable it or create your own component. -->

> Nuxt.js はルートから別のルートへ遷移する間、プログレスバーを表示するために自身のコンポーネントを使います。これをカスタマイズしたり、プログレスバーを使わないようにしたり、独自のコンポーネントを作成したりできます。

<!-- ## Disable the Progress Bar -->

## プログレスバーを無効にする

<!-- - Type: `Boolean` -->

- タイプ: `ブーリアン`

<!-- If you don't want to display the progress bar between the routes, simply add `loading: false` in your `nuxt.config.js` file: -->

ルートから別のルートへ遷移する間にプログレスバーを表示したくないときは `nuxt.config.js` ファイル内に単に `loading: false` と記述します:

```js
module.exports = {
  loading: false
}
```

<!-- ## Customize the Progress Bar -->

## プログレスバーをカスタマイズする

<!-- - Type: `Object` -->

- タイプ: `オブジェクト`

<!-- List of properties to customize the progress bar. -->

プログレスバーをカスタマイズするプロパティ一覧。

<!-- | Key | Type | Default | Description | -->
<!-- |-----|------|---------|-------------| -->
<!-- | `color` | String | `'black'` | CSS color of the progress bar | -->
<!-- | `failedColor` | String | `'red'` | CSS color of the progress bar when an error appended while rendering the route (if `data` or `fetch` sent back an error for example). | -->
<!-- | `height` | String | `'2px'` | Height of the progress bar (used in the `style` property of the progress bar) | -->
<!-- | `duration` | Number | `5000` | In ms, the maximum duration of the progress bar, Nuxt.js assumes that the route will be rendered before 5 seconds. | -->

| キー | タイプ | デフォルト | 説明 |
|-----|------|---------|-------------|
| `color` | 文字列 | `'black'` | プログレスバーの CSS カラー |
| `failedColor` | 文字列 | `'red'` | 当該ルートをレンダリング中にエラーが発生した場合のプログレスバーの CSS カラー（例えば `data` または `fetch` がエラーを返したとき） |
| `height` | 文字列 | `'2px'` | プログレスバーの高さ（プログレスバーの `style` プロパティで使われます） |
| `duration` | 数値 | `5000` | プログレスバーの最大継続時間をミリ秒で指定します。Nuxt.js は各ルートは 5秒以内にレンダリングされると想定しています |

<!-- For a blue progress bar with 5px of height, we update the `nuxt.config.js` to the following: -->

青いプログレスバーを 5px の高さで表示するには `nuxt.config.js` を次のように更新します:

```js
module.exports = {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

<!-- ## Use a Custom Loading Component -->

## 独自のコンポーネントを使う

<!-- - Type: `String` -->

- タイプ: `文字列`

<!-- You can create your own component that Nuxt.js will call instead of its default component. To do so, you need to give a path to your component in the `loading` option. Then, your component will be called directly by Nuxt.js. -->

Nuxt.js がデフォルトのコンポーネントの代わりに呼び出す、独自のコンポーネントを作成できます。そのためには `loading` オプション内に独自コンポーネントのパスを指定する必要があります。そうすれば独自コンポーネントは Nuxt.js により直接呼び出されます。

<!-- **Your component has to expose some of theses methods:** -->

**独自コンポーネントはいくつかのメソッドを使えるようにしている必要があります:**

<!-- | Method | Required | Description | -->
<!-- |--------|----------|-------------| -->
<!-- | `start()` | Required | Called when a route changes, this is here where you display your component. | -->
<!-- | `finish()` | Required | Called when a route is loaded (and data fetched), this is here where you hide your component. | -->
<!-- | `fail()` | *Optional* | Called when a route couldn't be loaded (failed to fetch data for example). | -->
<!-- | `increase(num)` | *Optional* | Called during loading the route component, `num` is an Integer < 100. | -->

| メソッド | 必須か否か | 説明 |
|--------|----------|-------------|
| `start()` | 必須 | ルートが変更されたときに呼び出されます。ここが独自コンポーネントが表示される時点です |
| `finish()` | 必須 | ルートがロード（及びデータ取得）されたときに呼び出されます。ここが独自コンポーネントが非表示になる時点です |
| `fail()` | *必須でない* | ルートがロードできなかったときに呼び出されます（例えばデータの取得に失敗したなど） |
| `increase(num)` | *必須でない* | ルートのコンポーネントがロードされている間に呼び出されます。`num` は 100 未満の整数です |

<!-- We can create our custom component in `components/loading.vue`: -->

`components/loading.vue` に独自コンポーネントを作ることができます:

```html
<template lang="html">
  <div class="loading-page" v-if="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>
```

<!-- Then, we update our `nuxt.config.js` to tell Nuxt.js to use our component: -->

それから `nuxt.config.js` を更新して、独自コンポーネントを使うことを Nuxt.js に伝えます:

```js
module.exports = {
  loading: '~components/loading.vue'
}
```
