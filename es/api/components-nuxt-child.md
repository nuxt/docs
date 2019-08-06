---
title: "API: El Componente <nuxt-child>"
description: Muestra la pagina principal.
---

# El Componente &lt;nuxt-child&gt;

> Este componente se utiliza para mostrar los componentes hijos en una [ruta anidada](/guide/routing#nested-routes).

Ejemplo:

```bash
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

Este árbol de archivos generará estas rutas:

```js
[
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~/pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```

Para mostrar el componente `child.vue`, debemos insertar`<nuxt-child/>` dentro de`pages/parent.vue`:

```html
<template>
  <div>
    <h1>I am the parent view</h1>
    <nuxt-child :foobar="123" />
  </div>
</template>
```

`<nuxt-child/>` acepta `keep-alive` y `keep-alive-props`:

```html
<template>
  <div>
    <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- will be converted into something like this -->
<div>
  <keep-alive :exclude="['modal']">
    <router-view />
  </keep-alive>
</div>
```

> Los componentes hijos también pueden recibir propiedades como un componente Vue normal.

Para ver un ejemplo, eche un vistazo el [ejemplo de rutas anidadas](/examples/nested-routes).

## Named View

> Introducido del Nuxt v2.4.0

`<nuxt-child/>` acepta prop `name` para renderizar el named-view:

```html
<template>
  <div>
    <nuxt-child name="top" />
    <nuxt-child />
  </div>
</template>
```

Para ver un ejemplo, eche un vistazo el [named-views example](/examples/named-views).
