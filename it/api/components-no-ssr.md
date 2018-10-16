---
title: 'API: Il '
description: Come saltare il rendering lato server e mostrare un testo in sostituzione
  (placeholder).
---

# Il Componente <no-ssr>

> Questo componente può essere usato per evitare il rendering lato server.

**Props**:

- placeholder: `Stringa`
    - Questa prop può essere usata nel contenuto della `div` per far renderizzare solo il testo dal server.

```html
<template>
  <div>
    <ssrfrendly-component />
    <no-ssr>
      <not-ssrfrendly />
    </no-ssr>
  </div>
</template>
```

Questo componente è un clone di [egoist/vue-no-ssr](https://github.com/egoist/vue-no-ssr).
Grazie [@egoist](https://github.com/egoist)!
