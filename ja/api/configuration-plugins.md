---
title: "API: plugins プロパティ"
description: Nuxt.js の plugins オプションで Vue.js プラグインを使うことができます。
---

<!-- title: "API: The plugins Property" -->
<!-- description: Use vue.js plugins with the plugins option of nuxt.js. -->

<!-- # The plugins Property -->

# plugins プロパティ

<!-- - Type: `Array` -->
<!--   - Items: `String` -->

- タイプ: `配列`
  - 要素: `文字列`

<!-- \> The plugins property lets you add vue.js plugins easily to your main application. -->

> plugins プロパティを使うと Vue.js プラグインをメインアプリケーションに簡単に追加できます。

<!-- Example (`nuxt.config.js`): -->

例（`nuxt.config.js`）:

```js
module.exports = {
  plugins: ['~plugins/vue-notifications']
}
```

<!-- Then, we need to create a file in `plugins/vue-notifications.js`: -->

それから `plugins/vue-notifications.js` ファイルを作る必要があります:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

<!-- All the paths defined in the `plugins` property will be **imported** before initializing the main application. -->

`plugins` プロパティで設定されたパスはすべて、メインアプリケーションが初期化される前に **インポート** されます。

<!-- Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to `plugins` in `nuxt.config.js`. -->

`Vue.use()` を使う必要があるときは毎回 `plugins/` 内にファイルを作成し、そのパスを `nuxt.config.js` 内の `plugins` に追加する必要があります。

<!-- To learn more how to use the plugins, see the [guide documentation](/guide/plugins#vue-plugins). -->

plugins の使い方をより深く理解するには [guide ドキュメント](/guide/plugins#vue-plugins) を参照してください。
