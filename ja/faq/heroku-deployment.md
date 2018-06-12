---
title: Heroku へデプロイ
description: Heroku へデプロイするには？
---

# Heroku へデプロイするには？

[Node.js 向けの Heroku のドキュメント ](https://devcenter.heroku.com/articles/nodejs-support)を読むことをお勧めします。

まず `npm run build` を実行できるようにするために、Heroku にプロジェクトの `devDependencies` をインストールすることを伝える必要があります:

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
```

また､アプリケーションにホスト `0.0.0.0` を listen させプロダクションモードで起動します:

```bash
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production
```

下記は Heroku ダッシュボードの Settings セクションに表示されています:

![nuxt config vars Heroku](https://i.imgur.com/EEKl6aS.png)

それから `package.json` 内の `heroku-postbuild` スクリプトを使って、Heroku に `npm run build` を実行するよう伝えます:

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "heroku-postbuild": "npm run build"
}
```

最後にアプリケーションを Heroku に git push します:

```bash
git push heroku master
```

やりました！これで Nuxt.js アプリケーションは Heroku でホストされるようになりました！
