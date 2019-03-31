---
title: PostCSS プラグイン
description: PostCSS プラグインを追加するには？
---

# PostCSS プラグインを追加するには？

`nuxt.config.js` ファイル内に次のように記述します:

```js
export default {
  build: {
    postcss: {
      // キーとしてプラグイン名を、値として引数を追加します
      // プラグインは前もって npm か yarn で dependencies としてインストールしておきます
      plugins: {
        // 値として false を渡すことによりプラグインを無効化します
        'postcss-url': false,
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        // postcss-preset-env 設定を変更します
        autoprefixer: {
          grid: true
        }
      }
    }
  }
}
```
