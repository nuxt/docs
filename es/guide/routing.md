---
title: Routing
description: Nuxt.js usa el sistema de archivos para generar las rutas de tus aplicaciones web, es tan simple como PHP para crear rutas.
---

> Nuxt.js genera automáticamente la configuración [vue-router](https://github.com/vuejs/vue-router) de acuerdo al árbol de archivos Vue dentro del directorio `pages`.

## Rutas básicas

Este árbol de archivos:

```bash
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

automáticamente generará:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

## Rutas dinámicas

Para definir una ruta dinámica con un parámetro, necesitas definir un archivo .vue o un directorio **prefijado por un guión bajo**.

Este árbol de archivos:

```bash
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

automáticamente generará:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

Como puedes ver la ruta con nombre `users-id` tiene el "path" `:id?` lo cual lo hace opcional, si quieres hacerlo necesario, crea un archivo `index.vue` en el directorio `users/_id`.

### Validar los Parámetros de Ruta

Nuxt.js te permite definir un método validador dentro de tu componente de ruta dinámica.

En este ejemplo: `pages/users/_id.vue`

```js
export default {
  validate ({ params }) {
    // Debe ser un número
    return /^\d+$/.test(params.id)
  }
}
```

Si el método de validación no regresa `true`, Nuxt.js cargará automáticamente la página de error 404.

Más información acerca del método de validación: [API de validación de Páginas](/api/pages-validate)

## Rutas anidadas

Nuxt.js te permite crear rutas anidadas usando las rutas hijas de vue-router.

Para definir una ruta anidada, necesitas crear un archivo Vue con el **mismo nombre del directorio** que contiene tus vistas hijas.

<p class="Alert Alert--info">No olvides escribir `<nuxt-child/>` dentro del componente padre (.vue file).</p>

Este árbol de archivos:

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

automáticamente generará:

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

## Rutas Dinámicas Anidadas

Este escenario no es añadido frecuentemente, pero es posible con Nuxt.js: tener hijos dinámicos dentro de padres dinámicos.

Este árbol de archivos:

```bash
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue
```

automáticamente generará:

```js
router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```

## Transiciones

Nuxt.js usa el componente [&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) para permitirte crear transiciones/animaciones entre tus rutas.

### Ajustes Globales

<p class="Alert Alert--info">El nombre de la transición por defecto de Nuxt.js es `"page"`.</p>

Para agregar una transición de desvanecimiento a cada página de tu aplicación, necesitamos un archivo CSS que sea compartido a través de todas tus rutas, así que empezamos creando un archivo en la capeta `assets`.

Nuestro css global en `assets/main.css`:
```css
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}
```

Agregamos su trayectoria en nuestro archivo `nuxt.config.js`:
```js
module.exports = {
  css: [
    'assets/main.css'
  ]
}
```

Más información acerca de la clave de transición : [API Configuration transition](/api/pages-transition)

### Ajustes de Página

También puedes definir una transición personalizada para una sola página con la propiedad `transition`.

Agregamos una nueva clase en nuestro css global en `assets/main.css`:
```css
.test-enter-active, .test-leave-active {
  transition: opacity .5s;
}
.test-enter, .test-leave-active {
  opacity: 0;
}
```

luego, usamos la propiedad de transición para definir el nombre de la clase que usaremos en está trasición de página:
```js
export default {
  transition: 'test'
}
```

Más información acerca de la propiedad de transición: [API Pages transition](/api/pages-transition)

## Middleware

> El middleware te permite definir una función personalizada que será ejecutada antes de renderizar la página o un grupo de páginas.

**Cada middleware debe ser puesto en el directorio `middleware/`.** El nombre de archivo será el nombre de middleware (`middleware/auth.js` será el middleware `auth`).

Un middleware recibe [el contexto](/api#the-context) como primer argumento:

```js
export default function (context) {
  context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
}
```

El middleware será ejecutado en series en este orden:
1. `nuxt.config.js`
2. Matched layouts
3. Matched pages

Un middleware puede ser asíncrono, simplemente regresa un `Promise` o usa el segundo argumento `callback`:

`middleware/stats.js`
```js
import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

Luego, en tu `nuxt.config.js`, "layout" o página, usa la clave `middleware`:

`nuxt.config.js`
```js
module.exports = {
  router: {
    middleware: 'stats'
  }  
}
```

El middleware `stats` será llamado en cada cambio de ruta.

Para ver un ejemplo de la vida real usando middleware, por favor revisa [example-auth0](https://github.com/nuxt/example-auth0) en GitHub.
