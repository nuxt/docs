---
title: Инструменты разработки
description: Nuxt.js помогает сделать разработку приятнее.
---

> Тестирование вашего приложения является частью веб-разработки. Nuxt.js помогает сделать тестирование проще, насколько это возможно.

## End-to-End тестирование

[AVA](https://github.com/avajs/ava) это мощная среда тестирования JavaScript, совмещенная с [jsdom](https://github.com/tmpvar/jsdom), чтобы мы могли просто выполнять end-to-end тесты.

Для начала нам нужно добавить AVA и jsdom как зависимости разработки:

```bash
npm install --save-dev ava jsdom
```

Затем, добавить скрипт test в ваш `package.json` и настроить AVA для компиляции файлов, которые мы импортируем в наших тестах.

```javascript
"scripts": {
  "test": "ava",
},
"ava": {
  "files": [
    "test/**/*"
  ]
}
```

Мы будем писать наши тесты в директории `test`:

```bash
mkdir test
```

Допустим, что у нас есть страница `pages/index.vue`:

```html
<template>
  <h1 class="red">Привет {{ name }}!</h1>
</template>

<script>
export default {
  data () {
    return { name: 'мир' }
  }
}
</script>

<style>
.red {
  color: red;
}
</style>
```

Когда мы запустим наше приложение `npm run dev` и откроем http://localhost:3000, мы увидим наш красный заголовок `Привет мир!`.

Добавим файл нашего теста `test/index.test.js`:

```js
import { resolve } from 'path'
import test from 'ava'
import { Nuxt, Builder } from 'nuxt'

// Инициализируем Nuxt.js и запустим его на localhost:4000
test.before('Init Nuxt.js', async (t) => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
  config.rootDir = rootDir // корневая директория проекта
  config.dev = false // продакшен сборка
  config.mode = 'universal' // Изоморфное приложение
  const nuxt = new Nuxt(config)
  t.context.nuxt = nuxt // Мы сохраняем ссылку на Nuxt, чтобы мы могли закрыть сервер в конце теста
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

// Пример тестирования сгенерированного HTML
test('Маршрут / существует и отрисовывает HTML', async (t) => {
  const { nuxt } = t.context
  const context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('<h1 class="red">Привет мир!</h1>'))
})

// Пример теста с проверкой DOM
test('Маршрут / существует и отрисовывает HTML с примененным CSS классом', async (t) => {
  const { nuxt } = t.context
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.red')
  t.not(element, null)
  t.is(element.textContent, 'Привет мир!')
  t.is(element.className, 'red')
  t.is(window.getComputedStyle(element).color, 'red')
})

// Закрытие сервера Nuxt
test.after('Closing server', (t) => {
  const { nuxt } = t.context
  nuxt.close()
})
```

Теперь мы можем запустить наши тесты:

```bash
npm test
```

jsdom имеет некоторые ограничения из-за того, что он не использует браузер. Тем не менее, он будет покрывать большинство наших тестов. Если вы хотите использовать браузер для тестирования вашего приложения, то вы можете использовать [Nightwatch.js](http://nightwatchjs.org).

## ESLint и Prettier

> [ESLint](http://eslint.org) отличный инструмент для поддержания чистоты вашего кода.

> [Prettier](https://prettier.io) это очень популярный инструмент для форматирования кода.

Вы легко можете добавить ESLint с Prettier с помощью Nuxt.js, для начала вам нужно добавить зависимости npm:

```bash
npm install --save-dev babel-eslint eslint eslint-config-prettier eslint-loader eslint-plugin-vue eslint-plugin-prettier prettier
```

Затем, вы можете настроить ESLint с помощью файла `.eslintrc.js` в корневой директории проекта:
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
    'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // рассмотрите возможность перехода на `plugin:vue/strongly-recommended` или `plugin:vue/recommended` для более строгих правил.
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  // требуется для линтинга файлов *.vue
  plugins: [
    'vue'
  ],
  // добавьте ваши правила
  rules: {
    'semi': [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', { 'semi': false }]
  }
}
```

Затем, вы можете добавить скрипты `lint` и `lintfix` в ваш `package.json`:

```js
"scripts": {
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
  "lintfix": "eslint --fix --ext .js,.vue --ignore-path .gitignore ."
}
```

Теперь можно запустить `lint` для проверки ошибок:

```bash
npm run lint
```

или `lintfix` для исправления того, что возможно

```bash
npm run lintfix
```

ESLint будет исправлять все ваши файлы JavaScript и Vue, игнорируя то, что указанно в вашем `.gitignore`.

Также рекомендуется включить режим горячей перезагрузки ESLint через webpack. Таким образом ESLint будет работать при сохранении во время `npm run dev`. Просто добавьте следующее в ваш `nuxt.config.js`:

```js
...
  /*
   ** Конфигурация сборки
  */
  build: {
   /*
    ** Здесь вы можете дополнить конфигурацию webpack
   */
   extend(config, ctx) {
      // Запуск ESLint при сохранении
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  }
```

<div class="Alert Alert--orange">

Одна из лучших практик это добавить скрипт `"precommit": "npm run lint"` в ваш package.json для автоматического линтинга перед коммитом вашего кода.

</div>
