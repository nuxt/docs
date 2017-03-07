---
title: Estructura del Directorio
description: La estructura predeterminada de una aplicación Nuxt.js tiene el propósito de proveer un gran punto de partida para aplicaciones grandes y pequeñas.
---

> La estructura predeterminada de una aplicación Nuxt.js tiene el propósito de proveer un gran punto de partida para aplicaciones grandes y pequeñas. Por supuesto, tú eres libre de organizar tu aplicación como te guste.

## Directorios

### Directorio de Recursos (Assets)

El directorio de `assets` contiene tus 'assets' sin compilar como LESS, SASS o JavaScript.

[Más documentación acerca de la integración de Assets](/guide/assets)

### El Directorio de los Componentes

El directorio llamado `components` contiene tus componentes de Vue.js. Nuxt.js no recarga el método de datos en estos componentes.

### El Directorio de Layouts

El directorio llamado `layouts` contiene los "Layouts" de tu Aplicación.

_Este directorio no puede ser renombrado._

[Más documentación acerca de la integración de Layouts](/guide/views#layouts)

### El Directorio Middleware

_Pronto_

### El Directorio de Páginas

El directorio llamado `pages` contiene las Vistas y Rutas de tu Aplicación. El framework lee todos los archivos `.vue` dentro de este directorio y crea el enrutador de tu aplicación.

_Este directorio no puede ser renombrado._

[Más documentación acerca de la integración de Páginas](/guide/views)

### El Directorio de Plugins

El directorio llamado `plugins` contiene los plugins en Javascript que quieres ejecutar antes de instanciar la aplicación vue.js de origen.

[Más documentación acerca de la integración de Plugins](/guide/plugins)

### El Directorio "Static"

El directorio de `static` contiene tus archivos estáticos. Cada archivo dentro de este directorio está mapeado a /.

**Ejemplo:** /static/robots.txt está mapeado como /robots.txt

_Este directorio no puede ser renombrado._

[Más documentación acerca de la integración de Static](/guide/assets#static)

### El Directorio "Store"

El directorio llamado `store` contiene tus archivos [Vuex Store](http://vuex.vuejs.org). La opción de Vuex Store es implementada en el framework de Nuxt.js. Creando un archivo `index.js` en este directorio activa automáticamente la opción en el framework.

_Este directorio no puede ser renombrado._

[Más documentación acerca de la integración de Store](/guide/vuex-store)

### El Archivo nuxt.config.js

El archivo `nuxt.config.js` contiene tu configuración personalizada de Nuxt.js.

_Este archivo no puede ser renombrado._

[Más documentación acerca de la integración de nuxt.config.js](/guide/configuration)

### El Archivo package.json

El archivo `package.json` contiene las dependencias y "scripts" de tu Aplicación.

_Este archivo no puede ser renombrado._

## Alias

| Alias | Directorio |
|-----|------|
| ~ | / |
| ~assets | /assets |
| ~components | /components |
| ~pages | /pages |
| ~plugins | /plugins |
| ~static | /static |

Alias que enlazan a archivos:

| Alias | Uso | Descripción |
|-------|------|--------------|
| ~store | `const store = require('~store')` | Import the `vuex` store instance. |
| ~router | `const router = require('~router')`| Import the `vue-router` instance. |
