---
title: "API: The <no-ssr> Component"
description: Skip component rendering on server side rendering, and rendering placeholder text.
---

# The &lt;no-ssr&gt; Component

> This component is used to purposely remove the component from the subject of server side rendering.

**Props**:
- placeholder: `String`
  - This prop will be use to component innner `div`, it's displayed as text only on server side rendering.

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
