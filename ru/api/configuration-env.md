---
title: "API: Свойство env"
description: Использование переменных среды на сервере и клиенте.
---

# Свойство env

- Тип: `Object`

> Nuxt.js позволяет создавать переменные среды, доступные и на клиенте, и на сервере

Пример (`nuxt.config.js`):

```js
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

В объект env помещается свойство `baseUrl`, которое хранит либо значение переменной среды `BASE_URL` (если оно существует), либо `http://localhost:3000`.

Теперь обратиться к переменной `baseUrl` можно двумя способами:

1. На сервере, с помощью объекта process: `process.env.baseUrl`
2. На клиенте, с помощью объекта context: `context.env.baseUrl`. Читайте [API Context](/api/context)


Свойство `env` можно использовать, например, для выдачи публичного токена.
А еще переменные среды можно использовать для конфигурации плагинов, например [axios](https://github.com/mzabriskie/axios).

`plugins/axios.js`:
```js
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

Затем просто импортируйте плагин: `import axios from '~/plugins/axios'`


## Автоматическое внедрение переменных среды

Если вы определяете переменные среды через `NUXT_ENV_` в момент сборки (Например, `NUXT_ENV_COOL_WORD=freezing nuxt build`), они будут автоматически внедрены в объект env.  Имейте ввиду, что объявленные таким образом переменные будут иметь больший приоритет, чем переменные с таким же именем из nuxt.config.js


## process.env == {}

Nuxt  использует `definePlugin` из webpack для объявления переменных среды. Это значит, что `process` или `process.env` из Node недоступен и не определен. Каждое свойство env определено в nuxt.config.js и сопоставляется с process.env.xxx.

Это значит, что  `console.log(process.env)`  выведет `{}`, но `console.log(process.env.you_var)`  будет выводить заданное в nuxt.config.js значение. Если вы зададите `env.test = 'testing123'` и обратитесь к нему через `process.env.test`, то на самом деле оно будет переведено в  'testing123'.



До
```
if (process.env.test == 'testing123')
```

После
```
if ('testing123' == 'testing123')
```

