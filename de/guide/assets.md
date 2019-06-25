---
title: Assets
description: By default, Nuxt uses vue-loader, file-loader and url-loader webpack loaders for strong assets serving. You can also use Static directory for static assets.
---

> Per Default nutzt Nuxt Vue-Loader, File-Loader und Url-Loader, Webpack Loaders für ein sicheres Bereitstellen von Assets. Zuästzlich können Sie einen staatic Ordner benutzen um statische Assets zur Verfügung zu stellen.


## webpacked

Per Default prozessiert [vue-loader](http://vue-loader.vuejs.org/) automatisch eure Styling und Template Files mit dem CSS-Loader und dem Vue Template Compiler. In diesem Compilierprozess werden alle Asset URLs wie `<img src="...">`, `background: url(...)` und CSS `@import` Befehle als Dependency Module aufgelöst.

Als Beispiel haben wir diese Ordnerstruktur:

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

Wenn Sie in Ihrem CSS `url('~/assets/image.png')` nutzen, wird dieses als `require('~/assets/image.png')` übersetzt.

Oder Sie nutzen in `pages/index.vue`:

```html
<template>
  <img src="~/assets/image.png">
</template>
```

Dann wird dieses kompiliert zu:

```js
createElement('img', { attrs: { src: require('~/assets/image.png') }})
```


Weil `.png` kein Javascript File ist, konfiguriert Nuxt.js webpack [file-loader](https://github.com/webpack/file-loader) zu benutzen und [url-loader](https://github.com/webpack/url-loader) um dieses zu behandeln.

Die Vorteile file-loader und url-loader zu benutzen sind:


- file-loader lässt Sie entscheiden wohin das File kopiert werden soll und wie das File benannt werden soll. Hierzu werden Hashes verwendet um ein besseres Caching zu bewerkstelligen.
- url-loader stellt ein File inline als Base-64 Data URL zur Verfügung wenn es kleiner als eine bestimmte Dateigröße ist. Dieses reduziert die Anzahl der HTTP Requests für triviale Files. Wenn das File größer ist, wird es automatisch per file-loader geladen.

Die Nuxt.js Default Asset Loader Konfiguration ist:

```js
[
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

Das heißt, dass jedes File welches kleiner als 1KB ist automatisch als Base-64 Data URL als Inline Element eingefügt wird. Andererseits wird das File in den dazugehörigen Ordner (im `.nuxt` Ordner) kopiert und dessen Name mit einem Versions hash versehen für ein besseres Caching.

Wenn Sie Ihre Applikation mit `nuxt` starten, unser Template in `pages/index.vue`:

```html
<template>
  <img src="~/assets/image.png">
</template>
```

wird generiert zu:

```html
<img src="/_nuxt/img/image.0c61159.png">
```

Wenn Sie diese Loader updaten oder deaktivieren möchten, nutzen Sie bitte [build.extend](/api/configuration-build#extend).

## Static

Wenn Sie nicht möchten, dass ihre Assets per webpack bearbeitet werden, erstellen und nutzen Sie den `static` Ordner im Root Verzeichnis Ihres Projektes.

Diese Files werden automatisch von Nuxt zuer Verfügung gestellt und sind in ihrer Projekt Root URL verfügbar.

Diese Option ist hilfreich für Files wie `robots.txt`, `sitemap.xml` oder `CNAME` (für zum Beispiel Github Seiten).

Wenn Sie in Ihrem Code auf diese Files zugreifen möchten, können Sie dies mit `/` machen:

```html
<!-- statisches Bild aus dem static Ordner -->
<img src="/my-image.png"/>

<!-- webpacked Bild aus dem assets Ordner -->
<img src="~/assets/my-image-2.png"/>
```
