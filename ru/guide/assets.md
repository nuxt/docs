---
title: Ресурсы
description: По-умолчанию, Nuxt использует vue-loader, file-loader и url-loader webpack'а для надежной работы с файлами ресурсов. Вы также можете использовать директорию Static для статичных ресурсов.
---

> По-умолчанию, Nuxt использует vue-loader, file-loader и url-loader webpack'а для работы с файлами ресурсов. Вы также можете использовать директорию `static` для статичных ресурсов.

## Webpack

По-умолчанию, [vue-loader](http://vue-loader.vuejs.org/) автоматически обрабатывает ваши файлы со стилями и шаблонами с помощью `css-loader` и компилятора шаблонов Vue.
В процессе этой обработки, все URL'ы ресурсов, такие как `<img src="...">`, `background: url(...)` и CSS `@import` преобразуются в модульные зависимости.

К примеру, у нас есть такая структура файлов:

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

Если вы используете `url('~assets/image.png')` в вашем CSS, то это будет *преобразовано* в `require('~/assets/image.png')`.

<div class="Alert Alert--orange">

**Внимание:** Начиная с Nuxt 2.0 алиас `~/` не будет обрабатываться корректно в ваших CSS файлах.
Вы должны использовать `~assets` (без косой черты) или алиас `@` в `url` CSS, т.е. `background: url("~assets/banner.svg")`

</div>


Или если ваша ссылка на изображение в `pages/index.vue`:

```html
<template>
  <img src="~/assets/image.png">
</template>
```

Это будет скомпилировано в:

```js
createElement('img', { attrs: { src: require('~/assets/image.png') } })
```

Потому что `.png` это не JavaScript файл, Nuxt.js настраивает webpack так, чтобы [file-loader](https://github.com/webpack/file-loader) и [url-loader](https://github.com/webpack/url-loader) преобразовали пути за вас.

Выгода от этих обработчиков такая:

- `file-loader` позволяет вам указать откуда скопировать и куда разместить файл ресурса, и как его именовать, используя хэш версии для лучшего кэширования. В продакшен, вы получите выгоду от долгосрочного кэширования!
- `url-loader` позволяет вам по-условию вставить файл инлайн, как base-64, если его размер не превышает порог. Это позволяет уменьшить количество HTTP запросов для небольших файлов. Если файл больше заданного порога, то обработкой займется `file-loader`.

По-умолчанию, конфигурация этих обработчиков следующая:

```js
// https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L297-L316
[
  {
    test: /\.(png|jpe?g|gif|svg|webp)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1КБ
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1КБ
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

Это означает, что каждый файл меньше 1 КБ будет вставлен инлайн в формате base-64.
Иначе, изображение/шрифт будет скопирован в соответствующую папку (внутри директории `.nuxt`)
с именем, включающим хэш версии для лучшего кэширования.

Когда вы запустите ваше приложение с `nuxt`, ваш шаблон в `pages/index.vue`:

```html
<template>
  <img src="~/assets/image.png">
</template>
```

Будет преобразован в следующее:

```html
<img src="/_nuxt/img/image.0c61159.png">
```

Если вы хотите изменить конфигурацию обработчика, то, пожалуйста, используйте [build.extend](/api/configuration-build#extend).


## Статичные ресурсы

Если вы не хотите использовать ресурсы из директории `assets`, то вы можете создать и использовать директорию `static` (в корне вашего проекта).

Все файлы в папке будут автоматически обслуживаться Nuxt и будут доступны через корневой URL вашего проекта. (`static/favicon.ico` будет доступен на `localhost:3000/favicon.ico`)

Такая опция очень полезна для таких файлов, как `robots.txt`, `sitemap.xml` или `CNAME` (который важен для развертывания на GitHub Pages).

В коде вы можете ссылаться на файлы относительно корня (`/`):

```html
<!-- Статичное изображение из директории static -->
<img src="/my-image.png"/>

<!-- изображение, обработанное webpack'ом из директории assets -->
<img src="~/assets/my-image-2.png"/>
```
