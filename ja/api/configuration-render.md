---
title: "API: render プロパティ"
description: Nuxt.js はページレンダリングの実行時オプションをカスタマイズできます。
---

# renderプロパティ

> Nuxt.js はページレンダリングの実行時オプションをカスタマイズできます。

## bundleRenderer
- 型: `オブジェクト`

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
- 型: `オブジェクト`
  - デフォルト: `{ weak: true }`

ページの etag を無効にするためには `etag: false` をセットしてください。

利用可能なオプションは [etag](https://www.npmjs.com/package/etag) を参照してください。

## compressor
- 型 `オブジェクト`
  - デフォルト: `{ threshold: 0 }`

オブジェクト（または偽の値）を提供する場合、[compression](https://www.npmjs.com/package/compression) ミドルウェアが利用されます（それぞれのオプションがあります）。

独自の圧縮ミドルウェアを使用したい場合は、直接参照することができます。(f.ex. `otherComp({ myOptions: 'example' })`)

## http2
- 型 `オブジェクト`
  - デフォルト: `{ push: false }`

HTTP2 プッシュヘッダーを有効にします。

## resourceHints
- 型: `ブーリアン`
  - デフォルト: `true`

> 初期ページの読み込み時間をより早くするために、 `prefetch` と `preload` のリンクを追加しました。

多くのページとルートがある場合に、このオプションのみを無効にすることができます。

## ssr
- 型: `ブーリアン`
  - デフォルト: ユニバーサルモードでは `true` SPA モードでは `false`

> SSR レンダリングを有効にする

このオプションは、提供されていなければ `mode` に基づいて自動的に設定されます。
これは（例えば Docker で）イメージビルド後にランタイムで SSR を動的に有効/無効にするのに便利です。

## static
- 型: `オブジェクト`
  - デフォルト: `{}`

利用可能なオプションは  [serve-static](https://www.npmjs.com/package/serve-static) を参照してください。

## dist
- 型: `オブジェクト`
  - デフォルト: `{ maxAge: '1y', index: false }`

配布ファイルの配信に使用されるオプションです。本番でのみ適用されます。

利用可能なオプションは  [serve-static](https://www.npmjs.com/package/serve-static) を参照してください。

## csp

> これは Content-Security-Policy で適用された外部リソースを読み込む設定をするために使用します。

- 型: `ブーリアン` または `オブジェクト`
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
      allowedSources: undefined,
      policies: undefined
    }
  }
}
```
