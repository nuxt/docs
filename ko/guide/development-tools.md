---
title: 개발 툴
description: Nuxt.js는 개발을 보다 재미있게 할 수 있도록 도와줍니다.
---

<!-- title: Development Tools -->
<!-- description: Nuxt.js helps you to make your web development enjoyable. -->

<!-- \> Testing your application is part of the web development. Nuxt.js helps you to make it as easy as possible. -->

> 어플리케이션을 테스트하는 것은 웹개발의 일부분입니다. Nuxt.js는 가능한한 간단하게 테스트가 가능하도록 도와줍니다.

<!-- ## End-to-End Testing -->

## 엔드 투 엔드 테스트

<!-- [Ava](https://github.com/avajs/ava) is a powerful JavaScript testing framework, mixed with [jsdom](https://github.com/tmpvar/jsdom), we can use them to do end-to-end testing easily. -->

[Ava](https://github.com/avajs/ava)는 [jsdom](https://github.com/tmpvar/jsdom)과 같이 사용할 수 있는 JavaScript의 강력한 테스트 프레임워크입니다. 엔드 투 엔드 테스트를 쉽게 하기 위해서 이 두가지를 사용합니다.

<!-- First, we need to add ava and jsdom as development dependencies: -->

우선은, ava와 jsdom을 개발디펜던시에 추가해야 합니다.

```bash
npm install --save-dev ava jsdom
```

<!-- And add a test script to our `package.json` and configure ava to compile files that we import into our tests. -->

그리고 `package.json` 에 test 스크립트를 추가하고 테스트를 import할 파일을 컴파일 하기 위해 ava를 설정합니다.

```javascript
"scripts": {
  "test": "ava",
},
"ava": {
  "require": [
    "babel-register"
  ]
},
"babel": {
  "presets": [
    "es2015"
  ]
}
```

<!-- We are going to write our tests in the `test` folder: -->

`test` 폴더 안에 테스트를 작성해 나가는 걸로 하겠습니다.

```bash
mkdir test
```

<!-- Let's says we have a page in `pages/index.vue`: -->

`pages/index.vue` 에 페이지가 있습니다. 

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

`npm run dev` 로 어플리케이션을 기동하고 [http://localhost:3000](http://localhost:3000) 으로 접근하면 `Hello world!` 타이틀이 표시가 됩니다.

<!-- We add our test file `test/index.test.js`: -->

`test/index.test.js` 테스트 화일을 추가합니다.

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

// nuxt 와 server 인스턴스를 여기에 확보해둡니다
// 그러면 테스트가 종료하였을 때 이것들을 close할 수 있습니다.
let nuxt = null
let server = null

// Nuxt.js 를 초기화하고 localhost:4000 에서 리스닝하는 서버를 작성합니다.
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

// 생성된 HTML 만을 테스트하는 예제
test('Route / exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('<h1 class="red">Hello world!</h1>'))
})

// DOM 을 경유하여 체크하는 테스트 예제
test('Route / exits and render HTML with CSS applied', async t => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.red')
  t.not(element, null)
  t.is(element.textContent, 'Hello world!')
  t.is(element.className, 'red')
  t.is(window.getComputedStyle(element).color, 'red')
})

// 서버를 닫고 nuxt 에 파일갱신 리스닝을 중지시킨다
test.after('Closing server and nuxt.js', t => {
  server.close()
  nuxt.close()
})
```

<!-- We can now launch our tests: -->

이제 테스트를 실행할 수 있게 되었습니다.

```bash
npm test
```

<!-- jsdom has some limitations because it does not use a browser. However, it will cover most of our tests. If you want to use a browser to test your application, you might want to check out [Nightwatch.js](http://nightwatchjs.org). -->

jsdom 은 브라우저를 사용하지 않기 때문에 제약점이 몇가지 있지만, 대부분의 테스트는 커버할 수 있습니다. 혹시 어플리케이션을 테스트하기 위해서 브라우저를 사용하고 싶을 경우에는 [Nightwatch.js](http://nightwatchjs.org) 를 체크해 보시면 될 것 같습니다.

## ESLint

<!-- \> ESLint is a great tool to keep your code clean -->

> ESLint 는 깔끔한 코드를 유지할 수 있도록 해주는 멋진 툴입니다.

<!-- You can add [ESLint](http://eslint.org) pretty easily with nuxt.js, first, you need to add the npm dependencies: -->

매우 간단하게 [ESLint](http://eslint.org) 를 Nuxt.js 와 같이 사용할 수 있습니다. 우선 npm 디펜던시를 추가해야 합니다.

```bash
npm install --save-dev babel-eslint eslint eslint-config-standard eslint-plugin-html eslint-plugin-promise eslint-plugin-standard
```

<!-- Then, you can configure ESLint via a `.eslintrc.js` file in your root project directory: -->

그리고 `.eslintrc.js` 파일을 프로젝트의 루트 디렉토리에 두고 ESLint 를 설정합니다.

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
  // *.vue 파일을 lint 하기위해서 필요함
  plugins: [
    'html'
  ],
  // 여기에 커스텀룰을 추가합니다.
  rules: {},
  globals: {}
}
```

<!-- Then, you can add a `lint` script in your `package.json`: -->

그리고나서 `lint` 스크립트를 `package.json` 안에 추가합니다.

```js
"scripts": {
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore ."
}
```

<!-- You can now launch: -->

이제 lint 를 실행할 수 있습니다.

```bash
npm run lint
```

<!-- ESLint will lint every of your JavaScript and Vue files while ignoring your ignored files defined in your `.gitignore`. -->

ESLint 는 `.gitignore` 에 정의되어 있는 파일을 무시하고, 그 외의 모든 JavaScript 와 Vue 파일을 lint 합니다.

<!-- <p class="Alert Alert--info">One best practice is to add also `"precommit": "npm run lint"` in your package.json to lint your code automatically before commiting your code.</p> -->

<p class="Alert Alert--info">`"precommit": "npm run lint"` 를 package.json 에 추가하여 코드를 커밋하기 전에 자동적으로 lint 가 돌도록 하는 것은 아주 좋은 예 일것 같습니다.</p>
