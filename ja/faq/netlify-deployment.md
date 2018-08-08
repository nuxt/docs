---
title: Netlify を使ったデプロイ
description: Netlify へデプロイするには？
---

# Netlify へデプロイするには？

[Netlify](https://www.netlify.com) へのデプロイは **静的に生成された** Nuxt.js サイトを迅速にオンライン化するための低摩擦オプションです。

このプロセスの中核は、デプロイ中に Nuxt.js アプリケーションの静的なバージョンを `dist` ディレクトリ内にビルドする `nuxt generate` コマンドです。 このディレクトリの内容は、プロダクション URL にデプロイされます。

### はじめに

Netlify ダッシュボードの *"New site from Git"* ボタンを押下します。レポジトリホストで認証を行い、デプロイするレポジトリを選択、続行します。ステップ 3 : *"ビルドオプションとデプロイ！"*に進んでください。

### 操作：

1. **ブランチをデプロイする：** `master` もしくは デプロイしたいブランチ
2. **ビルドコマンド：** `npm run generate`
3. **公開ディテクトリ：** `dist`

> オプションで、*"Advanced"* ボタンを使用して ENV 変数を追加することができます。これらは代替 API 資格情報などを交換する際に役立ちます。Netlify はまた、ビルド時に Nuxt.js アプリケーションで読み取れる [デフォルトの ENV 変数](https://www.netlify.com/docs/build-settings/#build-environment-variables) を提供します。

*"Deploy site"* をクリックすると、すぐにデプロイが開始されます。Netlify サイトにランダムな値の URL が割り当てられ、`nuxt generate` コマンドを使用してデプロイされます。

やりました！これで Nuxt.js アプリケーションは Netlify でホストされるようになりました！
