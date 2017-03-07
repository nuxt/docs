---
title: ホストとポート番号
description: Nuxt.js でホストとポート番号を変更するには？
---

<!-- title: HOST and PORT -->
<!-- description: How to edit HOST and PORT with Nuxt.js? -->

<!-- # How to edit HOST and PORT? -->

# ホストとポート番号を変更するには？

<!-- You can configure the PORT with 2 different ways: -->

ポート番号を設定するには 2つの異なる方法があります:

<!-- - Via a env variables -->

- 環境変数経由

```js
"scripts": {
    "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```

<!-- - Via a nuxt config in the `package.json`: -->

- `package.json` 内の nuxt 設定経由:

```js
"config": {
    "nuxt": {
      "host": "0.0.0.0",
      "port": "3333"
    }
},
"scripts": {
    "dev": "nuxt"
}
```
