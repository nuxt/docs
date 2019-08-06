---
title: "API: El componente <no-ssr>"
description: Salta el renderizado en el lado del servidor(renderizado), y muesta un texto alternativo.
---

# El componente &lt;no-ssr&gt;

> Este componente es usuario con el proposito de remover el componente del renderizado del lado del servidor.

**Props**:
- placeholder: `string`
  - Usa un texto como auxiliar hasta que `<no-ssr />` este montado del lado del cliente.

```html
<template>
  <div>
    <sidebar />
    <no-ssr placeholder="Loading...">
      <!-- este componente solo estara renderizado del lado del cliente -->
      <comments />
    </no-ssr>
  </div>
</template>
```

**Slots**:

- placeholder:
  - Usa un slot como texto auxiliar hasta que `<no-ssr />` este montado del lado del cliente.
 
 ```html
<template>
  <div>
    <sidebar />
    <no-ssr>
      <!-- este componente solo estara renderizado del lado del cliente -->
      <comments />
  
      <!-- indicador de cargado -->
      <comments-placeholder slot="placeholder" />
    </no-ssr>
  </div>
</template>
```

Este componente es un clon de [egoist/vue-no-ssr](https://github.com/egoist/vue-no-ssr). Gracias a [@egoist](https://github.com/egoist)!
