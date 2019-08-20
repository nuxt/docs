---
title: Установка
description: Начать работу с Nuxt.js действительно очень легко. Простой проект требует лишь указания зависимости `nuxt`.
---

> Начать работу с Nuxt.js действительно очень легко. Простой проект требует лишь указания зависимости `nuxt`.

<div>
  <a href="https://vueschool.io/courses/nuxtjs-fundamentals/?friend=nuxt" target="_blank" class="Promote">
    <img src="/nuxt-fundamentals.png" srcset="/nuxt-fundamentals-2x.png 2x" alt="Основы Nuxt от vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Основы Nuxt.js</h4>
      <p class="Promote__Content__Description">Узнайте в видео, как быстро начать работу с Nuxt.js.</p>
      <p class="Promote__Content__Signature">Видео курсы созданы VueSchool для поддержки разработки на Nuxt.js.</p>
    </div>
  </a>
</div>

## Использование `create-nuxt-app`

Чтобы быстро начать работу, команда Nuxt.js создала инструмент [create-nuxt-app](https://github.com/nuxt/create-nuxt-app).

Убедитесь, что у вас установлен [npx](https://www.npmjs.com/package/npx) (`npx` поставляется по умолчания с NPM `5.2.0`)

```bash
$ npx create-nuxt-app <название-проекта>
```

Или с помощью [yarn](https://yarnpkg.com/ru/):

```bash
$ yarn create nuxt-app <название-проекта>
```

Он задаст вам несколько вопросов:

1. Выберите интегрированный серверный фреймворк:
  - None (сервер Nuxt по умолчанию)
  - [Express](https://github.com/expressjs/express)
  - [Koa](https://github.com/koajs/koa)
  - [Hapi](https://github.com/hapijs/hapi)
  - [Feathers](https://github.com/feathersjs/feathers)
  - [Micro](https://github.com/zeit/micro)
  - [Fastify](https://github.com/fastify/fastify)
  - [Adonis](https://github.com/adonisjs/adonis-framework) (WIP)
2. Выберите ваш любимый UI фреймворк:
  - None (добавить позже)
  - [Bootstrap](https://github.com/bootstrap-vue/bootstrap-vue)
  - [Vuetify](https://github.com/vuetifyjs/vuetify)
  - [Bulma](https://github.com/jgthms/bulma)
  - [Tailwind](https://github.com/tailwindcss/tailwindcss)
  - [Element UI](https://github.com/ElemeFE/element)
  - [Ant Design Vue](https://github.com/vueComponent/ant-design-vue)
  - [Buefy](https://buefy.github.io)
  - [iView](https://www.iviewui.com/)
  - [Tachyons](https://tachyons.io)
3. Выберите ваш любимый фреймворк для тестирования:
  - None (добавить позже)
  - [Jest](https://github.com/facebook/jest)
  - [AVA](https://github.com/avajs/ava)
4. [Nuxt мод, который вы хотите (`Universal` или `SPA`)](https://ru.nuxtjs.org/guide/#одностраничное-приложение-spa-)
5. Добавьте [модуль axios](https://github.com/nuxt-community/axios-module) для легкого создания HTTP запросов внутри вашего приложения.
6. Добавьте [EsLint](https://eslint.org/) для проверки вашего кода при сохранении.
7. Добавьте [Prettier](https://prettier.io/) форматирования вашего кода при сохранении.

Когда ответите, он установит все зависимости, поэтому следующим шагом будет переход к папке проекта и его запуск с помощью:

```bash
$ cd <название-проекта>
$ npm run dev
```

Теперь приложение работает на http://localhost:3000.

<div class="Alert">

Nuxt.js будет слушать изменения файлов внутри папки <code>pages</code>, поэтому нет необходимости перезапускать приложение при добавлении новых страниц.

</div>
  
Узнайте больше о структуре каталогов проекта: [Структура папок](/guide/directory-structure/).
  
## Приложение с нуля

Создание Nuxt.js приложения с нуля так же очень легко, для этого необходимы лишь *1 файл и 1 каталог*. Давайте создадим пустой каталог для начала работы над приложения:

```bash
$ mkdir <название-проекта>
$ cd <название-проекта>
```

<div class="Alert Alert--nuxt-green">

<b>Информация:</b> замените <code>&lt;название-проекта&gt;</nom-du-projet></code> на название проекта.

</div>

### Package.json

Проекту необходим файл `package.json` для указания того, как запускать `nuxt`;

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```

`scripts` запустят Nuxt.js через `npm run dev`.

### Установка`nuxt`

После того, как `package.json` был создан, добавьте `nuxt` в проект через npm:

```bash
$ npm install --save nuxt
```

### Каталог `pages`

Nuxt.js превратит каждый `*.vue` файл внутри каталога `pages` в маршрут для приложения.

Создайте каталог `pages`:

```bash
$ mkdir pages
```

затем создайте первую страницу в `pages/index.vue`:

```html
<template>
  <h1>Привет, Мир!</h1>
</template>
```

и запустите проект с помощью:

```bash
$ npm run dev
```

Теперь приложение работает на http://localhost:3000.

<div class="Alert">

Nuxt.js будет слушать изменения файлов внутри папки <code>pages</code>, поэтому нет необходимости перезапускать приложение при добавлении новых страниц.

</div>
  
Узнайте больше о структуре каталогов проекта: [Структура папок](/guide/directory-structure/).
