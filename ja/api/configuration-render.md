---
title: "API: render プロパティ"
description: Nuxt.js はページレンダリングの実行時オプションをカスタマイズできます。
---

# renderプロパティ

> Nuxt.js はページレンダリングの実行時オプションをカスタマイズできます。

## bundleRenderer
- 型: `Object`

> このオプションを使用して Vue SSR のバンドルレンダラのカスタマイズします。このオプションは SPA モードではスキップされます。

```js
export default {
  render: {
    bundleRenderer: {
      directives: {
        custom1: function (el, dir) {
          // 何かの処理 ...
        }
      }
    }
  }
}
```

利用可能なオプションは [Vue SSR API リファレンス](https://ssr.vuejs.org/ja/api/#レンダラオプション) でより詳しく学べます。
Nuxt.js は既に最高の SSR のデフォルト設定を提供していて、誤った設定が SSR の問題を引き起こす可能性があるため、このオプションを使用しないことをお勧めします。

## etag
- 型: `Object`
  - デフォルト: `{ weak: true }`

ページの etag を無効にするためには `etag: false` をセットしてください。

利用可能なオプションは [etag](https://www.npmjs.com/package/etag) を参照してください。

## compressor
- 型 `Object`
  - デフォルト: `{ threshold: 0 }`

Object（または偽の値）を提供する場合、[compression](https://www.npmjs.com/package/compression) ミドルウェアが利用されます（それぞれのオプションがあります）。

独自の圧縮ミドルウェアを使用したい場合は、直接参照することができます。(f.ex. `otherComp({ myOptions: 'example' })`)

## fallback
- 型 `Object`
  - デフォルト: `{ dist: {}, static: { skipUnknown: true } }`

[serve-placeholder](https://github.com/nuxt/serve-placeholder) ミドルウェアのオプションです。

もしこれらのうち1つか両方を無効にする場合は、偽となる値を渡すことができます。

## http2
- 型 `Object`
  - デフォルト: `{ push: false, pushAssets: null }`

HTTP2 プッシュヘッダーを有効にします。

`pushAssets` 関数でプッシュされるリンクをコントロールすることができます。 例えば:
```js
pushAssets: (req, res, publicPath, preloadFiles) => preloadFiles
  .filter(f => f.asType === 'script' && f.file === 'runtime.js')
  .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
```

配列と同様に自分のアセットを追加することができます。
`req` と `res` を使うことで、例えばアプリケーションバージョンを持ったクッキーを使うといったように、リクエストヘッダを元にどのリンクをプッシュするか決めることができます。

それらのアセットは `,` を区切り文字として合成され、1つの `Link` ヘッダに渡されます。

## resourceHints
- 型: `Boolean`
  - デフォルト: `true`

> 初期ページの読み込み時間をより早くするために、 `prefetch` と `preload` のリンクを追加しました。

多くのページとルートがある場合に、このオプションのみを無効にすることができます。

## ssr
- 型: `Boolean`
  - デフォルト: ユニバーサルモードでは `true` SPA モードでは `false`

> SSR レンダリングを有効にする

このオプションは、提供されていなければ `mode` に基づいて自動的に設定されます。
これは（例えば Docker で）イメージビルド後にランタイムで SSR を動的に有効/無効にするのに便利です。

## static
- 型: `Object`
  - デフォルト: `{}`

利用可能なオプションは  [serve-static](https://www.npmjs.com/package/serve-static) を参照してください。

## dist
- 型: `Object`
  - デフォルト: `{ maxAge: '1y', index: false }`

配布ファイルの配信に使用されるオプションです。本番でのみ適用されます。

利用可能なオプションは  [serve-static](https://www.npmjs.com/package/serve-static) を参照してください。

## csp

> これは Content-Security-Policy で適用された外部リソースを読み込む設定をするために使用します。

- 型: `Boolean` または `Object`
  - デフォルト: `false`

例 (`nuxt.config.js`)

```js
export default {
  render: {
    csp: true
  }
}

// または

export default {
  render: {
    csp: {
      hashAlgorithm: 'sha256',
      policies: {
        'script-src': [
          'https://www.google-analytics.com',
          'https://name.example.com'
        ],
        'report-uri': [
          'https://report.example.com/report-csp-violations'
        ]
      }
    }
  }
}
```
