---
title: host 와 port 번호
description: Nuxt.js 에서 host 와 port 번호를 변경하려면?
---

<!-- title: HOST and PORT -->
<!-- description: How to edit HOST and PORT with Nuxt.js? -->

<!-- # How to edit HOST and PORT? -->

# host 와 port 번호를 변경하려면?

<!-- You can configure the PORT with 2 different ways: -->

port 번호를 설정하는 방법에는 2가지 방법이 있습니다.

<!-- - Via a env variables -->

- 환경변수를 사용:

```js
"scripts": {
  "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```

<!-- - Via a nuxt config in the `package.json`: -->

- `package.json` 에서 nuxt 설정을 사용:

```js
"config": {
  "nuxt": {
    "host": "0.0.0.0",
    "port": "3333"
  }
},
"scripts": {
  "dev": "nuxt"
}
```
