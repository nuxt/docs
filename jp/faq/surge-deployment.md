---
title: Surge へデプロイ
description: Surge.sh へデプロイするには？
---

# Surge.sh へデプロイするには？

Nuxt.js を使うと、例えば [surge.sh](https://surge.sh/) のような静的ホスティングサービスで、ウェブアプリケーションをホストすることが可能です。

surge.sh へデプロイするには、まず surge をインストールします:

```bash
npm install -g surge
```

それから Nuxt.js にウェブアプリケーションを生成させます:

```bash
npm run generate
```

このとき `dist` フォルダが作成され、その中に静的ホスティングサービスへデプロイされるものがすべて入ります。

そして surge.sh へデプロイできます:

```bash
surge dist/
```

これで完了です。:)

プロジェクトが [動的なルーティング](/guide/routing#動的なルーティング) をしている場合は、動的なルーティングをどのように生成するかを Nuxt.js に伝えるために [生成の設定](/api/configuration-generate) を参照してください。

<div class="Alert">`nuxt generate` でウェブアプリケーションを生成するときは [data()](/guide/async-data#the-data-method) や [fetch()](/guide/vuex-store#the-fetch-method) に渡される [context](/api) が `req` 及び `res` を持っていません。</div>
