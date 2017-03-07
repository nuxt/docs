---
title: Recursos (Assets)
description: Nuxt usa por defecto vue-loader, file-loader y url-loader en Webpack para un servicio de recursos(assets) robusto, pero también puedes usar la carpeta "Static" para recursos estáticos.
---

> Nuxt usa por defecto vue-loader, file-loader y url-loader en Webpack para un servicio de recursos(assets) robusto, pero también puedes usar la carpeta "Static" para recursos estáticos.

## Webpacked

Por defecto, [vue-loader](http://vue-loader.vuejs.org/en/) procesa automáticamente tu estilo y archivos de plantilla con `css-loader` y el compilador de plantillas de Vue. En este proceso de compilación, todos los URL de recursos como `<img src="...">`, `background: url(...)` y `@import` de CSS se resuelven como dependencias de módulo.

Por ejemplo, tenemos este árbol de archivos:

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

En mi CSS, si uso `url('~assets/image.png')`, se traducirá como `require('~assets/image.png')`.

O si en mi `pages/index.vue`, uso:
```html
<template>
  <img src="~assets/image.png">
</template>
```

Será compilado como:

```js
createElement('img', { attrs: { src: require('~assets/image.png') }})
```

Como `.png` no es un archivo Javascript, nuxt.js configura Webpack para usar [file-loader](https://github.com/webpack/file-loader) y [url-loader](https://github.com/webpack/url-loader) para manejarlos por ti.

Los beneficios son:
- `file-loader` te deja designar a dónde copiar y colocar el archivo del recurso, y cómo nombrarlo usando hashes con versión para una mejor caché.
- `url-loader` te permite condicionalmente convertir a una sola línea un archivo como "base-64 data URL" si son más pequeños que un límite dado. Esto puede reducir un número de solicitudes HTTP para archivos triviales. Si el archivo sobrepasa el límite dado, volverá automáticamente a `file-loader`.

Actualmente, Nuxt.js la configuración de los "loaders" por defecto es: 

```js
[
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1KO
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1 KO
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

Lo que significa que cada archivo por debajo de 1 KO será convertido a una sola línea como 'base-64 data URL'. De lo contrario, la imagen/fuente será copiada en su carpeta correspondiente (dentro del directorio `.nuxt`) con un nombre conteniendo "hashes" con versión para un mejor almacenamiento en caché.

Cuando lancemos nuestra aplicación con `nuxt`, nuestra plantilla en `pages/index.vue`:

```html
<template>
  <img src="~assets/image.png">
</template>
```

Será generada en:
```html
<img src="/_nuxt/img/image.0c61159.png">
```

Si quieres actualizar estos "loaders" o deshabilitarlos, por favor mira en la [configuración de loaders](/api/configuration-build#loaders).

## Estático

Si no quieres usar "Webpacked Assets" del directorio de `assets`, puedes crear y usar el directorio `static` en el directorio raíz de tu proyecto.

Estos archivos serán automáticamente provistos por Nuxt y accesibles en el URL raíz de tu proyecto.

Esta opción es útil para archivos como `robots.txt` o `sitemap.xml`.

Desde tu código puedes entonces referirte a estos archivos con `/` en tus URL:

```html
<!-- Static image from static directory -->
<img src="/my-image.png"/>

<!-- Webpacked image from assets directory -->
<img src="/assets/my-image-2.png"/>
```
