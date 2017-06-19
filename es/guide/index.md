---
title: Introducción
description: "El 25 de octubre del 2016, el equipo detras de zeit.co, anuncio Next.js, un framework para renderizar aplicaciones React del lado del servidor. Cuatro horas despues del anuncio, la idea de crear aplicaciones Vue.js renderizadas por el servidor de la misma manera que Next.js era obvia: nacio Nuxt.js"
---

> El 25 de octubre del 2016, el equipo detras de [zeit.co](https://zeit.co/), anuncio [Next.js](https://zeit.co/blog/next), un framework para renderizar aplicaciones React del lado del servidor. Cuatro horas despues del anuncio, la idea de crear aplicaciones [Vue.js](https://vuejs.org) renderizadas por el servidor de la misma manera que Next.js era obvia: nacio **Nuxt.js**


## Que es Nuxt.js ?

Nuxt.js es un framework para crear aplicaciones Vue.js universales.

Su ámbito principal es el **renderizado UI** mientras abstrae la distribución cliente/servidor.

Nuestro objetivo es crear un framework lo suficientemente flexible para que pueda utilizarlo como una base principal para sus proyectos, o aderirlo a su proyecto actual básado en Node.js.

Nuxt.js preestablece toda la configuración necesaria para que el desarrollo de una aplicación Vue.js **Server Rendered** sea mas agradable.

Ademas, tambien ofrecemos otra opcion de despliegue llamada: *nuxt generate*. Esto construira una aplicación Vue.js ** Estaticamente generada**.
Creemos que la opción podria ser el proximo gran paso en el desarrollo de aplicaciónes web con microservicios.

Como un framework, Nuxt.js viene con un monton de caracteristicas para ayudarle en su desarrollo entre el lado del cliente y el lado del servidor, tales como Data Asincrona, Middlewares, Layouts, etc.

## Cómo funciona?

![Vue con Webpack y Babel](https://i.imgur.com/avEUftE.png)

Nuxt.js incluye lo siguientepara crear un desarrollo de aplicaciones web avanzado:

- [Vue 2](https://github.com/vuejs/vue)
- [Vue-Router](https://github.com/vuejs/vue-router)
- [Vuex](https://github.com/vuejs/vuex) (Solo se incluye cuando se utiliza [La opción store](/guide/vuex-store))
- [Vue-Meta](https://github.com/declandewet/vue-meta)

Un total de solo **28kb min+gzip** (31kb con vuex).

Debajo del capo, usamos [Webpack](https://github.com/webpack/webpack) con [vue-loader](https://github.com/vuejs/vue-loader) y [babel-loader](https://github.com/babel/babel-loader) para agrupar, partir el codigo y minificar su codigo.

## Caracteristicas

- Escribe archivos Vue
- División de codigo automatica
- Renderizado del lado del Servidor
- Potente sistema de enrutamiento con datos asincronos.
- Servidor de archivos estaticos
- Transpilación de ES6/ES7
- Agrupamiento y minificación de su JS y CSS
- Gestion de elementos en el HEAD
- Recarga en caliente en desarrollo
- Preprocesadores: SASS, LESS, Stylus, etc

## Esquema

Este esquema muestra lo que es llamado por nuxt.js cuando se llama al servidor o cuando el usuario navega a través de la aplicación via `<nuxt-link>`:

![nuxt-schema](/nuxt-schema.png)

## Renderizado del Servidor

Pues utilizar nuxt.js como un framework para manejar toda la representación de la UI de su proyecto.

Al iniciar `nuxt`, se iniciara un servidor de desarrollo con el hot-reloading y vue-server-rendered configurado para renderizar automaticamente su aplicación.

Eche un vistazo a [Los comandos](/guide/commands) para aprender mas sobe esto.

Si ya tiene un servidor, puede conectar nuxt.js mediante el uso de un Middleware, no hay ninguna restricción en absoluto cuando se utiliza nuxt.js para el desarrollo de sus aplicaciónes web universales, consulte la guia para  [Utilizar Nuxt.js Programaticamente](/api/nuxt).

## Generación Estatica

La gran innovación de nuxt.js se llama: `nuxt generate`

Al construir su aplicación generara el HTML de cada una de sus rutas y las almacenara en un archivo.

Ejemplo:

```bash
-| pages/
----| about.vue
----| index.vue
```

Esto generara:

```
-| dist/
----| about/
------| index.html
----| index.html
```
oDe esta manera, puede alojar su aplicación web generada en cualquier hosting de almacenamiento estatico!

El mejor ejemplo es este website. Este sitio esta generado y almacenado en GitHub Pages:


- [Codigo Fuente](https://github.com/nuxt/nuxtjs.org)
- [Codigo generado](https://github.com/nuxt/nuxtjs.org/tree/gh-pages)

No queremos generar manualmente la aplicación cada vez que actualizamos [el repositorio de documentos](https://github.com/nuxt/docs), de modo que cada push hace que se ejecute una función AWS Lambda que:

1. Clona el [repositorio de nuxtjs.org](https://github.com/nuxt/nuxtjs.org)
2. Instala las dependencias via `npm install`
3. Ejecuta `nuxt generate`
4. Empuja la carpeta `dist` a la rama `gh-pages`.

Ahora tenemos una **Aplicación web Serverless Generada **

Podemos ir mas alla, pensando en una aplicación web de comercio electronico echa con `nuxt generate` y alojada en un CDN, y cada vez que un producto este agotado o sin stock, regeneramos la aplicación web. Pero si el usuario navega a traves de la aplicación web mientras tanto, estara actualizado gracias a las llamadas de la API realizadas a la API de comercio electronico. No es necesario tener varias instancias de un servidor + cache nunca mas!.