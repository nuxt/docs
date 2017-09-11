---
title: Команды и развёртывание
description: Nuxt.js поставляется с набором полезных команд, как для разработки, так и для production.
---

> Nuxt.js поставляется с набором полезных команд, как для разработки, так и для production.

## Список команд

| Команда         | Описание                                                                                                 |
|-----------------|----------------------------------------------------------------------------------------------------------|
| nuxt            | Запускает сервер разработки по адресу [localhost:3000](http://localhost:3000) с горячей заменой модулей. |
| nuxt build      | Собирает ваше приложение с webpack и минификацией JS & CSS (для production).                             |
| nuxt start      | Запускает сервер в режиме production (После запуска `nuxt build`).                                       |
| nuxt generate   | Собирает приложение и генерирует HTML-файл для каждого маршрута (используется для статичного хостинга).  |

#### Аргументы
Вы можете использовать `--help` с любой командой для получения подробной информации об использовании. Общие аргументы:

- **`--config-file` или `-c`:** Для указания пути к файлу `nuxt.config.js`.
- **`--spa` или `-s`:** Запуск команды в режиме SPA и отключением рендеринга на стороне сервера.

#### Использование в package.json

Вы можете поместить эти команды в файл `package.json`:

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

После этого, вы можете запускать ваши команды через `npm run <command>` (например: `npm run dev`).

**Совет:** Чтобы передать аргументы в команду npm, вам потребуется дополнительные `--` после названия скрипта (например: `npm run dev -- --spa`)

## Окружение для разработки

Для запуска Nuxt в режиме разработки с горячей перезагрузкой модулей:

```bash
nuxt
// ИЛИ
npm run dev
```

## Развёртывание для Production

Nuxt.js предоставляет вам выбор между 3 режимами развёртывания вашего приложения: Рендеринг на стороне сервера, SPA или статично сгенерированное.

### Развёртывание с рендерингом на стороне сервера (Универсальное)

Для развёртывания, вместо запуска nuxt, вы возможно захотите собрать приложение заранее. Поэтому сборка и запуск — это разные команды:

```bash
nuxt build
nuxt start
```

Файл `package.json` должен выглядеть примерно так:
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

Примечание: мы рекомендуем добавить `.nuxt` в `.npmignore` или `.gitignore`.

### Static Generated Deployment (Pre Rendered)

Nuxt.js gives you the possibility to host your web application on any static hosting.

To generate our web application into static files:

```bash
npm run generate
```

It will create a `dist` folder with everything inside ready to be deployed on a static hosting.

If you have a project with [dynamic routes](/guide/routing#dynamic-routes), take a look at the [generate configuration](/api/configuration-generate) to tell nuxt.js how to generate these dynamic routes.

<div class="Alert">When generating your web application with `nuxt generate`, [the context](/api/context) given to [data()](/guide/async-data#the-data-method) and [fetch()](/guide/vuex-store#the-fetch-method) will not have `req` and `res`.</div>

### Single Page Application Deployment (SPA)

`nuxt generate` still needs SSR engine during build/generate time
While having the pro that all of our pages are pre rendered and having a high SEO and page load score,
the content is generated at *build time*. For example, we can't use it for applications
where content depends on user authentication or a real time API (at least for the first load).

The SPA idea is simple! When spa mode is enabled using `mode: 'spa'` or `--spa` flag and we run build,
generation automatically starts after the build, but this time without pages content and only common meta and resource links.

So for an SPA deployment:
 - Change `mode` in `nuxt.config.js` to `spa`
 - Run `npm run build`
 - Deploy the created `dist/` folder to your static hosting like surge or github pages or nginx.

Another possible deployment is that we can use nuxt as a middleware in frameworks while mode is `spa`.
This helps reduce server loads and using nuxt in projects where SSR is not possible.


<div class="Alert">See [FAQ/Deployments](/faq/heroku-deployment) for examples of deployment to popular hosts.</div>

