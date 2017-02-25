---
title: 開発ツール
description: Nuxt.js は開発がより楽しいものになるよう手助けします。
---

<!-- title: Development Tools -->
<!-- description: Nuxt.js helps you to make your web development enjoyable. -->

<!-- \> Testing your application is part of the web development. Nuxt.js helps you to make it as easy as possible. -->

> アプリケーションをテストすることはウェブ開発の一部です。Nuxt.js は可能な限り簡単にテストできるようにしています。

<!-- ## End-to-End Testing -->

## エンドツーエンドテスト

<!-- [Ava](https://github.com/avajs/ava) is a powerful JavaScript testing framework, mixed with [jsdom](https://github.com/tmpvar/jsdom), we can use them to do end-to-end testing easily. -->

[Ava](https://github.com/avajs/ava) は [jsdom](https://github.com/tmpvar/jsdom) と合わせて使うことができる、JavaScript のパワフルなテスティングフレームワークです。エンドツーエンドテストを簡単に行うためにこれらを使うことができます。

<!-- First, we need to add ava and jsdom as development dependencies: -->

まず ava と jsdom を開発依存パッケージに追加する必要があります:

```bash
npm install --save-dev ava jsdom
```

<!-- And add a test script to our `package.json`: -->

それから `package.json` に test というスクリプトを追加します:

```javascript
"scripts": {
  "test": "ava",
}
```

<!-- We are going to write our tests in the `test` folder: -->

`test` フォルダ内にテストを書いていくことにします:

```bash
mkdir test
```

<!-- Let's says we have a page in `pages/index.vue`: -->

`pages/index.vue` にページががあります:

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
export default {
  data () {
    return { name: 'world' }
  }
}
</script>

<style>
.red {
  color: red;
}
</style>
```

<!-- When we launch our app with `npm run dev` and open [http://localhost:3000](http://localhost:3000), we can see our red `Hello world!` title. -->

`npm run dev` でアプリケーションを起動し [http://localhost:3000](http://localhost:3000) を開いているとき、`Hello world!` というタイトルが表示されています。

<!-- We add our test file `test/index.test.js`: -->

`test/index.test.js` というテストファイルを追加します:

<!-- ```js -->
<!-- import test from 'ava' -->
<!-- import Nuxt from 'nuxt' -->
<!-- import { resolve } from 'path' -->

<!-- // We keep the nuxt and server instance -->
<!-- // So we can close them at the end of the test -->
<!-- let nuxt = null -->
<!-- let server = null -->

<!-- // Init Nuxt.js and create a server listening on localhost:4000 -->
<!-- test.before('Init Nuxt.js', async t => { -->
<!--   const rootDir = resolve(__dirname, '..') -->
<!--   let config = {} -->
<!--   try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {} -->
<!--   config.rootDir = rootDir // project folder -->
<!--   config.dev = false // production build -->
<!--   nuxt = new Nuxt(config) -->
<!--   await nuxt.build() -->
<!--   server = new nuxt.Server(nuxt) -->
<!--   server.listen(4000, 'localhost') -->
<!-- }) -->

<!-- // Example of testing only generated html -->
<!-- test('Route / exits and render HTML', async t => { -->
<!--   let context = {} -->
<!--   const { html } = await nuxt.renderRoute('/', context) -->
<!--   t.true(html.includes('<h1 class="red">Hello world!</h1>')) -->
<!-- }) -->

<!-- // Example of testing via dom checking -->
<!-- test('Route / exits and render HTML with CSS applied', async t => { -->
<!--   const window = await nuxt.renderAndGetWindow('http://localhost:4000/') -->
<!--   const element = window.document.querySelector('.red') -->
<!--   t.not(element, null) -->
<!--   t.is(element.textContent, 'Hello world!') -->
<!--   t.is(element.className, 'red') -->
<!--   t.is(window.getComputedStyle(element).color, 'red') -->
<!-- }) -->

<!-- // Close server and ask nuxt to stop listening to file changes -->
<!-- test.after('Closing server and nuxt.js', t => { -->
<!--   server.close() -->
<!--   nuxt.close() -->
<!-- }) -->
<!-- ``` -->

```js
import test from 'ava'
import Nuxt from 'nuxt'
import { resolve } from 'path'

// nuxt と server インスタンスを保持します
// そうすればテスト終了時にそれらをクローズできます
let nuxt = null
let server = null

// Nuxt.js を初期化し localhost:4000 でリスニングするサーバーを作成します
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  nuxt = new Nuxt(config)
  await nuxt.build()
  server = new nuxt.Server(nuxt)
  server.listen(4000, 'localhost')
})

