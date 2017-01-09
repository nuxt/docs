---
title: Команды
description: Nuxt.js поставляется с набором полезных команд как для разрабатываемого, так и для финального продукта.
---

> Nuxt.js поставляется с набором полезных команд как для разрабатываемого, так и для финального продукта.

## Список команд

| Команда | Описание |
|---------|-------------|
| nuxt | Запустить сервер разработки [localhost:3000](http://localhost:3000) с горячей перезагрузкой (hot-reloading). |
| nuxt build | Собрать приложение Webpack'ом и минифицировать JS & CSS (для финальной версии). |
| nuxt start | Запустить сервер в продакшн-режиме (сперва необходимо запустить `nuxt build`). |
| nuxt generate | Собрать приложение и сгенерировать каждый маршрут в виде HTML файла (используется в случае статического хостинга). |


Вы должны добавить эти команды в файл `package.json`:

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate" "nuxt generate"
}
```

Затем вы можете выполнять команды с помощью `npm run <command>` (например: `npm run dev`).

## Продуктовая выкладка

Возможно, вы захотите развернуть приложение на сервере вместо запуска nuxt. Для этого команды сборки и запуска приложения выполняются раздельно друг от друга:

```bash
nuxt build
nuxt start
```

Например, чтобы развернуть с [now.sh](https://zeit.co/now), рекомендуется следующий вид `package.json`:
```json
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```

Затем запустите `now` и наслаждайтесь!

Заметка: вы рекомендует добавить `.nuxt` в `.npmignore` или `.gitignore`.

### Развёртывание с Heroku

Мы рекомендуем прочитать [документацию Heroku для node.js](https://devcenter.heroku.com/articles/nodejs-support).

Сперва вам нужно сказать Heroku установить `devDependencies` проекта (чтобы запускать `npm run build`):
```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
```

Затем мы говорим Heroku запустить `npm run build` через скрипт `postinstall` в нашем `package.json`:
```js
"scripts": {
  "dev": "nuxt",
  "postinstall": "nuxt build",
  "start": "nuxt start",
}
```

Наконец, мы можем запушить приложение в Heroku:
```bash
git push heroku master
```

## Развёртывание на статическом хостинге

Nuxt.js даёт вам возможность хостить ваше веб-приложение на любом статическом хостинге. Например,  [surge.sh](https://surge.sh/).

Чтобы развернуть на сервисе surge.sh, сперва нужно установить его:
```bash
npm install -g surge
```

Затем мы говорим nuxt.js сгенерировать наше веб-приложение:

```bash
npm run generate
```

Будет создана папка `dist` со всем необходимым и готовым к выкладке на статический хостинг.

Теперь мы можем выложить приложение на surge.sh:

```bash
surge dist/
```

Вуаля :)

Если у вас есть проект с [динамическими маршрутами](/guide/dynamic-routes), взгляните на [генерацию конфигурации](/api/configuration-generate), чтобы указать nuxt.js, как генерировать эти динамические маршруты.

<div class="Alert">В случае генерации веб-приложения через `nuxt generate`, [контекст](/api/pages-context), определённый для [data()](/guide/async-data#the-data-method) и [fetch()](/guide/vuex-store#the-fetch-method), не будет содержать `req` и `res`.</div>
