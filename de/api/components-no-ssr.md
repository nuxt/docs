---
title: "API: The <no-ssr> Component"
description: Skip component rendering on server side(rendering), and display placeholder text.
---

# The &lt;no-ssr&gt; Component

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
