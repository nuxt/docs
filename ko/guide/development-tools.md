---
title: 개발 툴
description: Nuxt.js는 개발을 보다 재미있게 할 수 있도록 도와줍니다.
---

## End-To-End 테스트

[Ava](https://github.com/avajs/ava)는 [jsdom](https://github.com/tmpvar/jsdom)과 같이 사용할 수 있는 JavaScript의 강력한 테스트 프레임워크입니다. 엔드 투 엔드 테스트를 쉽게 하기 위해서 이 두가지를 사용합니다.

우선은, ava와 jsdom을 개발디펜던시에 추가해야 합니다.

```bash
npm install --save-dev ava jsdom
```

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

`test` 폴더 안에 테스트를 작성해 나가는 걸로 하겠습니다:

```bash
mkdir test
```

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

`test/index.test.js` 테스트 파일을 추가합니다:

```js
import test from 'ava'
import Nuxt from 'nuxt'
import { resolve } from 'path'

// nuxt 와 server 인스턴스를 여기에 확보해둡니다.
// 그러면 테스트가 종료되었을 때 이것들을 close할 수 있습니다.
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

이제 테스트를 실행할 수 있게 되었습니다:

```bash
npm test
```

jsdom 은 브라우저를 사용하지 않기 때문에 제약점이 몇가지 있지만, 대부분의 테스트는 커버할 수 있습니다. 혹시 어플리케이션을 테스트하기 위해서 브라우저를 사용하고 싶을 경우에는 [Nightwatch.js](http://nightwatchjs.org) 를 체크해 보시면 될 것 같습니다.

## ESLint

> ESLint 는 깔끔한 코드를 유지할 수 있도록 해주는 멋진 툴입니다.

매우 간단하게 [ESLint](http://eslint.org) 를 Nuxt.js 와 같이 사용할 수 있습니다. 우선 npm 디펜던시를 추가해야 합니다:

```bash
npm install --save-dev babel-eslint eslint eslint-config-standard eslint-plugin-html eslint-plugin-promise eslint-plugin-standard
```

그리고 `.eslintrc.js` 파일을 프로젝트의 루트 디렉토리에 두고 ESLint를 설정합니다:

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

그리고나서 `lint` 스크립트를 `package.json` 안에 추가합니다:

```js
"scripts": {
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore ."
}
```

이제 lint 를 실행할 수 있습니다:

```bash
npm run lint
```

ESLint 는 `.gitignore` 에 정의되어 있는 파일을 무시하고, 그 외의 모든 JavaScript 와 Vue 파일을 lint 합니다。

<p class="Alert Alert--info">`"precommit": "npm run lint"` 를 package.json 에 추가하여 코드를 커밋하기 전에 자동적으로 lint 가 돌도록 하는 것은 아주 좋은 예일것 같습니다.</p>
