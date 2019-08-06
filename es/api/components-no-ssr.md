---
title: "API: El componente <no-ssr>"
description: Salta el renderizado en el lado del servidor(renderizado), y muesta un texto alternativo.
---

# El componente &lt;no-ssr&gt;

> This component is used to purposely remove the component from the subject of server side rendering.

**Props**:
- placeholder: `string`
  - Use a text as placeholder until `<no-ssr />` is mounted on client-side.

```html
<template>
  <div>
    <sidebar />
    <no-ssr placeholder="Loading...">
      <!-- this component will only be rendered on client-side -->
      <comments />
    </no-ssr>
  </div>
</template>
```

**Slots**:

- placeholder:
  - Use a slot as placeholder until `<no-ssr />` is mounted on client-side.
 
 ```html
<template>
  <div>
    <sidebar />
    <no-ssr>
      <!-- this component will only be rendered on client-side -->
      <comments />
  
      <!-- loading indicator -->
      <comments-placeholder slot="placeholder" />
    </no-ssr>
  </div>
</template>
```

This component is a clone of [egoist/vue-no-ssr](https://github.com/egoist/vue-no-ssr). Thanks [@egoist](https://github.com/egoist)!
