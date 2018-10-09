---
title: "API: ModuleContainer クラス"
description: Nuxt ModuleContainer クラス
---

# ModuleContainer クラス

- ソース: **[core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/module.js)**

すべての [モジュール](/guide/modules) は `ModuleContainer` インスタンスのコンテキスト内で呼び出されます.

## Tapable プラグイン

特定のライフサイクルイベントでのフックを登録できます。

```js
nuxt.moduleContainer.plugin('ready', async moduleContainer => {
    // すべてのモジュールの準備ができたらここを実行します
})
```

[モジュール](/guide/modules) コンテキストの中では代わりに以下のようにできます:

```js
this.plugin('ready', async moduleContainer => {
    // すべてのモジュールの準備ができたらここを実行します
})
```

プラグイン | 引数       | タイミング
-------|-----------------|-----------------------------------------------------
`ready`| moduleContainer | `nuxt.config.js` にあるすべてのモジュールが初期化されたとき


## メソッド

### addVendor (vendor)

**`vendor` は非推奨です**

`options.build.vendor` に追加し、一意なフィルターを適用します。

### addTemplate (template)

- **テンプレート**: `文字列` または `オブジェクト`
    - `src`
    - `options`
    - `fileName`

ビルド時に、[lodash template](https://lodash.com/docs/4.17.4#template) を使って、与えられたテンプレートをプロジェクトの `buildDir` (`.nuxt`) にレンダリングします。

`fileName` を与えない、または `template` が文字列の場合、ファイル名はデフォルトで `[dirName].[fileName].[pathHash].[ext]` となります。

このメソッドは最終的な `{ dist, src, options }` オブジェクトを返します。

### addPlugin (template)

`addTemplate` でプラグインを登録し、`plugins[]` オプションの先頭に追加します。

`template.ssr: false` を使って SSR バンドルを含むプラグインを無効化することができます。

### addServerMiddleware (middleware)

[options.serverMiddleware](/api/configuration-servermiddleware) にミドルウェアをプッシュします。

### extendBuild (fn)

[options.build.extend](/api/configuration-build#extend) 関数をチェーンさせることで webpack のビルド設定を簡単に拡張できます。

### extendRoutes (fn)

[options.build.extendRoutes](/api/configuration-router#extendroutes) 関数をチェーンさせることで routes を簡単に拡張できます。

### addModule (moduleOpts, requireOnce)

モジュールを登録します。`moduleOpts` は文字列または `[src, options]` です。`requireOnce` が `true` で解決されたモジュールが`meta` をエクスポートしている場合に、同じモジュールを二度登録するのを回避します。

### requireModule (moduleOpts)

`addModule(moduleOpts, true)` の短縮形です。
