---
title: PM2 のクラスターモードを使ってデプロイするには?
description: PM2 のクラスターモードを使って Nuxt.js をデプロイするには?
---

[PM2](https://pm2.keymetrics.io/) (Process Manager 2) を用いたデプロイは、ユニバーサル Nuxt アプリケーションをサーバーや VM 上でホストするための迅速で簡単なソリューションです。

このガイドでは、アプリケーションをローカルに構築してから、クラスターモードを有効にした PM2 設定ファイルを用いてデプロイするまでを行います。クラスターモードは、アプリケーションを複数の CPU を用いてスケーリングできるようにすることで、ダウンタイムを防ぐことができます。

## はじめに

サーバに pm2 がインストールされていることを確認してください。もしインストールしていなければ、 yarn または npm を用いてグローバルでインストールしてください。

```bash
# yarn pm2 install
$ sudo yarn global add pm2 --prefix /usr/local

# npm pm2 install
$ npm install pm2 -g
```

## アプリケーションの設定

ユニバーサル Nuxt アプリケーションを PM2 を用いてデプロイするために追加する必要があるのは、 `ecosystem.config.js` というファイルだけです。ルートプロジェクトディレクトリにその名前の新しいファイルを作成し、次の内容を追加します。

```javascript
module.exports = {
  apps: [
    {
      name: 'NuxtAppName',
      exec_mode: 'cluster',
      instances: 'max', // もしくはインスタンスの個数
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
```

## ビルドとデプロイ

さあ、あなたのアプリケーションを `npm run build` でビルドしてください。

そして `pm2 start` でデプロイしてください。

`pm2 ls` で状態を確認しましょう。

Nuxt.js アプリケーションがデプロイされました！

## 詳細

このソリューションはサーバ上のアプリケーションのダウンタイムがなくなることを保証します。冗長性や高可用性のクラウドソリューションにより、サーバの障害を防ぐ必要があります。

PM2 のより詳細な情報は [こちら](https://pm2.keymetrics.io/docs/usage/application-declaration/#general) で確認することができます。

