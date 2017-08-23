---
title: Instalación
description: Es realmente fácil de empezar con Nuxt.js. Un proyecto simple solo necesita la dependencia `nuxt`.
---

> Es realmente fácil de empezar con Nuxt.js. Un proyecto simple solo necesita la dependencia `nuxt`.

## Usando la plantilla de inicio de Nuxt.js

Para empezar rápidamente, el equipo de the Nuxt.js ha creado una [plantilla de inicio](https://github.com/nuxt/starter).

[Descarga el .zip](https://github.com/nuxt/starter/archive/source.zip) plantilla de inicio o instálala con vue-cli:

```bash
$ vue init nuxt/starter <project-name>
```

> Si [vue-cli](https://github.com/vuejs/vue-cli) no está instalado, por favor instálalo con `npm install -g vue-cli`

luego instala las dependencias:

```bash
$ cd <project-name>
$ npm install
```

y lanza el proyecto con:
```bash
$ npm run dev
```
La aplicación ahora está corriendo en http://localhost:3000

<p class="Alert">Nuxt.js escuchará los cambios en los archivos dentro del directorio de `pages`, así que no tendrás que reiniciar la aplicación cuando añadas nuevas páginas</p>

Para descubrir más acerca de la estructura del directorio del proyecto: [Documentación de la estructura del directorio](/guide/directory-structure).

## Empezando de cero

Crear una aplicación con Nuxt.js desde cero es también bastante sencillo, solo necesita *1 archivo y 1 directorio*. Vamos a crear un directorio vacío para empezar a trabajar en la aplicación:

```bash
$ mkdir <project-name>
$ cd <project-name>
```

*Información: reemplaza project-name con el nombre de tu proyecto.*

### Archivo package.json

El proyecto necesita un archivo `package.json` para especificar cómo empezar con `nuxt`:
```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```
`scripts` lanzará Nuxt.js vía `npm run dev`.

### Instalando `nuxt`

Una vez que `package.json` ha sido creado, agrega `nuxt` al proyecto vía NPM:
```bash
npm install --save nuxt
```

### El directorio `pages`

Nuxt.js transformará cada arhcivo `*.vue` dentro del directorio de `pages` como una ruta para la aplicación.

Crea el directorio `pages`:
```bash
$ mkdir pages
```

luego crea la primera página en `pages/index.vue`:
```html
<template>
  <h1>Hello world!</h1>
</template>
```

y lanza el proyecto con:
```bash
$ npm run dev
```
La aplicación está ahora corriendo en http://localhost:3000

<p class="Alert">Nuxt.js escuchará los cambios en los archivos dentro del directorio de `pages`, así que no tendrás que reiniciar la aplicación cuando añadas nuevas páginas</p>

Para descubrir más acerca de la estructura del directorio del proyecto: [Documentación de la estructura del directorio] (/guide/directory-structure).
