---
title: window 혹은 document 가 undefined
description: Nuxt.js 에서 window 혹은 document 가 undefined 의 경우라면?
---

<!-- title: Window or Document undefined -->
<!-- description: Window or Document undefined with Nuxt.js? -->

<!-- # Window or Document undefined? -->

# window 혹은 document 가 undefined 의 경우라면?

<!-- This is due to the server-side rendering. -->

이 에러는 서버측 랜더링에 원인이 있습니다.

<!-- If you need to specify that you want to import a resource only on the client-side, you need to use the `process.BROWSER_BUILD` variable. -->

특정 리소스를 클라이언트측에서만 import를 하고 싶은 경우에는 `process.BROWSER_BUILD` 변수를 사용할 필요가 있습니다.

<!-- For example, in your .vue file: -->

예를들어 .vue 화일을 다음처럼 작성합니다:

```js
if (process.BROWSER_BUILD) {
  require('external_library')
}
```

<!-- Don't forget to add your library in the [vendor bundle](/api/configuration-build#build-vendor) in your `nuxt.config.js`: -->

`nuxt.config.js` 화일에 해당 라이브러리를 [vendor bundle](/api/configuration-build#vendor) 에 추가하는 것을 잊지 말기 바랍니다.

```js
  build: {
    vendor: ['external_library']
  }
```
