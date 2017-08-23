---
title: Introducción
description: "El 25 de Octubre de 2016, el equipo detrás de zeit.co, anunció Next.js, un framework para aplicaciónes server-rendered con React. Pocas horas después del anuncio, la idea de crear aplicaciónes server-rendered con Vue.js de la misma forma que Next.js era obvia: Nuxt.js nació."
---

> El 25 de Octubre de 2016, el equipo detrás de [zeit.co](https://zeit.co/), anunció [Next.js](https://zeit.co/blog/next),un framework para aplicaciónes server-rendered con React. Pocas horas después del anuncio, la idea de crear aplicaciónes server-rendered con [Vue.js](https://vuejs.org) de la misma forma que Next.js era obvia: **Nuxt.js** nació.

## ¿ Qué es Nuxt.js ?

Nuxt.js es un framework para crear Aplicaciones Universales con Vue.js

Su ámbito principal es **UI rendering** al abstraer la distribución cliente/servidor. 

Nuestra meta es crear un framework lo suficientemente flexible para que lo puedas usar como la base principal de un proyecto o en tu actual proyecto basado en Node.js.

Nuxt.js preasigna toda la configuración que se necesita para hacer que tu Aplicación con Vue.js **Server Rendered** sea más agradable.

Además, tenemos otra opción de despliegue llamada: *nuxt generate*. Esta construirá una Aplicación **Static Generated** con Vue.js.
Creemos que esta opción puede ser el próximo gran paso en el desarrollo de Aplicaciones Web con microservicios.

Como un framework, Nuxt.js viene con varias características para ayudarte en tu desarrollo entre el lado del cliente y el lado del servidor como Data Asíncrona, Middleware, Layouts, etc.

## ¿ Cómo Funciona ?

![Vue con Webpack y Babel](https://i.imgur.com/avEUftE.png)

Nuxt.js incluye lo siguiente para crear un desarrollo de aplicaciones web robusto:
- [Vue 2](https://github.com/vuejs/vue)
- [Vue-Router](https://github.com/vuejs/vue-router)
- [Vuex](https://github.com/vuejs/vuex) (incluido solo cuando se usa [store option](/guide/vuex-store))
- [Vue-Meta](https://github.com/declandewet/vue-meta)

Un total de solo **28kb min+gzip** (31kb con vuex).

Bajo el capó usamos [Webpack](https://github.com/webpack/webpack) con [vue-Loader](https://github.com/vuejs/vue-loader) y [babel-loader](https://github.com/babel/babel-loader) para agrupar, code-split y minimizar tu código.

## Características

- Escribe Archivos Vue
- División automática de Código
- Server-Side Rendering
- Powerful Routing System with Asynchronous Data
- Servir Archivos Estáticos
- Transpilación ES6/ES7
- Agrupación y minimización de tu JS & CSS
- Gestionar Elementos Head
- Hot reloading en Desarrollo
- Pre-procesadores: SASS, LESS, Stylus, etc

## Esquema

Este esquema muestra lo que es llamado por nuxt.js cuando el servidor es llamado o cuando el usuario navega a través de la aplicación via `<nuxt-link>`:

![nuxt-schema](/nuxt-schema.png)

## Renderizado desde el Servidor (Server Rendered)

Puedes usar nuxt.js como un framework para gestionar todo el renderizado de la interfase de usuario de tu proyecto.

Cuando inicias `nuxt`, este empezará un servidor de d"esarrollo con "hot-reloading" y "vue-server-renderer configurado para automáticamente "server-render" tu aplicación.

Dale una revisada a [los comandos](/guide/commands) para aprender más acerca de esto.

Si ya tienes un servidor, puedes conectar nuxt.js usandolo como un "middleware", no hay restricciones en lo absoluto cuando usas nuxt.js para desarrollar tu Aplicación Web Universal, mira la guía [Usando Nuxt.js Programáticamente](/api/nuxt).

## Generado Estáticamente (Static Generated)

La gran innovación de nuxt.js viene aquí: `nuxt generate`

Cuando construyas tu aplicación se generará el HTML de cada una de tus rutas para guardarlas en un archivo.

Ejemplo:

```bash
-| pages/
----| about.vue
----| index.vue
```

Generará:
```
-| dist/
----| about/
------| index.html
----| index.html
```

De este modo, puedes hospedar tu aplicación web generada en cualquier "static hosting"!

El mejor ejemplo es esta página. Esta generada y hospedad en "Github Pages":
- [Código fuente](https://github.com/nuxt/nuxtjs.org)
- [Código generado](https://github.com/nuxt/nuxtjs.org/tree/gh-pages)

No queremos generar manualmente la aplicación cada vez que actualizamos los [repositorios de la documentación](https://github.com/nuxt/docs), así que en pada "push" llamamos a una función AWS Lambda con:
1. Clonar el [repositorio nuxtjs.org](https://github.com/nuxt/nuxtjs.org)
2. Instalar las dependencias via `npm install`
3. Correr `nuxt generate`
4. "Push" la carpeta `dist` al branch `gh-pages`

Ahora tenemos una **Aplicación Web Estáticamente Generada sin Servidor** (Serverless Static Generated Web Application) :)

Podemos ir más lejos si pensamos en una aplicación web de e-commerce hecha con `nuxt generate` y hospedada en un CDN, y cada vez que un producto se agota o vuelve a estar disponible, regeneramos la aplicación web. Pero si el usuario navega a través de una aplicación web mientras tanto, estará actualizado gracias a las llamadas al API hechas al API del e-commerce. No se necesita tener múltiples instacias de un servidor + un caché nunca más!
