---
title: Установка
description: Начать работу с Nuxt.js очень просто. Простой проект требует наличия лишь одной зависимости: `nuxt`.
---

> Начать работу с Nuxt.js очень просто. Простой проект требует наличия лишь одной зависимости: `nuxt`.

## Использование `create-nuxt-app`

Чтобы быстро начать, команда Nuxt.js создала инструмент [create-nuxt-app](https://github.com/nuxt/create-nuxt-app).

Убедитесь, что у вас установлен [npx](https://www.npmjs.com/package/npx) (`npx` поставляется по умолчанию с версии NPM `5.2.0`)

```bash
$ npx create-nuxt-app <project-name>
```

Или с [yarn](https://yarnpkg.com/en/):

```bash
$ yarn create nuxt-app <project-name>
```

Установщик Nuxt задаст вам несколько вопросов (name, Nuxt options, UI framework, TypeScript, linter, testing framework и т.д.), после этого он установит все зависимости. Следующий шаг - необходимо перейти в папку проекта и запустить его:

```bash
$ cd <project-name>
$ npm run dev
```

Приложение теперь работает на http://localhost:3000.

<div class="Alert">
Nuxt.js будет отслеживать изменения файлов внутри каталога страниц `pages`, поэтому нет необходимости перезапускать приложение при добавлении новых страниц.
</div>

Узнать больше о структуре каталогов проекта: [Документация. Структура папок](https://ru.nuxtjs.org/guide/directory-structure/).

## Создание с нуля

Создать проект Nuxt.js с нуля очень просто, требуется всего 1 файл и 1 каталог. Создайте пустой каталог:

```bash
$ mkdir <project-name>
$ cd <project-name>
```

<div class="Alert Alert--nuxt-green">
<b>Информация:</b> замените <code>&lt;project-name&gt;</nom-du-projet></code> на имя вашего проекта.
</div>

### package.json

Для запуска `nuxt` каждый проект нуждается в файле `package.json`. Скопируйте этот **json** в ваш **package.json** и сохраните его. После этого запустите `npm install`:

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```

`scripts` запустит Nuxt.js командой `npm run dev`.

### Установка `nuxt`

После создания `package.json`, добавьте в проект `nuxt` через npm:

```bash
$ npm install --save nuxt
```

### Каталог `pages`

Nuxt.js преобразует каждый `*.vue` файл внутри каталога `pages` в маршрут для приложения.

Создание `pages` страниц каталога:

```bash
$ mkdir pages
```

затем создайте первую страницу в `pages/index.vue`:

```html
<template>
  <h1>Hello world!</h1>
</template>
```

и запустите проект командой:

```bash
$ npm run dev
```

Теперь приложение должно запуститься по адресу http://localhost:3000.

<div class="Alert">
Nuxt.js будет следить за изменением файлов внутри каталога страниц `pages`, поэтому нет необходимости перезапускать приложение при добавлении новых страниц.
</div>

Узнать больше о структуре каталогов проекта: [Документация. Структура папок](https://ru.nuxtjs.org/guide/directory-structure/).
