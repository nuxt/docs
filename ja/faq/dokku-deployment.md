---
title: Dokku へデプロイ
description: Dokku へデプロイするには？
---

# Dokku へデプロイするには？

[Dokku のセットアップのドキュメント](http://dokku.viewdocs.io/dokku/getting-started/installation/) 及び [Dokku を使っている Digital Ocean 上の Node.js アプリケーションのデプロイ](http://jakeklassen.com/post/deploying-a-node-app-on-digital-ocean-using-dokku/) をお読みになることをお勧めします。

例として、Nuxt.js のアプリケーションを以下 `my-nuxt-app` と呼びます。

まず `npm run build` を実行できるようにするために、Dokku にプロジェクトの `devDependencies` をインストールすることを伝える必要があります:

```bash
// Dokku サーバー上で
dokku config:set my-nuxt-app NPM_CONFIG_PRODUCTION=false
```

また、アプリケーションに `0.0.0.0` ポートを Listen させ、プロダクションモードで起動します:

```bash
// Dokku サーバー上で
dokku config:set my-nuxt-app HOST=0.0.0.0 NODE_ENV=production
```

`dokku config my-nuxt-app` とタイプして、下の 3行を確認します。

![nuxt config vars Dokku](https://i.imgur.com/9FNsaoQ.png)

それから `app.json` 内の `scripts.dokku.predeploy` スクリプトを使って、Dokku に `npm run build` を実行するよう伝えます。プロジェクトのルートディレクトリに `app.json` という名前のファイルを作成してください:

```js
{
  "scripts": {
    "dokku": {
      "predeploy": "npm run build"
    }
  }
}
```

最後にアプリケーションを Dokku に git push します:

```bash
// push する前に変更をコミットしてください
git remote add dokku dokku@yourServer:my-nuxt-app
git push dokku master
```

やりました！これで Nuxt.js アプリケーションは Dokku でホストされるようになりました！
