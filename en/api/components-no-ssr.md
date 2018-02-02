---
title: "API: The <no-ssr> Component"
description: Skip component rendering on server side(rendering), and display placeholder text.
---

# The &lt;no-ssr&gt; Component

> This component is used to purposely remove the component from the subject of server side rendering.

**Props**:
- placeholder: `String`
  - This prop will be used as a content of inner `div` and displayed as text only on server side rendering.

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

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>This component is a clone of [egoist/vue-no-ssr](https://github.com/egoist/vue-no-ssr).
Thanks [@egoist](https://github.com/egoist)!</p>
