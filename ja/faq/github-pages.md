---
title: GitHub Pages へデプロイ
description: GitHub Pages へデプロイするには？
---

# GitHub Pages へデプロイするには？

Nuxt.js を使うと、例えば [GitHub Pages](https://pages.github.com/) のような静的ホスティングサービスで、ウェブアプリケーションをホストすることが可能です。

GitHub Pages へデプロイするには、静的なウェブアプリケーションを生成する必要があります:

```bash
npm run generate
```

このとき dist フォルダが作成され、その中に GitHub Pages ホスティングへデプロイされるものがすべて入ります。プロジェクトリポジトリならば `gh-pages` ブランチ、ユーザーまたは組織サイトならば `master` ブランチを指定してください。

<p class="Alert Alert--nuxt-green"><b>情報:</b> GitHub Pages で独自ドメインを使うために `CNAME` ファイルを置くのであれば、`CNAME` ファイルは `static` ディレクトリに置くとよいでしょう。詳細は [こちら](/guide/assets#webpack-で扱わない静的ファイル) を参照してください。</p>

## コマンドラインでデプロイする

[push-dir package](https://github.com/L33T-KR3W/push-dir) を使うこともできます:

まず npm でインストールしてください:

```bash
npm install push-dir --save-dev
```

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

それから静的なアプリケーションを生成し、デプロイしてください:

```bash
npm run generate
npm run deploy
```
