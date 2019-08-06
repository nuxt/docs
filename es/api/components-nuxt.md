---
title: "API: El Componente <nuxt>"
description: Muestra el componente de la pagina adentro del layout.
---

# El Componente &lt;nuxt&gt;

> Este componente es solo usado en [layouts](/guide/views#layouts) para mostrar el componente de la pagina.

Ejemplo (`layouts/default.vue`):

```html
<template>
  <div>
    <div>My nav bar</div>
    <nuxt/>
    <div>My footer</div>
  </div>
</template>
```

Para ver un ejemplo, dale una mirada al [ejemplo de layouts](/examples/layouts).

**Props**:

- nuxtChildKey: `string`
  - Este prop va ser asignado al `<router-view/>`, util para crear transiciones adentro de las paginas dinamicas y diferentes rutas.
  - Defecto: `$route.path`

Existen 3 maneras de manejar el prop interno `key` del `<router-view/>`.

1. `nuxtChildKey` prop

  ```html
  <template>
     <div>
       <nuxt :nuxt-child-key="someKey"/>
     </div>
  </template>
  ```

2. la opcion `key` en los componentes de la pagina: `string` o `function`

  ```js
  export default {
     key(route) {
       return route.fullPath
     }
  }
  ```

- nombre: `string` (_introducido en Nuxt v2.4.0_)
  - Este prop va ser asignado a `<router-view/>`, usado para renderizado del componente de la pagina con named-view.
  - Defecto: `default`

Para ver un ejemplo, dale una mirada al [ejemplo de named-views](/examples/named-views).
