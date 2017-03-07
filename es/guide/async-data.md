---
title: Data Asincrónica
description: Nuxt.js sobrecarga el método "data" desde vue.js para permitirte un manejo de operación asíncrona antes de configurar los datos del componente.
---

> Nuxt.js *sobrecarga* el método `data` desde vue.js para permitirte un manejo de operación asíncrona antes de configurar los datos del componente.

## El Método data

`data` es llamada cada vez antes de cargar el componente (**solo para componentes de páginas**). Puede ser llamada desde el lado del servidor o antes de navegar por la ruta correspondiente. Este método recibe [el contexto](/api#context) como primer argumento, puedes usarlo para obtener algunos datos y devolver los datos del componente.

<div class="Alert Alert--orange">Tú **NO** tienes acceso a la instancia del componente a traves de `this` dentro de `data` porque es llamado **antes de iniciar** el componente.</div>

Para hacer el método "data" asíncrono, nuxt.js te ofrece diferentes opciones, elige la que se te haga más familiar:

1. Devolviendo un `Promise`, nuxt.js esperará que la promesa sea resuelta antes de renderizar el componente.
2. Usando la [propuesta async/await](https://github.com/lukehoban/ecmascript-asyncawait) ([aprende más de esto](https://zeit.co/blog/async-and-await))
3. Define un "callback" como segundo argumento. Tiene que ser llamado de esta manera: `callback(err, data)`

### Devolviendo una Promesa
```js
export default {
  data ({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
  }
}
```

### Usando async/await
```js
export default {
  async data ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

### Usando un "callback"
```js
export default {
  data ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      callback(null, { title: res.data.title })
    })
  }
}
```

### Devolviendo un Objeto

Si no necesitas hacer ningún llamado asíncrono, puedes simplemente devolver un objeto:

```js
export default {
  data (context) {
    return { foo: 'bar' }
  }
}
```

### Mostrando la "data"

Cuando el método "data" está establecido, puedes mostrar los datos dentro de tu plantilla como solías hacerlo:

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## El Contexto

Para ver la lista de claves disponibles en `context`, revisa la [API de data de Páginas](/api).

## Manejo de Errores

Nuxt.js agrega el método `error(parámetros)` en el `context`, puedes llamarlo para mostrar la página de error. `params.statusCode` será también usada para renderizar el código de estado apropiado desde el lado del servidor.

Ejemplo con un `Promise`:
```js
export default {
  data ({ params, error }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'Post no encontrado' })
    })
  }
}
```

Si estás usando el argumento `callback`, puedes llamarlo directamente con el error, nuxt.js llamará el método `error` por ti:
```js
export default {
  data ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      callback(null, { title: res.data.title })
    })
    .catch((e) => {
      callback({ statusCode: 404, message: 'Post not found' })
    })
  }
}
```

Para modificar la página de error, visita la [sección de layouts en VISTAS](/guide/views#layouts).
