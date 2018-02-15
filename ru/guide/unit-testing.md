---
title: Модульное тестирование (Unit Testing)
description: Тестирование вашего приложения — неотъемлемая часть веб-разработки. Nuxt.js поможет вам сделать этот процесс как можно проще.
---

> Тестирование вашего приложения — неотъемлемая часть веб-разработки. Nuxt.js поможет вам сделать этот процесс как можно проще.

## Тестирование вашего приложения

[Ava](https://github.com/avajs/ava) — мощный JavaScript-фреймворк для тестирования, совмещённый с [jsdom](https://github.com/tmpvar/jsdom). Мы можем запросто использовать их для end-to-end тестирования.

Сперва нам нужно добавить ava и jsdom в виде зависимостей:
```bash
npm install --save-dev ava jsdom
```

И добавить команду в `package.json`:

```javascript
"scripts": {
  "test": "ava",
}
```

Мы собираемся писать наши тесты в папке `test`:
```bash
mkdir test
```

Предположим, у нас есть страница `pages/index.vue`:
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

Когда мы запускаем наше приложение с `npm run dev` и открываем [http://localhost:3000](http://localhost:3000), то мы видим красный заголовок `Hello world!`.

Добавим наш файл с тестом `test/index.test.js`:

```js
import test from 'ava'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'

// Сохраним экземпляры nuxt и server.
// Мы сможем сбросить их в конце теста.
let nuxt = null

// Инициализируем Nuxt.js и создадим сервер по адресу localhost:4000
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
  config.rootDir = rootDir // папка проекта
  config.dev = false // финальная сборка
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

// Пример генерации html-кода только для этого теста
test('Route / exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('<h1 class="red">Hello world!</h1>'))
})

// Пример тестирования с помощью проверки DOM
test('Route / exits and render HTML with CSS applied', async t => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.red')
  t.not(element, null)
  t.is(element.textContent, 'Hello world!')
  t.is(element.className, 'red')
  t.is(window.getComputedStyle(element).color, 'red')
})

// Остановить сервер и попросить nuxt не отслеживать изменения файлов
test.after('Closing server and nuxt.js', t => {
  nuxt.close()
})
```

Теперь мы можем запустить наши тесты:
```bash
npm test
```

Вообще, у jsdom имеются некоторые ограничения, поэтому что он не использует какой-либо браузер. Но этого достаточно для большинства тестов. Если вы хотите использовать браузер для тестирования вашего приложения, то посмотрите в сторону [Nightwatch.js](http://nightwatchjs.org).
