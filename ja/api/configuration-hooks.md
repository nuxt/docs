---
title: 'API: hooks プロパティ'
description: フックは Nuxt モジュールで一般的に使われる Nuxt イベントのリスナーですが、 `nuxt.config.js` の中でも利用できます。
---

# hooks プロパティ

- 型: `オブジェクト`

> フックは Nuxt モジュールで一般的に使われる [Nuxt イベントのリスナー](/api/internals) ですが、 `nuxt.config.js` の中でも利用できます。 より詳しくは [こちら](/api/internals) を参照してください。

例 (`nuxt.config.js`):

```js
import fs from 'fs'
import path from 'path'

export default {
  hooks: {
    build: {
      done(builder) {
        const extraFilePath = path.join(builder.nuxt.options.buildDir, 'extra-file')
        fs.writeFileSync(extraFilePath, 'Something extra')
      }
    }
  }
}
```

内部的には、フックはコロン（例えば、 `build:done`）を使った命名パターンに従います。設定を簡単にするため、上記の例のように `nuxt.config.js` を使用して独自のフックを設定すると、それらを階層オブジェクトとして構造化できます。 それらの仕組みの詳細については [Nuxt Internals](/api/internals) を参照してください。

## フックリスト

- [Nuxt クラス フック](https://ja.nuxtjs.org/api/internals-nuxt/#フック)
- [Renderer クラス フック](https://ja.nuxtjs.org/api/internals-renderer/#フック)
- [ModulesContainer クラス フック](https://ja.nuxtjs.org/api/internals-module-container/#フック)
- [Builder クラス フック](https://ja.nuxtjs.org/api/internals-builder/#フック)
- [Generator クラス フック](https://ja.nuxtjs.org/api/internals-generator/#フック)
