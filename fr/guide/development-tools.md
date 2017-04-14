---
title: Outils de développement
description: Nuxt.js rend votre développement web agréable.
---

> Le test de votre application fait partie du développement web. Nuxt.js vous aide à le rendre aussi facile que possible.

## Tests End-to-End

[Ava](https://github.com/avajs/ava) est un framework JavaScript de test puissant, mixé avec [jsdom](https://github.com/tmpvar/jsdom), nous pouvons les utiliser pour écrire des tests end-to-end testing facilement.

Tout d'abord, nous devons ajouter ava et jsdom en tant que dépendances de développement:
```bash
npm install --save-dev ava jsdom
```

Et ajouter un script de test à notre `package.json` et configurer ava pour compiler les fichiers que nous importons dans nos tests.

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

Nous allons écrire nos tests dans le répertoire `test`:
```bash
mkdir test
```

Mettons que nous avons une page dans `pages/index.vue`:
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

Lorsque nous lançons notre application avec `npm run dev` et que nous visitons [http://localhost:3000](http://localhost:3000), nous voyons notre titre `Hello world!` rouge.

Nous ajoutons notre fichier de test `test/index.test.js`:

```js
import test from 'ava'
import Nuxt from 'nuxt'
import { resolve } from 'path'

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null
let server = null

// Init Nuxt.js and create a server listening on localhost:4000
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
  server.close()
  nuxt.close()
})
```

Nous pouvons désormais lancer nos tests:
```bash
npm test
```

jsdom a certaines limitations parce qu'il n'utilise pas de navigateur. Cependant, cela couvrira la plupart de nos tests. Si vous souhaitez utiliser un navigateur pour tester votre application, vous pouvez consulter [Nightwatch.js] (http://nightwatchjs.org).

## ESLint

> ESLint est un excellent outil pour garder votre code propre

Vous pouvez ajouter [ESLint](http://eslint.org) assez facilement avec nuxt.js. Ajouter les dépendances npm:

```bash
npm install --save-dev babel-eslint eslint eslint-config-standard eslint-plugin-html eslint-plugin-promise eslint-plugin-standard
```

Puis, configurez ESLint via un fichier `.eslintrc.js` à la racine de votre projet:
```js
module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {},
  globals: {}
}
```

Ensuite, vous pouvez ajouter un script `lint` à `package.json`:

```js
"scripts": {
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore ."
}
```

Vous pouvez alors lancer:
```bash
npm run lint
```

ESLint va linter tous vos fichiers JavaScript et Vue sauf ceux ignorés par `.gitignore`.

<p class="Alert Alert--info">Une bonne pratique est également d'ajouter `"precommit": "npm run lint"` dans package.json afin de linter votre code automatiquement avant de le commiter.</p>
