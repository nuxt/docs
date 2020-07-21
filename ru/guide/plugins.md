---
title: Плагины
description: Nuxt.js позволяет вам задавать JavaScript-плагины, которые будут запущены перед созданием корневого приложения Vue.js. Это может быть особенно полезно при работе с библиотеками для Vue, внешними модулями или вашими плагинами.
---

> Nuxt.js позволяет вам задавать JavaScript-плагины, которые будут запущены перед созданием корневого приложения Vue.js. Это может быть особенно полезно при работе с библиотеками для Vue, внешними модулями или вашими плагинами.

<div class="Alert">

Важно знать, что в [жизненном цикле](https://ru.vuejs.org/v2/guide/instance.html#%D0%A5%D1%83%D0%BA%D0%B8-%D0%B6%D0%B8%D0%B7%D0%BD%D0%B5%D0%BD%D0%BD%D0%BE%D0%B3%D0%BE-%D1%86%D0%B8%D0%BA%D0%BB%D0%B0-%D1%8D%D0%BA%D0%B7%D0%B5%D0%BC%D0%BF%D0%BB%D1%8F%D1%80%D0%B0) экземпляра Vue только хуки `beforeCreate` и `created` вызываются **как на сервере, так и на клиенте**. Все остальные хуки вызываются только на клиенте.

</div>

## Внешние пакеты

Использование внешних пакетов или модулей в приложении может понадобиться для совершения HTTP-запросов как на сервере, так и на клиенте (отличным примером будет библиотека [axios](https://github.com/mzabriskie/axios)).

Для начала установим библиотеку с помощью npm:

```bash
npm install --save axios
```

После чего мы можем использовать её напрямую в компонентах страниц:

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
</script>
```

## Плагины для Vue

При использовании плагинов для Vue, как, например, [v-tooltip](https://akryum.github.io/v-tooltip) для отображения подсказок в приложении, может потребоваться инициализировать плагин перед запуском приложения.
Для начала установим библиотеку с помощью npm:
```bash
npm install --save v-tooltip
```
Затем создаём файл `plugins/vue-tooltips.js`:

```js
import Vue from 'vue'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
```

Затем добавляем путь файла к ключу `plugins` в файле настроек `nuxt.config.js`:

```js
export default {
  plugins: ['@/plugins/vue-tooltip.js']
}
```

Чтобы узнать больше о конфигурационном ключе `plugins`, посмотрите документацию по [plugins api](/api/configuration-plugins).

### Плагины ES6

Если плагин располагается в папке `node_modules` и экспортирует модуль ES6, то, возможно, вам понадобиться добавить его в опцию сборки `transpile`:

```js
module.exports = {
  build: {
    transpile: ['vue-notifications']
  }
}
```
Обращайтесь к документации по [конфигурации build](/api/configuration-build/#transpile) для информации о настройках сборки.

## Инъекция $root & context

Иногда вам может потребоваться сделать какие-то функции или значения доступными во всём приложении. Вы можете добавить эти переменные в экземпляр Vue (на клиентской стороне), в контекст (на серверной стороне) и даже в хранилище Vuex. Действует соглашение: начинать подобные функции с `$`.

Nuxt.js предоставляет вам метод `inject(key, value)` для легкого добавления переменных. Этот метод передаётся в качестве второго аргумента, если вы экспортируете функцию при создании плагина. Префикс `$` будет добавлен автоматически к переданному ключу.

`plugins/hello.js`:

```js
export default (context, inject) => {
  const hello = (msg) => console.log(`Hello ${msg}!`)
  // Добавляет $hello(msg) в экземпляр Vue, контекст и хранилище.
  inject('hello', hello)
  // Для Nuxt версий <= 2.12 также добавьте 👇
  context.$hello = hello
}
```

`nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/hello.js']
}
```

Теперь функция `$hello(msg)` может быть использована через `context`, через `this` в экземплярах Vue, и через `this` в `actions`/`mutations` хранилища.

`example-component.vue`:

```js
export default {
  mounted () {
    this.$hello('mounted')
    // Выведет в консоль 'Hello mounted!'
  },
  asyncData ({ $hello }) {
    $hello('asyncData')
  }
}
```

`store/index.js`:

```js
export const state = () => ({
  someValue: ''
})

export const mutations = {
  changeSomeValue (state, newValue) {
    this.$hello('store mutation')
    state.someValue = newValue
  }
}

export const actions = {
  setSomeValueToWhatever ({ commit }) {
    this.$hello('store action')
    const newValue = 'whatever'
    commit('changeSomeValue', newValue)
  }
}
```

## Исполнение только на клиентской или серверной стороне

<div class="Alert">

Внимание, не используйте плагины Vue в экспортированных функциях. Если ваш файл экспортирует функцию, то она будет вызвана перед каждым запросом, поэтому вызовы `Vue.use(...)`, `Vue.mixin(...)`, `Vue.component(...)` сломают ваше приложение после определенного количества запросов.

</div>

Некоторые плагины работают **только в браузере**, так как у них нет поддержки SSR.

### Соглашение об именовании плагинов

Если плагин планируется запускать только на клиенте или на сервере, то к названию файла могут быть добавлены суффиксы `.client.js` или `.server.js`, и файл автоматически будет запускаться только на нужной стороне.

Пример:

`nuxt.config.js`:

```js
export default {
  plugins: [
    '~/plugins/foo.client.js', // отработает только на клиенте
    '~/plugins/bar.server.js', // отработает только на сервере
    '~/plugins/baz.js' // отработает и на клиенте, и на сервере
  ]
}
```

### Объектный синтаксис

Вы так же можете использовать объектный синтаксис с указанием свойства `mode` (`'client'` или `'server'`) в конфигурации `plugins`.

Пример:

`nuxt.config.js`:

```js
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' }, // отработает только на клиенте
    { src: '~/plugins/server-only.js', mode: 'server' } // отработает только на сервере
  ]
}
```

### Использование флагов процесса

В случае если вам нужно импортировать какие-то библиотеки в плагине только на серверной стороне, то вы можете проверить, что флаг `process.server` установлен в `true`.

Также, если вам нужно знать, находитесь ли вы внутри статичного приложения (создаваемого `nuxt generate` или `nuxt export`), то в таком случае флаг `process.static` будет установлен в `true`. Этот флаг будет установлен только во время и после генерации.

Вы также можете совместить обе опции, чтобы попасть в момент, когда страница создается на сервере с помощью `nuxt build && nuxt export` или `nuxt generate`, но ещё не сохранена (`process.static && process.server`).
