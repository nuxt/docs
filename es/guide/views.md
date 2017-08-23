---
title: Vistas
description: Las sección Vistas describe todo lo que necesitas para configurar datos y vistas para una ruta en específico dentro de tu aplicación Nuxt.js. (Páginas, layouts y Head HTML)
---

> Las sección Vistas describe todo lo que necesitas para configurar datos y vistas para una ruta en específico dentro de tu aplicación Nuxt.js. (Páginas, layouts y Head HTML)

## Pages

Cada componente página es un componente Vue, pero Nuxt.js agrega claves especiales para hacer el desarrollo de tu aplicación universal lo más fácil posible.

```html
<template>
  <h1 class="red">Hola {{ name }}!</h1>
</template>

<script>
export default {
  data (context) {
    // llamado cada vez antes de cargar el componente
    return { name: 'Mundo' }
  },
  fetch () {
    // El métofo fetch es usado para rellenar el almacén antes de renderizar la página
  },
  head () {
    // Establece Meta Tags para esta Página
  },
  // y más funcionalidad por descubrir
  ...
}
</script>

<style>
.red {
  color: red;
}
</style>
```


| Atributo | Descripción |
|-----------|-------------|
| data | Las clave más importante, tiene el mismo propósito que [Vue data](https://vuejs.org/v2/api/#Options-Data) pero puede ser asíncrona y recibe el contexto como argumento, por favor lee la [documentación de data asíncrona](/guide/async-data) para aprender cómo funciona. |
| fetch | Usado para rellenar el almacén antes de renderizar la página, es como el método data excepto que no establece el componente data. Mira [fetch en la documentación del API de Páginas](/api/pages-fetch). |
| head | Establece un Meta Tag específico para la página actual, mira [head en la documentación del API de Páginas](/api/pages-head). |
| layout | Especifica un layout definido en la carpeta `layouts`, mira [layouts en la documentación del API de Páginas](/api/pages-layout). |
| transition | Establece una transición específica para la página, mira [transición en el API de Páginas](/api/pages-transition). |
| scrollToTop | Boolean, predeterminado: `false`. Establece si desea que la página se desplace hasta la parte superior antes de ser renderizada, es usado para [rutas anidadas](/guide/routing#nested-routes). |
| validate | Función que valida una [ruta dinámica](/guide/routing#dynamic-routes). |
| middleware | Establece un middleware para esta página, el middleware se llamará antes de renderizar la página, mira [rutas middleware](/guide/routing#middleware). |

Más información sobre el uso de las propiedades de páginas: [API de Páginas](/api)

## Layouts

Nuxt.js te permite extender el diseño principal o crear layouts personalizados agregandolos en el directorio de `layouts`.

### Layout por defecto

Puedes extender el layout principal agregando un archivo `layouts/default.vue`.

*Asegurate de agregar el componente `<nuxt>` cuando estas creando un layout para mostrar el componente página.*

El código fuente del layout predeterminado es:
```html
<template>
  <nuxt/>
</template>
```

### Página de Error

Puedes personalizar la página de error si agregas un archivo `layouts/error.vue`.

Este layout es especial ya que puede no incluir `<nuxt/>` dentro de su plantilla.
Verás este layout como un componente mostrado cuando un error ocurre (404, 500, etc).

El código fuente de la página de error predeterminado esta [disponible en Github](https://github.com/nuxt/nuxt.js/blob/master/lib/app/components/nuxt-error.vue).

Ejemplo de una página de error personalizada en `layouts/error.vue`:
```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Página no encontrada</h1>
    <h1 v-else>Ocurrió un error</h1>
    <nuxt-link to="/">Página principal</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
```

### Layout Personalizado

Cada archivo (*primer nivel*) en la carpeta `layouts` creará un layour personalizado accesible con la propiedad `layout` en el componente página.

*Asegurate de agregar el componente `<nuxt/>` cuando estas creando un layout para mostrar el componente página.*

Ejemplo de `layouts/blog.vue`:
```html
<template>
  <div>
    <div>My blog navigation bar here</div>
    <nuxt/>
  </div>
</template>
```

Y luego en `pages/posts.vue`, puedes decirle a Nuxt.js que use tu layout personalizado:
```html
<script>
export default {
  layout: 'blog'
}
</script>
```

Más información sobre la propiedad "layout": [API de esquema(layout) de Páginas](/api/pages-layout)

Revisa el [video de demostración](https://www.youtube.com/watch?v=YOKnSTp7d38) para verlo en acción.

## HTML Head

Nuxt.js uses [vue-meta](https://github.com/declandewet/vue-meta) to update the `headers` and `html attributes` of your application.

Nuxt.js configura `vue-meta` con estas opciones:
```js
{
  keyName: 'head', // el nombre de la opción del componente donde vue-meta busca información meta.
  attribute: 'n-head', // el nombre del atributo que vue-meta agrega a las etiquetas que observa
  ssrAttribute: 'n-head-ssr', // el nombre del atributo que permite a vue-meta saber ue la información meta ya ha sido renderizada desde el servidor
  tagIDKeyName: 'hid' // el nombre de la propiedad que vue-meta usa para determinar si sobrescribir o agregar una etiqueta
}
```

### Meta Tags predeterminados

Nuxt.js te deja definir todos los meta por defecto para tu aplicación dentro de `nuxt.config.js`, usa la misma propiedad `head`:

Ejemplo de un "viewport" personalizado con una fuente personalizada de "Google font":
```js
head: {
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
  ]
}
```

Para conocer la lista de opciones que le puedes dar a `head`, dale una revisada en la [documentación de vue-meta](https://github.com/declandewet/vue-meta#recognized-metainfo-properties).

Más información sobre el método head: [API Configuration head](/api/configuration-head)

### Etiquestas Meta personalizadas para una Página

Más información acerca del método head: [head en el API de Páginas](/api/pages-head)

<p class="Alert">Para evitar alguna duplicación cuando usas un componente hijo, por favor dame un identificador único con el la clave `hid`, por favor [lee más acerca de esto](https://github.com/declandewet/vue-meta#lists-of-tags).</p>

## Document

> Puedes personalizar el "document" principal con nuxt.js

Para ampliar la plantilla html, crea un archivo `app.html` en la raíz de tu proyecto.

La plantilla predeterminada es:

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

Un ejemplo de agregar clases CSS condicionales para IE:

```html
<!DOCTYPE html>
<!--[if IE 9]><html lang="en-US" class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```