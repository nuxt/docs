---
title: "API: plugins プロパティ"
description: Nuxt.js の plugins オプションで Vue.js プラグインを使うことができます。
---

# plugins プロパティ

- 型: `配列`
  - 要素: `文字列` または `オブジェクト`

オブジェクトの場合にはプロパティは次のとおり:

- src: `文字列`（ファイルパス）
- ssr: `ブーリアン`（デフォルトは `true`）*false のときは、クライアントサイドでのみファイルがインクルードされます*

> plugins プロパティを使うと Vue.js プラグインをメインアプリケーションに簡単に追加できます。

例（`nuxt.config.js`）:

```js
module.exports = {
  plugins: ['~/plugins/vue-notifications']
}
```

それから `plugins/vue-notifications.js` ファイルを作る必要があります:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

`plugins` プロパティで設定されたパスはすべて、メインアプリケーションが初期化される前に **インポート** されます。

`Vue.use()` を使う必要があるときは毎回 `plugins/` 内にファイルを作成し、そのパスを `nuxt.config.js` 内の `plugins` に追加する必要があります。

plugins の使い方をより深く理解するには [ガイド](/guide/plugins#vue-プラグイン) を参照してください。
