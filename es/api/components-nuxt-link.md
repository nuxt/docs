---
title: "API: El Componente <nuxt-link>"
description: Enlaza las paginas entre ellas con nuxt-link.
---

# El Componente &lt;nuxt-link&gt;

> Este componente se utiliza para proporcionar navegación entre los componentes de la página y mejorar el rendimiento con un prefetching inteligente.

El componente `<nuxt-link>` es esencial para Nuxt. Esto **deberia ser usado para navegar** a través de la aplicacion, similar al componente `<router-link>` en una aplicacion tradicional de Vue. De hecho, `<nuxt-link>` extiende [`<router-link>`](https://router.vuejs.org/api/#router-link). Eso significa que toma las mismas propiedades y se puede usar de la misma manera. Lea la [documentacion de Vue Router](https://router.vuejs.org/api/#router-link) para más información.

Ejemplo (`pages/index.vue`):

```html
<template>
  <div>
    <h1>Home page</h1>
    <nuxt-link to="/about">About (internal link that belongs to the Nuxt App)</nuxt-link>
    <a href="https://nuxtjs.org">External Link to another page</a>
  </div>
</template>
```

**Alias:** `<n-link>`, `<NuxtLink>`, y `<NLink>`

> Añadido desde Nuxt.js v2.4.0

Para mejorar la capacidad de respuesta de sus aplicaciones Nuxt.js, cuándo se mostrará el enlace dentro de la pantalla, Nuxt.js automaticamente precacheara el *codigo dividido* de la pagina. Esta funcion fue inspirada de [quicklink.js](https://github.com/GoogleChromeLabs/quicklink) por Google Chrome Labs.

Para desactivar el precacheo de una pagina enlazada, usted puede usar el prop `no-prefetch`:

```html
<n-link to="/about" no-prefetch>About page not pre-fetched</n-link>
```

Puede configurar globalmente este comportamiento con [router.prefetchLinks](/api/configuration-router#prefetchlinks).

El prop `prefetched-class` también está disponible para personalizar la clase agregada cuando el codigo dividido de la página fue precacheado. Asegúrese de configurar esta funcionalidad globalmente con [router.linkPrefetchedClass](/api/configuration-router#linkprefetchedclass).
