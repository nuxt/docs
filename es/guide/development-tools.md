---
title: Development Tools
description: Nuxt.js helps you to make your web development enjoyable.
---

> Testing your application is part of the web development. Nuxt.js helps you to make it as easy as possible.

## End-to-End Testing

[Ava](https://github.com/avajs/ava) is a powerful JavaScript testing framework, mixed with [jsdom](https://github.com/tmpvar/jsdom), we can use them to do end-to-end testing easily.

First, we need to add ava and jsdom as development dependencies:
```bash
npm install --save-dev ava jsdom
```

And add a test script to our `package.json` and configure ava to compile files that we import into our tests.

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

We are going to write our tests in the `test` folder:
```bash
mkdir test
```

Let's says we have a page in `pages/index.vue`:
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

When we launch our app with `npm run dev` and open [http://localhost:3000](http://localhost:3000), we can see our red `Hello world!` title.

We add our test file `test/index.test.js`:

```js
import test from 'ava'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null

// Init Nuxt.js and create a server listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

// Example of testing only generated html
test('Route / exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('<h1 class="red">Hello world!</h1>'))
})

// Example of testing via dom checking
test('Route / exits and render HTML with CSS applied', async t => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.red')
  t.not(element, null)
  t.is(element.textContent, 'Hello world!')
  t.is(element.className, 'red')
  t.is(window.getComputedStyle(element).color, 'red')
})

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js', t => {
  nuxt.close()
})
```

We can now launch our tests:
```bash
npm test
```

jsdom has some limitations because it does not use a browser. However, it will cover most of our tests. If you want to use a browser to test your application, you might want to check out [Nightwatch.js](http://nightwatchjs.org).

## ESLint && Prettier

> [ESLint](http://eslint.org) is a great tool to keep your code clean

> [Prettier](prettier.io) is a very popular code formatter 

You can add ESLint with Prettier pretty easily with nuxt.js, first, you need to add the npm dependencies:

```bash
npm install --save-dev babel-eslint eslint eslint-config-prettier eslint-loader eslint-plugin-vue eslint-plugin-prettier prettier
```

Then, you can configure ESLint via a `.eslintrc.js` file in your root project directory:
```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "eslint:recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/recommended",
    "plugin:prettier/recommended"
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "semi": [2, "never"],
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "prettier/prettier": ["error", { "semi": false }]
  }
}
```

Then, you can add a `lint` and`lintfix` scripts in your `package.json`:

```js
"scripts": {
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
  "lintfix": "eslint --fix --ext .js,.vue --ignore-path .gitignore ."
}
```

You can now launch `lint` to just check for errors:
```bash
npm run lint
```
or `lintfix` to also fix those which are doable
```bash
npm run lintfix
```

ESLint will lint every of your JavaScript and Vue files while ignoring your ignored files defined in your `.gitignore`.

<p class="Alert Alert--info">One best practice is to add also `"precommit": "npm run lint"` in your package.json to lint your code automatically before commiting your code.</p>
