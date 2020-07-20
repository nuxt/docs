---
title: Конфигурация времени исполнения
description: Runtime конфигурация позволяет передавать динамическую конфигурацию и переменные среды в контекст nuxt
---

Nuxt.js поддерживает конфигурацию [env](/api/configuration-env) для обеспечения конфигурации через `process.env`. Это делается с помощью плагина вебпака [DefinePlugin](https://webpack.js.org/plugins/define-plugin/).

У этого подхода было два недостатка:
- Значения читаются во время сборки и сохраняются в webpack бандл. Поэтому для изменения в `process.env` нам нужно пересобрать бандл, что противоречит принципам [12-факторных приложений](https://12factor.net/) 
- Это может легко ввести в заблуждение и подвергнуть опасности "секретные ключи" клиентского бандла 


См больше почему мы [переходим от @nuxtjs/dotenv к runtime конфигурации](/blog/moving-from-nuxtjs-dotenv-to-runtime-config).

### Конфигурация времени исполнения (2.13+)

Две новые опции добавлены в `nuxt.config`, чтобы разрешить передачу runtime конфигурации, которая затем доступна через контекст `$config`.

Конфигурация добавляется в полезную нагрузку Nuxt (`__NUXT__.config`) поэтому нет необходимости перестраивать для обновления runtime конфигурации. SSR, SPA, и Static targets поддерживаются, за исключением того, что для static targets необходимо перегенерирование.

```js
export default {
  publicRuntimeConfig: {},
  privateRuntimeConfig: {}
}
```

- `publicRuntimeConfig` доступно с помощью `$config` как на сервере, так и на клиенте.
- `privateRuntimeConfig` **доступно только на сервере** используя тот же `$config` (он переопределяет `publicRuntimeConfig`)

### Использование

`$config` доступен в любом месте из контекста (включая страницы, хранилища и плагины)

```js
export default {
  asyncData ({ $config: { baseURL } }) {
    fetch(`${baseURL}/test`)
  },
  mounted() {
    console.log(this.$config.testValue)
  }
}
```

### Поддержка `.env`

Если в корневой директории вашего проекта есть файл `.env`, он будет автоматически загружен с помощью [dotenv](https://github.com/motdotla/dotenv) и доступен через `process.env`.

`process.env` обновлен, поэтому мы можем использовать его прямо внутри `nuxt.config` для конфигурации runtime. Значения интерполируются и расширяются с помощью улучшенной версии [dotenv-expand](https://github.com/motdotla/dotenv-expand).

Файл `.env` также просматривается для перезагрузки во время `nuxt dev`. Вы можете настроить путь env с помощью `--dotenv <file>` или отключив с помощью `--dotenv false`.

### Поддержка Интерполяции/Расширения

> Поддерживается как для dotenv так и runtime конфигураций.

Развертывание для конфигурации во время выполнения происходит только в том случае, если ключ уже существует (см пример `API_SECRET`).

Интерполяция позволяет легко вкладывать env vars (см пример `baseURL`). 
`.env`:

```config
BASE_URL=/api
PUBLIC_URL=https://nuxtjs.org
API_SECRET=1234
```

`nuxt.config.js`:

```js
export default {
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL
  },
  privateRuntimeConfig: {
    baseURL: '${PUBLIC_URL}${BASE_URL}',
    API_SECRET: '${API_SECRET}' // similar to using process.env.API_SECRET
  },
}
```

Обратите внимание, что можно использовать `publicRuntimeConfig` и `privateRuntimeConfig` как функцию, но это не рекомендуется.
