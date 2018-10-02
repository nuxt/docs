---
title: "API: O componente <no-ssr>"
description: Ignora a renderização no lado do servidor(SSR), ao inves disso exibe um texto.
---

# O componente &lt;no-ssr&gt;

> Este componente é usado com o proposito de remover o componente do fluxo de renferização no lado do servidor.

**Props**:
- placeholder: `string`
  - Usa um texto como substituição enquanto o `<no-ssr />` é montado no client-side.

```html
<template>
  <div>
    <sidebar />
    <no-ssr placeholder="Loading...">
      <!-- este componente vai ser renderizado apenas no client-side -->
      <comments />
    </no-ssr>
  </div>
</template>
```

**Slots**:

- placeholder:
  - Usa um slot como substituição enquanto o `<no-ssr />` é montado no client-side.
 
 ```html
<template>
  <div>
    <sidebar />
    <no-ssr>
      <!-- este componente vai ser renderizado apenas no client-side -->
      <comments />
  
      <!-- loading indicator -->
      <comments-placeholder slot="placeholder" />
    </no-ssr>
  </div>
</template>
```

> Observe que o `<no-ssr />` pode conter no máximo um componente/elemento filho.

This component is a clone of [egoist/vue-no-ssr](https://github.com/egoist/vue-no-ssr). Thanks [@egoist](https://github.com/egoist)!
