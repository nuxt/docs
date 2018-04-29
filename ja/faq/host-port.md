---
title: ホストとポート番号
description: Nuxt.js でホストとポート番号を変更するには？
---

# ホストとポート番号を変更するには？

ポート番号を設定するには 3つの異なる方法があります:

1. 環境変数を使う

```js
"scripts": {
  "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```

1. より良いクロスプラットフォーム開発サポートを追加する

**メモ**: より良いクロスプラットフォーム開発サポートのために [cross-env](https://www.npmjs.com/package/cross-env) を使うことができます。

インストール:

```bash
npm install --save-dev cross-env
```

```js
"scripts": {
  "dev": "cross-env HOST=0.0.0.0 PORT=3333 nuxt"
}
```

1. `package.json` 内の nuxt 設定を使う:

`package.json` 内:

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
