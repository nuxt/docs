---
title: 外部リソースを使うには？
description: Nuxt.js で外部リソースを使うには？
---

## グローバルな設定

head オブジェクトもしくは関数の中に、外部のリソースを含めることができます。
1つ目の例ではオブジェクトを使用し、2つ目の例では関数を使用します。
computed プロパティもしくは data プロパティのような Vue コンポーネントから値を使用したい場合、 関数として `head` を使用して、最終的な head オブジェクトを返すこともできます。

`nuxt.config.js` 内でリソースをインクルードします:

```js
export default {
  head: {
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' }
    ]
  }
}
```

## ローカルな設定

`pages/` ディレクトリの `.vue` ファイル内でリソースをインクルードします:

```html
<template>
  <h1>About page with jQuery and Roboto font</h1>
</template>

<script>
export default {
  head () {
    return {
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' }
      ]
    }
  }
}
</script>

<style scoped>
h1 {
  font-family: Roboto, sans-serif;
}
</style>
```
