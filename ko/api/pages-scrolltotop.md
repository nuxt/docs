---
title: "API: scrollToTop 프로퍼티"
description: scrollToTop 프로퍼티로 페이지를 랜더링하기 전에 페이지의 최상단까지 스크롤할지 말지를 지정할 수 있습니다.
---

<!-- title: "API: The scrollToTop Property" -->
<!-- description: The scrollToTop property lets you tell nuxt.js to scroll to the top before rendering the page. -->

<!-- # The scrollToTop Property -->

# scrollToTop 프로퍼티

<!-- \> The scrollToTop property lets you tell nuxt.js to scroll to the top before rendering the page. -->

> scrollToTop 프로퍼티로 페이지를 랜더링하기 전에 페이지의 최상단까지 스크롤할지 말지를 지정할 수 있습니다.

<!-- - **Type:** `Boolean` (default: `false`) -->

- **타입:** `Boolean`（기본값: `false`）

<!-- By default, nuxt.js scroll to the top when you go to another page, but with children routes, nuxt.js keep the scroll position, if you want to tell nuxt.js to scroll to the top when rendering your child route, set `scrollToTop: true`: -->

별도의 페이지로 이동할 때에 페이지의 최상단으로 스크롤을 하지만, 자식 라우트가 존재하는 경우에는 스크롤 위치를 유보해 두는게 Nuxt.js의 기본 움직임입니다. 자식 라우트를 랜더링할 때 최상단으로 스크롤 시키고 싶은 경우는 `scrollToTop: true`라고 설정을 해 주세요:

```html
<template>
  <h1>My child component</h1>
</template>

<script>
export default {
  scrollToTop: true
}
</script>
```

<!-- If you want to overwrite the default scroll behavior of nuxt.js, take a look at the [scrollBehavior option](/api/configuration-router#scrollBehavior). -->

스크롤에 대해서는 Nuxt.js의 기본 움직임을 덮어쓰기하고 싶은 경우에는 [scrollBehavior 옵션](/api/configuration-router#scrollBehavior)을 참조하세요.
