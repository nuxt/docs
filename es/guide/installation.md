---
title: Instalación
description: Con `nuxt` es realmente facil empezar. Un proyecto simple solo necesita la dependencia `nuxt`.
---

> Con `nuxt` es realmente facil empezar. Un proyecto simple solo necesita la dependencia `nuxt`.

## Utilizar la plantilla de inicio de nuxt.js

Para comenzar rapidamente, el equipo de Nuxt.js a creado una [plantilla de inicio](https://github.com/nuxt-community/starter-template).

Descargue el  [.zip con la plantilla de inicio](https://github.com/nuxt-community/starter-template/archive/master.zip) o instalela con with vue-cli:

```bash
$ vue init nuxt-community/starter-template <project-name>
```

> Si [vue-cli](https://github.com/vuejs/vue-cli) no se encuentra instalado, por favor instalelo con el comando `npm install -g vue-cli` 

luego instale las dependencias:

```bash
$ cd <project-name>
$ npm install
```

y lance el proyecto con:
```bash
$ npm run dev
```
La aplicación ahora estara ejecutandose en http://localhost:3000 

<p class="Alert">Nuxt.js escuchara los cambios en los archivos dentro del directorio `pages`, por lo cual no es necesario reiniciar la aplicación cada vez que cambie o agregue una nueva pagina</p>

Para obtener mas información sobre la estructura de directorios del proyecto vea: [Documentación de la estructura de directorios](/guide/directory-structure).

## Comenzando desde cero.

Crear una aplicación Nuxt.js desde cero es muy facil, solo necesita *1 archivo y 1 directorio*. Vamos a crear un directorio vacio para comenzar a trabajar en la aplicación:

```bash
$ mkdir <project-name>
$ cd <project-name>
```

*Información: reemplaze project-name con el nombre de su proyecto.*

### El package.json

El proyecto necesita un archivo llamado `package.json` para especificar como iniciar `nuxt`:
```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```
`scripts` lanzara nuxt a trabes de `npm run dev`

### Instalando `nuxt`

Una vez que se ha creado el `package.json`, agregue nuxt al proyecto a través de npm:
```bash
npm install --save nuxt
```

### El directorio `pages`

Nuxt.js transformara cada fichero `*.vue` que se encuentre dentro del directorio `pages` en una ruta para su aplicación.

Cree un directorio llamado `pages`:
```bash
$ mkdir pages
```
Entonces cree una primera pagina y guardela dentro de `pages/index.vue`:
```html
<template>
  <h1>Hello world!</h1>
</template>
```

y lance el proyecto con:
```bash
$ npm run dev
```
La aplicación ahora se estatara ejecutando en http://localhost:3000

<p class="Alert">Nuxt.js escuchará los cambios de archivos dentro del directorio de `pages`. Por lo que no es necesario reiniciar la aplicación al agregar nuevas páginas</p>


Para obtener más información sobre la estructura de directorios del proyecto vea: [Documentación de la estructura de directorios](/guide/directory-structure).
