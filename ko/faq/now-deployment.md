---
title: Now 를 사용한 배포
description: Now 를 사용하여 배포하려면?
---

<!-- title: Now Deployment -->
<!-- description: How to deploy Nuxt.js with Now.sh? -->

<!-- # How to deploy with Now.sh? -->

# Now 를 사용하여 배포하려면?

<!-- To deploy with [now.sh](https://zeit.co/now) a `package.json` like follows is recommended: -->

[now.sh](https://zeit.co/now) 을 사용하여 배포하려면 `package.json` 을 다음처럼 작성하는 것을 추천합니다:

```json
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```

<!-- Then run `now` and enjoy! -->

이걸로 `now` 를 사용할 수 있어요！ 인조이！

<!-- Note: we recommend putting `.nuxt` in `.npmignore` or `.gitignore`. -->

메모: `.nuxt`를 `.npmignore` 혹은 `.gitignore`에 등록해두는 것을 추천합니다.
