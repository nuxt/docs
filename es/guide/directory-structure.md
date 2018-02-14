---
title: Estructura de Directorios
description: La estructura de aplicaciones predeterminada de Nuxt.js tiene como objetivo proporcionar un gran punto de partida para aplicaciones pequeñas y grandes. Por supuesto, eres libre de organizar tu aplicación como quieras.
---

> La estructura de aplicaciones predeterminada de Nuxt.js tiene como objetivo proporcionar un gran punto de partida para aplicaciones pequeñas y grandes. Por supuesto, eres libre de organizar tu aplicación como quieras.

## Directorios

### El directorio de Assets

El directorio de `assets` contiene sus archivos no compilados como LESS, SASS o JavaScript.

[Mas documentación acerca de la integracios de Assets](/guide/assets)

### El directorio Components

El directorio `components` contiene sus componentes Vue.js. Nuxt.js no sobrecarga el metodo data en estos componentes.

### El directorio Layouts

El directorio `Layouts` contiene los diseños de su Layout.

_Este directorio no puede ser renombrado_

[Mas documentación acerca de la integración de layouts](/guide/views#layouts)

### El directorio Middleware

El directorio `Middleware` contiene los middlewares de su aplicación. Los Middlewares le permite definir una función personalizada que se ejecutara antes de representar una página o un grupo de páginas (layouts).

[Mas documentación acerca de la integración de Middlewares](/guide/routing#middleware)

### El directorio Pages

El directorio `pages` contiene las Vistas y Rutas de su aplicación. El framework lee todos sus archivos .vue dentro de este directorio y crea el enrutador de su aplicación.

_Este directorio no puede ser renombrado_

[Mas documentación acerca de la integración de paginas](/guide/views)

### El directorio Plugins

El directorio `plugins` contiene los plugins de javascript que desea ejecutar antes de instanciar la aplicación vue principal.

[Mas documentación acerca de la integración de plugins](/guide/plugins)

### El directorio Static

El directorio `static` contiene sus archivos estaticos. Cada archivo dentro de este directorio es mapeado a /.
The `static` directory contains your static files. Each file inside this directory is mapped to /.

**Ejemplo:** /static/robots.txt is mapped as /robots.txt

_Este directorio no puede ser renombrado_

[Mas documentacion acerca de la integración de archivos estaticos](/guide/assets#static)

### El directorio Store

El directorio `store` contiene los archivos store de [Vuex](http://vuex.vuejs.org). La opción de Vuex Store es implementada en el framework Nuxt.js. Creando un archivo llamado `index.js` en este directorio se activa la opcion en el framework automaticamente.

_Este directorio no puede ser renombrado_

[Mas documentación acerca de la integracion del Store](/guide/vuex-store)

### El archivo de configuración nuxt.config.js

El archivo `nuxt.config.js` contiene su configuración personalizada de Nuxt.js

_Este archivo no puede ser renombrado_

[Mas documentación acerca de la integracion de nuxt.config.js](/guide/configuration)

### El archivo package.json

El archivo `package.json` contiene las dependencias de su aplicación y los scripts.

_Este archivo no puede ser renombrado_

## Alias

| Alias       | Directorio  |
|-------------|-------------|
| ~           | /           |
| ~assets     | /assets     |
| ~components | /components |
| ~middleware | /middleware |
| ~pages      | /pages      |
| ~plugins    | /plugins    |
| ~static     | /static     |

Alias que enlazan a los archivos:

| Alias   | Uso                                 | Descripción                      |
|---------|-------------------------------------|-----------------------------------|
| ~store  | `const store = require('~store')`   | Importa la instancia `Vuex` de Store.|
| ~router | `const router = require('~router')` | Importa la instancia de `vue-router`.|
