---
title: Установка
description: Начать работу с Nuxt.js действительно очень легко. Простой проект требует лишь указания зависимости `nuxt` в package.json.
---

> Начать работу с Nuxt.js действительно очень легко. Простой проект требует лишь указания зависимости `nuxt` в package.json.

## Использование стартового шаблона Nuxt.js

Для быстрого запуска приложения команда Nuxt.js создала [стартовый шаблон](https://github.com/nuxt-community/starter-template).

[Скачайте .zip](https://github.com/nuxt-community/starter-template/archive/master.zip), или установите стартовый шаблон с помощью vue-cli:

```bash
$ vue init nuxt-community/starter-template <project-name>
```

> Если [vue-cli](https://github.com/vuejs/vue-cli) ещё не установлен, это можно сделать так: `npm install -g vue-cli`

затем установите зависимости:

```bash
$ cd <project-name>
$ npm install
```

и запустите проект:
```bash
$ npm run dev
```
Теперь приложение доступно по адресу http://localhost:3000

<p class="Alert">Nuxt.js отслеживает изменения файлов внутри папки `pages`, поэтому перезапускать приложение после добавления новых страниц не нужно.</p>

Узнать больше о структуре папок проекта можно в разделе [Структура папок](/guide/directory-structure).

## Создание с нуля

Начать приложение Nuxt.js с нуля также очень просто — необходимы лишь *1 файл и 1 папка*.
Давайте создадим новую папку:

```bash
$ mkdir <project-name>
$ cd <project-name>
```

*Подсказка: замените project-name на название своего проекта.*

### Файл package.json

Проекту необходим файл `package.json`, чтобы запустить `nuxt`:
```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```
Раздел `scripts` запускает Nuxt.js командой `npm run dev`.

### Установка `nuxt`

После создания `package.json` добавьте `nuxt` в свой проект через npm:
```bash
npm install --save nuxt
```

### Папка `pages`

Nuxt.js преобразовывает файлы `*.vue` папки `pages` в маршруты приложения.

Создайте папку `pages`:
```bash
$ mkdir pages
```

затем создайте первую страницу `pages/index.vue`:
```html
<template>
  <h1>Hello world!</h1>
</template>
```

и запустите приложение:
```bash
$ npm run dev
```
Теперь приложение доступно по адресу http://localhost:3000

<p class="Alert">Nuxt.js отслеживает изменения файлов внутри папки `pages`, поэтому перезапускать приложение после добавления новых страниц не нужно.</p>

Узнать больше о структуре папок проекта можно в разделе [Структура папок](/guide/directory-structure).
