---
title: "API: loading プロパティ"
description: Nuxt.js はルートから別のルートへ遷移する間、プログレスバーを表示するために自身のコンポーネントを使います。これをカスタマイズしたり、プログレスバーを使わないようにしたり、独自のコンポーネントを作成したりできます。
---

# loading プロパティ

- 型: `ブーリアン` または `オブジェクト` または `文字列`

> Nuxt.js はルートから別のルートへ遷移する間、プログレスバーを表示するために自身のコンポーネントを使います。これをカスタマイズしたり、プログレスバーを使わないようにしたり、独自のコンポーネントを作成したりできます。

コンポーネントにおいて、 `this.$nuxt.$loading.start()` でローディングを開始し、 `this.$nuxt.$loading.finish()` で終了することができます。

```javascript
export default {
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
 }
```

> `mounted` メソッドを利用したい場合、必ず ` this.$nextTick` を利用してください。 $loading がすぐに利用できるとは限らないためです。

## プログレスバーを無効にする

- 型: `ブーリアン`

ルートから別のルートへ遷移する間にプログレスバーを表示したくないときは `nuxt.config.js` ファイル内に単に `loading: false` と記述します:

```js
export default {
  loading: false
}
```

## プログレスバーをカスタマイズする

- 型: `オブジェクト`

プログレスバーをカスタマイズするために使えるプロパティ一覧。

| キー | 型 | デフォルト | 説明 |
|-----|------|---------|-------------|
| `color` | 文字列 | `'black'` | プログレスバーの CSS カラー |
| `failedColor` | 文字列 | `'red'` | ルートをレンダリング中にエラーが発生した場合のプログレスバーの CSS カラー（例えば `data` または `fetch` がエラーを返したとき） |
| `height` | 文字列 | `'2px'` | プログレスバーの高さ（プログレスバーの `style` プロパティで使われます） |
| `throttle` | 数値 | `200` | ミリ秒単位で指定された時間待ったのちにプログレスバーを表示します。 プログレスバーの点滅を防ぐために利用します |
| `duration` | 数値 | `5000` | プログレスバーを表示する時間の最大値をミリ秒で指定します。Nuxt.js は各ルートが 5秒以内にレンダリングされると想定しています |
| `rtl` | ブーリアン | `false` | プログレスバーの向きを右から左にします。 |

例として、青いプログレスバーを 5px の高さで表示するには `nuxt.config.js` を次のように編集します:

```js
export default {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

## 独自のコンポーネントを使う

- 型: `文字列`

Nuxt.js がデフォルトのコンポーネントの代わりに呼び出す、独自のコンポーネントを作成できます。そのためには `loading` オプション内に独自コンポーネントのパスを指定する必要があります。そうすれば独自コンポーネントは Nuxt.js により直接呼び出されます。

**独自コンポーネントはいくつかのメソッドを備えている必要があります:**

| メソッド | 必須か否か | 説明 |
|--------|----------|-------------|
| `start()` | 必須 | ルートが変更されたときに呼び出されます。このときに独自コンポーネントの表示が開始されます |
| `finish()` | 必須 | ルートがロード（及びデータ取得）されたときに呼び出されます。このときに独自コンポーネントが表示が終了します |
| `fail()` | *必須でない* | ルートがロードできなかったときに呼び出されます（例えばデータの取得に失敗したなど） |
| `increase(num)` | *必須でない* | ルートのコンポーネントがロードされている間に呼び出されます。`num` は 100 未満の整数です |

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

それから `nuxt.config.js` を編集して、独自コンポーネントを使うことを Nuxt.js に伝えます:

```js
export default {
  loading: '~/components/loading.vue'
}
```
