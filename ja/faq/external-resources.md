---
title: 外部リソース
description: Nuxt.js と一緒に外部リソースを使うにはどうしたらよいですか？
---

<!-- title: External resources -->
<!-- description: How to use external resources with Nuxt.js? -->

<!-- # How to use external resources? -->

# 外部リソースを使うにはどうしたらよいですか？

<!-- ## Global Settings -->

## グローバルな設定

<!-- Include your resources in the `nuxt.config.js` file: -->

`nuxt.config.js` ファイル内でリソースをインクルードします:

```js
module.exports = {
  head: {
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  }
}
```

<!-- ## Local Settings -->

## ローカルな設定

<!-- Include your resources in your .vue file inside the pages directory: -->

pages ディレクトリの .vue ファイル内でリソースをインクルードします:

```html
<template>
  <h1>About page with jQuery and Roboto font</h1>
</template>

<script>
export default {
  head: {
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  }
}
</script>
```
