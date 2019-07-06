---
title: Netlify を使ったデプロイ
description: Netlify へデプロイするには？
---

# Netlify へデプロイするには？

[Netlify](https://www.netlify.com) へのデプロイは __静的に生成された__ Nuxt.js サイトを迅速にオンライン化するための低摩擦オプションです。

このプロセスの中核は、デプロイ中に Nuxt.js アプリケーションの静的なバージョンを `dist` ディレクトリ内にビルドする `nuxt generate` コマンドです。 このディレクトリの内容は、プロダクション URL にデプロイされます。

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/how-to-deploy-nuxtjs-to-netlify?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Vue School で <strong>Netlify へデプロイする方法</strong>についての無料レッスンをみる
    </p>
  </a>
</div>

## はじめに

Netlify ダッシュボードの _"New site from Git"_ ボタンを押下します。レポジトリホストで認証を行い、デプロイするレポジトリを選択、続行します。ステップ 3 : _"ビルドオプションとデプロイ！"_ に進んでください。

## 操作：

### 静的に生成されたサイトの場合

1. __ブランチをデプロイする：__ `master` もしくはデプロイしたいブランチ
2. __ビルドコマンド：__ `npm run generate`
3. __公開ディレクトリ：__ `dist`


### SPA モードで生成されたサイトの場合

1. __ブランチをデプロイする:__ `master` もしくはデプロイしたいブランチ
2. __ビルドコマンド:__ `npm run build`
3. __公開ディレクトリ:__ `dist`


シングルページアプリケーションの場合、Netlify は再読み込み時にデフォルトで *"404 not found"* にリダイレクトしますが、[リダイレクト設定](https://www.netlify.com/docs/redirects/#rewrites-and-proxying) を行う事で防げます。 また、シングルページアプリケーションのヘッダーとリダイレクト両方の設定をサポートする [nuxt-netlify](https://www.bazzite.com/docs/nuxt-netlify) モジュールを利用する事もできます。

> Divya Sasidharan が、Netlify のリダイレクトに関するリファレンスを [blog](https://www.netlify.com/blog/2019/01/16/redirect-rules-for-all-how-to-configure-redirects-for-your-static-site) に公開しているので参考にしてください。


> オプションで、_"Advanced"_ ボタンを使用して ENV 変数を追加することができます。これらは代替 API 資格情報などを交換する際に役立ちます。Netlify はまた、ビルド時に Nuxt.js アプリケーションで読み取れる [デフォルトの ENV 変数](https://www.netlify.com/docs/build-settings/#build-environment-variables) を提供します。

_"Deploy site"_ をクリックすると、すぐにデプロイが開始されます。Netlify サイトにランダムな値の URL が割り当てられ、`nuxt generate` コマンドを使用してデプロイされます。

やりました！これで Nuxt.js アプリケーションは Netlify でホストされるようになりました！
