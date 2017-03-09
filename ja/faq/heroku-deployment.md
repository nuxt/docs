---
title: Heroku へデプロイ
description: Heroku へデプロイするには？
---

<!-- title: Heroku Deployment -->
<!-- description: How to deploy Nuxt.js on Heroku? -->

<!-- # How to deploy on Heroku? -->

# Heroku へデプロイするには？

<!-- We recommend you to read the [Heroku documentation for node.js](https://devcenter.heroku.com/articles/nodejs-support). -->

[Node.js 用の Heroku ドキュメント](https://devcenter.heroku.com/articles/nodejs-support) をお読みになることをお勧めします。

<!-- First, we need to tell Heroku to install the `devDependencies` of the project (to be able to launch `npm run build`): -->

まず `npm run build` を実行できるようにするために、Heroku にプロジェクトの `devDependencies` をインストールすることを伝える必要があります:

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
```

<!-- Also, we want our application to listen on the port `0.0.0.0` and run in production mode: -->

またアプリケーションに `0.0.0.0` ポートを Listen させ、プロダクションモードで起動します:

```bash
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production
```

<!-- You should see this in your Heroku dashboard (Settings section): -->

下記は Heroku ダッシュボードの Settings セクションに表示されています:

 ![nuxt config vars Heroku](https://i.imgur.com/EEKl6aS.png)

<!-- Then, we tell Heroku to launch `npm run build` via the `heroku-postbuild` script in our `package.json`: -->

それから `package.json` 内の `heroku-postbuild` スクリプトを使って、Heroku に `npm run build` を実行するよう伝えます:

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "heroku-postbuild": "npm run build"
}
```

<!-- Finally, we can push the app on Heroku with: -->

最後にアプリケーションを Heroku に git push します:

```bash
git push heroku master
```

<!-- Voilà! Your nuxt.js application is now hosted on Heroku! -->

やりました！これで Nuxt.js アプリケーションは Heroku でホストされるようになりました！
