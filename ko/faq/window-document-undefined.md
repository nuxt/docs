---
title: window 혹은 document가 undefined
description: Nuxt.js에서 window 혹은 document가 undefined인 경우라면?
---

# window 혹은 document가 undefined인 경우라면?

이 에러는 서버측 렌더링에 원인이 있습니다.

특정 리소스를 클라이언트 측에서만 import를 하고 싶은 경우에는 `process.browser` 변수를 사용할 필요가 있습니다.

예를 들어 `.vue` 파일을 다음처럼 작성합니다:

```js
if (process.browser) {
  require('external_library')
}
```

만약 이 라이브러리를 여러 파일에서 사용중이라면, `nuxt.config.js`의 [vendor bundle](/api/configuration-build#vendor)에 라이브러리를 추가하는 것을 니다.

```js
  build: {
    vendor: ['external_library']
  }
```
