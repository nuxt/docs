---
title: TypeScript サポート
description: "Nuxt.js は TypeScript がビルドインされた `@nuxt/typescript` モジュールをリリースしました。"
---

> 静的型付けは、とりわけアプリケーションが大きく成長したするにつれて、多くの潜在的なランタイムエラーを防ぐのに役立ちます。
>
> それこそが Nuxt の新しい `@nuxt/typescript` パッケージがビルトインで TypeScript ツールをサポートする理由です:
> - Nuxt 公式の型定義
> - IDE でのオートコンプリート
> - すべてを TypeScript で記述できること（`layouts`, `pages`, `components`, `plugins`, `store`）
> - ランタイム TS サポート（`nuxt.config.ts`, `modules`, `serverMiddlewares`）
> - TSX サポート

## はじめる

プロジェクトで TypeScript を利用するためには `@nuxt/typescript` を `devDependencies` に、`ts-node` を `dependencies` にインストールする必要があります。

```sh
npm i -D @nuxt/typescript
npm i ts-node
# または
yarn add -D @nuxt/typescript
yarn add ts-node
```

<div class="Alert Alert--gray">

**情報:** `@nuxt/typescript` は TypeScript ファイルのコンパイルと型チェックを別のプロセスで行うのに必要な TypeScript 関連の依存関係を持っています。

</div>

<div class="Alert Alert--gray">

**情報:** `ts-node` は `nuxt.config.ts` と `serverMiddlewares` をサポートする TypeScript ランタイムを有効化するため `@nuxt/core` を拡張します。

</div>

また、コードエディタかコマンドラインを使って、プロジェクトのルートフォルダに空の `tsconfig.json` ファイルを作成する必要があります:

```sh
touch tsconfig.json
```

<div class="Alert Alert--gray">

**情報:** `tsconfig.json` は `nuxt` コマンドを初回実行時に自動的にデフォルト値で更新されます。

</div>

## JavaScript から TypeScript へ

### 設定ファイル

設定ファイル内で TypeScript と使えるようにするために必要なことは、プロジェクトのルートフォルダにある `nuxt.config.js` ファイルを `nuxt.config.ts` へリネームするだけです。

Nuxt.js はオートコンプリートと型チェックを行うための型定義を提供します:

```ts
import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {
  // タイプするか `Ctrl + Space` を押すとオートコンプリートできます
}

export default config
```

### コンポーネント

コンポーネントのために [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) を利用することを強くお薦めします。なおこれは [vue-class-component](https://github.com/vuejs/vue-class-component) に依存しています。

下記は Nuxt の [`asyncData`](https://ja.nuxtjs.org/guide/async-data) メソッドで取得したデータを表示するための、再利用可能な `component` と `page` を組み合わせた基本的な例です。

```ts
/* models/Post.ts */

export default interface Post {
  id: number
  title: string
  description: string
}
```

```html
<!-- components/PostPreview.vue -->

<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.description }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Post from '~/models/Post'

@Component
export default class PostPreview extends Vue {
  @Prop({ type: Object, required: true }) post!: Post
}
</script>
```

```html
<!-- pages/feed.vue -->

<template>
  <div>
    <PostPreview v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue } from 'vue-property-decorator'
import Post from '~/models/Post'

@Component({
  components: {
    PostPreview: () => import('~/components/PostPreview.vue')
  },
  async asyncData () {
    let { data } = await axios.get(`https://my-api/posts`)
    return {
      posts: data
    }
  }
})

export default class FeedPage extends Vue {
  posts: Post[] = []
}
</script>
```

同様のロジックを `layouts` でも使うことができます。

## ESLint を使った Linting

プロジェクトを Lint するために ESLint を使っているのであれば、下記のように ESLint で TypeScript ファイルを Lint できます。 

<div class="Alert Alert--teal">

**重要:** 既に [nuxt/eslint-config](https://github.com/nuxt/eslint-config) を設定しているという想定です。

</div>

まず、@typescript-eslint/eslint-plugin と @typescript-eslint/parser ([typescript-eslint 用の GitHub モノリポジトリ](https://github.com/typescript-eslint/typescript-eslint)) をインストールする必要があります。

```sh
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
# または
yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

それから ESLint の設定（`.eslintrc.js`）において、`@typescript-eslint` プラグインを追加し、`@typescript-eslint/parser` をデフォルトパーサーに指定するよう編集します。

最小限の設定は下記のようになります:

```js
module.exports = {
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error'
  }
}

```

最後に `package.json` 内に `lint` スクリプトを追加または編集します。

```json
"lint": "eslint --ext .ts,.js,.vue --ignore-path .gitignore ."
```

<div class="Alert Alert--gray">

**情報:** `--ignore-path` オプションを使って、`node_modules` や `.nuxt` あるいは Lint したくないどんなファイルもしくはディレクトリも ESLint の Lint 対象から除外できます。

</div>

これで `npm run lint`（または `yarn lint`）を実行することで TypeScript ファイルを Lint できるようになりました。
