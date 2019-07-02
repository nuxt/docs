---
title: "API: Generator クラス"
description: Nuxt Generator クラス
---

# Generator クラス

- ソース: **[generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)**

## フック

特定のライフサイクルイベントでのフックを登録できます。

フック                    | 引数                   | タイミング
------------------------|-----------------------------|-----------------------------------------------
`generate:before`       | (nuxt, generateOptions)     | generate する前
`generate:distRemoved`  | (nuxt)                      | generate のビルド先フォルダがクリーンされるとき
`generate:distCopied`   | (nuxt)                      | 静的ファイルとビルドされたファイルがコピーされるとき
`generate:page`         | ({route, path, html})       | ユーザーがパスと html を更新できるようにするフック
`generate:routeCreated` | (route, path, errors)       | generate されたページの保存に成功したとき
`generate:extendRoutes` | (routes)                    | ユーザーが generate する routes を更新するためのフック
`generate:routeFailed`  | (route, errors)             | generate されたページの保存に失敗したとき
`generate:done`         | (nuxt, errors)              | generate が終了したとき
