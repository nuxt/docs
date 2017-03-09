---
title: Surge へデプロイ
description: Surge.sh へデプロイするには？
---

<!-- title: Surge Deployment -->
<!-- description: How to deploy Nuxt.js with Surge.sh? -->

<!-- # How to deploy with Surge.sh? -->

# Surge.sh へデプロイするには？

<!-- Nuxt.js gives you the possibility to host your web application on any static hosting like [surge.sh](https://surge.sh/) for example. -->

Nuxt.js を使うと、例えば [surge.sh](https://surge.sh/) のような静的ホスティングサービスで、ウェブアプリケーションをホストすることが可能です。

<!-- To deploy on surge.sh, first install it on your computer: -->

surge.sh へデプロイするには、まず surge をインストールします:

```bash
npm install -g surge
```

<!-- Then, we tell nuxt.js to generate our web application: -->

それから Nuxt.js にウェブアプリケーションを生成させます:

```bash
npm run generate
```

<!-- It will create a `dist` folder with everything inside ready to be deployed on a static hosting. -->

`dist` フォルダが作成され、その中に静的ホスティングサービスへデプロイされるものがすべて入ります。

<!-- We can then deploy it to surge.sh: -->

surge.sh へデプロイできます:

```bash
surge dist/
```

<!-- Done :) -->

これで完了です。:)

<!-- If you have a project with [dynamic routes](/guide/routing#dynamic-routes), take a look at the [generate configuration](/api/configuration-generate) to tell nuxt.js how to generate these dynamic routes. -->

プロジェクトが [動的なルーティング](/guide/routing#dynamic-routes) をしているなら、Nuxt.js に動的なルーティングを生成する方法を伝えるために [生成設定](/api/configuration-generate) を参照してください。

<!-- <div class="Alert">When generating your web application with `nuxt generate`, [the context](/api) given to [data()](/guide/async-data#the-data-method) and [fetch()](/guide/vuex-store#the-fetch-method) will not have `req` and `res`.</div> -->

<div class="Alert">`nuxt generate` でウェブアプリケーションを生成するときは [data()](/guide/async-data#the-data-method) 及び [fetch()](/guide/vuex-store#the-fetch-method) に渡される [context](/api) が `req` 及び `res` を持っていません。</div>
