---
title: Now を使ったデプロイ
description: Now へデプロイするには？
---

# Now へデプロイするには？

## Now V2

**Note:** サーバーサイドレンダリングされた Nuxt アプリは、Now v2 ではデプロイできません。そのような場合は、Now v1 を使ってください。

[ZEIT Now](https://zeit.co/now) を使ってデプロイするには、`package.json` のカスタマイズと、`now.json`の設定ファイルを作成します。

* `package.json` に `now-build` script コマンドを追加して下さい。:
  * SPA (without SSR) の場合:
    ```js
    "scripts": {
       ...
       "now-build": "nuxt build --spa"
    }
    ```
  * Static Generated (Pre Rendering)の場合:
    ```js
    "scripts": {
       ...
       "now-build": "nuxt generate"
    }
    ```
* `now.json` を作成し、`builds` を定義してください。:

  ```json
  {
    "version": 2,
    "builds": [
      { "src": "package.json", "use": "@now/static-build" }
    ]
  }
  ```
* これで `now` を実行できます！エンジョイ！

## Now V1 (レガシー)

[now.sh](https://zeit.co/now) を使ってデプロイするには `package.json` を次のように記述することが推奨されます:

```json
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```

これで `now` を実行できます！エンジョイ！

メモ: `.nuxt` を `.npmignore` または `.gitignore` に入れておくことをお勧めします。
