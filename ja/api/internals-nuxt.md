---
title: 'API: Nuxt のクラス'
description: Nuxt のコアのクラス
---

# Nuxt のクラス

- ソース: **[core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/nuxt.js)**

すべてのモジュールとクラスが通信できるようにするためのコアのコンテナです。すべてのモジュールは Nuxt インスタンスに `this.nuxt` を使ってアクセスできます。

## タップ可能なプラグイン

特定のライフサイクルイベントでのフックを登録できます。

```js
nuxt.hook('ready', async nuxt => {
    // ここにコードを記述してください
})
```

プラグイン | 引数 | タイミング
--- | --- | ---
`ready` | nuxt | すべてのモジュールが初期化されたあと、レンダラーを初期化する前
`error` | error args | Nuxt モジュールのいずれかにより未処理のエラーが補足された
`close` | - | Nuxt インスタンスがきちんと終わろうとしている
`listen` | ({server, host, port}) | Nuxt の**内部**サーバーがリッスンを始めた（`nuxt start` または `nuxt dev` により起こる）
