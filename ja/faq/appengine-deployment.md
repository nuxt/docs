---
title: Google App Engine へのデプロイ
description: Nuxt.js を Google App Engine へデプロイするには？
---

# Google App Engine にどのようにデプロイを行うか

[Google App Engine](https://cloud.google.com/appengine/) にデプロイは Google のクラウドサービスでユニバーサル Nuxt アプリケーションをホストするための迅速で簡単なソリューションです。

このガイドでは、アプリケーションをローカルに構築してから、プロジェクトフォルダ全体を Google App Engine にアップロードするだけです。アップロード後、Google App Engine は自動的に package.json の start`スクリプトを起動し、あなたのアプリはすぐに利用可能となります。

## はじめに

[Google App Engine](https://cloud.google.com/appengine/) に Google クラウドアカウント、プロジェクト、空の Google App Engine アプリが設定されていることを確認してください。さらに、[こちら](https://cloud.google.com/sdk/) の説明に従って Google から Cloud SDK(CLI) をダウンロードしてインストールし、Google クラウドアカウントにログインしてください。

## アプリケーションの設定

ユニバーサル Nuxt アプリケーションを App Engine にデプロイするために追加する必要があるのは、`app.yaml` というファイルだけです。ルートプロジェクトディレクトリにその名前の新しいファイルを作成し、次の内容を追加します:

```yaml
runtime: nodejs10

instance_class: F2

handlers:
  - url: /_nuxt
    static_dir: .nuxt/dist/client
    secure: always

  - url: /(.*\.(gif|png|jpg|ico|txt))$
    static_files: static/\1
    upload: static/.*\.(gif|png|jpg|ico|txt)$
    secure: always

  - url: /.*
    script: auto
    secure: always

env_variables:
  HOST: '0.0.0.0'
  NODE_ENV: 'production'
```

## ビルドとデプロイ

さあ、あなたのアプリを `npm run build` でビルドしてください。

これで、アプリは Google App Engine にアップロードできる準備が整いました。では、次のコマンドを実行してください:

```
gcloud app deploy app.yaml --project <project-id>
```

ほら！ Nuxt.js アプリケーションが Google App Engine 上にホストされました！

## 詳細

- The `instance_class` attribute in your app.yaml file sets the class of your app instance. Instance F2 is not completely free, but has the minimum memory needed to run a Nuxt application.
- Make sure to put the project-id and not the project-name in the deploy command. These are two different things - but easy to mix up.

- app.yaml ファイルの `instance_class` 属性はあなたのアプリインスタンスのクラスを設定します。インスタンス F2 は完全に無料ではありませんが、Nuxt アプリケーションを実行するのに必要な最小メモリを有しています。
- deploy コマンドには、必ず project-name ではなく project-id を入れてください。これら 2 つは異なるものです - しかし混同しやすいです。
