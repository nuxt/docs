---
title: GitHub Pages へデプロイ
description: GitHub Pages へデプロイするには？
---

<!-- title: GitHub Pages Deployment -->
<!-- description: How to deploy Nuxt.js on GitHub Pages? -->

<!-- # How to deploy on GitHub Pages? -->

# GitHub Pages へデプロイするには？

<!-- Nuxt.js gives you the possibility to host your web application on any static hosting like [GitHub Pages](https://pages.github.com/) for example. -->

Nuxt.js を使うと、例えば [GitHub Pages](https://pages.github.com/) のような静的ホスティングサービスで、ウェブアプリケーションをホストすることが可能です。

<!-- To deploy on GitHub Pages, you need to generate your static web application: -->

GitHub Pages へデプロイするには、静的なウェブアプリケーションを生成する必要があります:

```bash
npm run generate
```

<!-- It will create a `dist` folder with everything inside ready to be deployed on GitHub Pages hosting. -->

このとき dist フォルダが作成され、その中に GitHub Pages ホスティングへデプロイされるものがすべて入ります。

<!-- Branch `gh-pages` for project repository OR branch `master` for user or organization site -->

プロジェクトリポジトリならば `gh-pages` ブランチ、ユーザーまたは組織サイトならば `master` ブランチを指定してください。

<!-- ## Command line deployment -->

## コマンドラインでデプロイする

<!-- You can also use [push-dir package](https://github.com/L33T-KR3W/push-dir): -->

[push-dir package](https://github.com/L33T-KR3W/push-dir) を使うこともできます:

<!-- First install it via npm: -->

まず npm でインストールしてください:

```bash
npm install push-dir --save-dev
```

<!-- Add a `deploy` command to your package.json with the branch as `gh-pages` for project repository OR `master` for user or organization site. -->

`deploy` コマンドを package.json に追加してください。ブランチは、プロジェクトリポジトリならば `gh-pages` ブランチ、ユーザーまたは組織サイトならば `master` ブランチを指定してください。

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate",
  "deploy": "push-dir --dir=dist --branch=gh-pages --cleanup"
},
```

<!-- Then generate and deploy your static application: -->

それから静的なアプリケーションを生成し、デプロイしてください:

```bash
npm run generate
npm run deploy
```