// 生成された HTML のみをテストする例
test('Route / exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('<h1 class="red">Hello world!</h1>'))
})

// DOM を経由してチェックするテストの例
test('Route / exits and render HTML with CSS applied', async t => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.red')
  t.not(element, null)
  t.is(element.textContent, 'Hello world!')
  t.is(element.className, 'red')
  t.is(window.getComputedStyle(element).color, 'red')
})

// サーバーを閉じて nuxt にファイル更新のリスニングを中止させる
test.after('Closing server and nuxt.js', t => {
  server.close()
  nuxt.close()
})
```

<!-- We can now launch our tests: -->

テストを実行できるようになっています:

```bash
npm test
```

<!-- jsdom has some limitations because it does not use a browser. However, it will cover most of our tests. If you want to use a browser to test your application, you might want to check out [Nightwatch.js](http://nightwatchjs.org). -->

jsdom はブラウザを使っていないため制約がいくつかありますが、ほとんどのテストはカバーできます。もしアプリケーションをテストするためにブラウザを使いたいときは [Nightwatch.js](http://nightwatchjs.org) を調べるとよいかもしれません。

## ESLint

<!-- \> ESLint is a great tool to keep your code clean -->

> ESLint はコードを綺麗に保てるすごいツールです。

<!-- You can add [ESLint](http://eslint.org) pretty easily with nuxt.js, first, you need to add the npm dependencies: -->

とても簡単に [ESLint](http://eslint.org) を Nuxt.js と一緒に使うことができます。まず npm の依存パッケージを追加する必要があります:

```bash
npm install --save-dev babel-eslint eslint eslint-config-standard eslint-plugin-html eslint-plugin-promise eslint-plugin-standard
```

<!-- Then, you can configure ESLint via a `.eslintrc.js` file in your root project directory: -->

それから `.eslintrc.js` ファイルをプロジェクトのルートディレクトに置いて ESLint を設定できます:

<!-- ```js -->
<!-- module.exports = { -->
<!--   root: true, -->
<!--   parser: 'babel-eslint', -->
<!--   env: { -->
<!--     browser: true, -->
<!--     node: true -->
<!--   }, -->
<!--   extends: 'standard', -->
<!--   // required to lint *.vue files -->
<!--   plugins: [ -->
<!--     'html' -->
<!--   ], -->
<!--   // add your custom rules here -->
<!--   rules: {}, -->
<!--   globals: {} -->
<!-- } -->
<!-- ``` -->

```js
module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // *.vue ファイルを lint するために必要
  plugins: [
    'html'
  ],
  // ここにカスタムルールを追加します
  rules: {},
  globals: {}
}
```

<!-- Then, you can add a `lint` script in your `package.json`: -->

それから `lint` スクリプトを `package.json` 内に追加できます:

```js
"scripts": {
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore ."
}
```

<!-- You can now launch: -->

lint を実行できます:

```bash
npm run lint
```

<!-- ESLint will lint every of your JavaScript and Vue files while ignoring your ignored files defined in your `.gitignore`. -->

ESLint は `.gitignore` に定義されたファイルを無視しつつ、それ以外のすべての JavaScript と Vue ファイルを lint します。

<!-- <p class="Alert Alert--info">One best practice is to add also `"precommit": "npm run lint"` in your package.json to lint your code automatically before commiting your code.</p> -->

<p class="Alert Alert--info">`"precommit": "npm run lint"` を package.json に追加してコードをコミットする前に自動的に lint するのはベストプラクティスのひとつです。</p>
