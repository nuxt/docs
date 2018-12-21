---
title: Конфигурация BUILD
description: Nuxt.js позволяет конфигурировать опции webpack'а на ваше усмотрение.
---

# Build

> Nuxt.js позволяет конфигурировать опции webpack'а на ваше усмотрение.

## analyze

> Nuxt.js использует [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) для визуализации ваших пакетов и их оптимизации.

- Тип: `Boolean` или `Object`
- По-умолчанию: `false`

Все доступные опции для объекта [здесь](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin).

Пример (`nuxt.config.js`):

```js
export default {
  build: {
    analyze: true,
    // или
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<div class="Alert Alert--teal">

**Примечание:** вы можете использовать команду `nuxt build --analyze` или `nuxt build -a` для сборки своего приложения и запуска анализатора на [http://localhost:8888](http://localhost:8888).

</div>

## babel

> Конфигурация Babel для JavaScript и Vue файлов.

- Тип: `Object`
- По-умолчанию:

  ```js
  {
    presets: ['@nuxt/babel-preset-app']
  }
  ```

Пример (`nuxt.config.js`):

```js
export default {
  build: {
    babel: {
      presets: ['es2015', 'stage-0']
    }
  }
}
```

## build.vendor

> Nuxt.js позволяет добавлять модули в генерируемый файл `vendor.bundle.js`, чтобы уменьшить размер финального приложения. Это действительно полезно при использовании внешних модулей (например, `axios`).

Для добавления стороннего модуля/файла внутрь приложения, создайте параметр `build.vendor` внутри `nuxt.config.js`:

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

Вы можете также указать путь к файлу, например, к своей собственной библиотеке:
```js
module.exports = {
  build: {
    vendor: [
      'axios',
      '~plugins/my-lib.js'
    ]
  }
}
```
