---
title: "API: ignore プロパティ"
description: ignore 対象とするファイルを定義します
---

# .nuxtignore

`.nuxtignore` ファイルを使用することで、ビルド時にプロジェクトルート (`rootDir`) にある `layout`, `page`, `store` そして `middleware` 内のファイルを Nuxt.js に無視させることが出来ます。

例:

```
# layout の foo.vue を無視する
layouts/foo.vue
# layout の末尾が -ignore.vue のファイルを無視する
layouts/*-ignore.vue

# page の bar.vue を無視する
pages/bar.vue
# ignore フォルダにある page を無視する
page/ignore/*.vue

# store の baz.js を無視する
store/baz.js
# store の *.test.* にマッチするファイルを無視する
store/ignore/*.test.*

# middleware の foo フォルダにある foo/bar.js 以外のファイルを無視する
middleware/foo/*.js
!middleware/foo/bar.js
```

> 仕様に関する詳細はこちらを参照してください [gitignore doc](https://git-scm.com/docs/gitignore)

# ignorePrefix プロパティ

- 型: `String`
- デフォルト: `'-'`

> pages/ layout/ middleware/ store/ ディレクトリに含まれるファイルの中で、ファイル名が `ignorePrefix` プロパティで指定された接頭辞から始まる場合にはビルド時に無視されます。

デフォルトでは `-` で始まる `store/-foo.js` や `pages/-bar.vue` のようなファイルは全て無視されます。これによりルートやストア等に変換されることなく、呼び出し元と同じ場所にテスト、ユーティリティ、コンポーネント等のファイルを置くことができます。

**メモ:** このオプションは Nuxt.js 3 で非推奨になります。代わりに `.nuxtignore` ファイルを使うことをお勧めします。

# ignore プロパティ

- 型: `Array`
- デフォルト: `['**/*.test.*',  '**/*.spec.*']`

> `ignorePrefix` よりもカスタマイズしやすいです: `ignore` プロパティに指定した glob パターンと一致する全てのファイルがビルド時に無視されます

**メモ:** このオプションは Nuxt.js 3 で非推奨になります。代わりに `.nuxtignore` ファイルを使うことをお勧めします。
