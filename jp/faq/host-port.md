---
title: ホストとポート番号
description: Nuxt.js でホストとポート番号を変更するには？
---

# ホストとポート番号を変更するには？

ポート番号を設定するには 2つの異なる方法があります:

- 環境変数を使う

```js
"scripts": {
  "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```

- `package.json` 内の nuxt 設定を使う:

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
