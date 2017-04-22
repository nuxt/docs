---
title: Surge 에 배포하기
description: Surge.sh 에 배포하려면?
---

<!-- title: Surge Deployment -->
<!-- description: How to deploy Nuxt.js with Surge.sh? -->

<!-- # How to deploy with Surge.sh? -->

# Surge.sh 에 배포하려면?

<!-- Nuxt.js gives you the possibility to host your web application on any static hosting like [surge.sh](https://surge.sh/) for example. -->

Nuxt.js를 사용하면, 예를들어 [surge.sh](https://surge.sh/)과 같은 정적호스팅 서비스에서 웹어플리케이션을 호스팅할 수 있습니다.

<!-- To deploy on surge.sh, first install it on your computer: -->

surge.sh에 배포하려면 우선은 surge 를 설치하여야 합니다:

```bash
npm install -g surge
```

<!-- Then, we tell nuxt.js to generate our web application: -->

그리고 Nuxt.js 에 웹어플리케이션을 생성합니다:

```bash
npm run generate
```

<!-- It will create a `dist` folder with everything inside ready to be deployed on a static hosting. -->

이때 `dist` 폴더가 생성되는데, 그 안에 정적 호스팅서비스에 배포될 모든것이 들어가 있습니다.

<!-- We can then deploy it to surge.sh: -->

자 surge.sh에 배포할수 있게 되었네요:

```bash
surge dist/
```

<!-- Done :) -->

이걸로 끝입니다 :)

<!-- If you have a project with [dynamic routes](/guide/routing#dynamic-routes), take a look at the [generate configuration](/api/configuration-generate) to tell nuxt.js how to generate these dynamic routes. -->

프로젝트에서 [동적 라우트](/guide/routing#동적_라우트)를 하고 있는 경우는, 동적 라우트를 어떻게 생성했는가를 Nuxt.js에게 알리기 위해서는 [생성 설정](/api/configuration-generate) 문서를 참고하세요.

<!-- <div class="Alert">When generating your web application with `nuxt generate`, [the context](/api) given to [data()](/guide/async-data#the-data-method) and [fetch()](/guide/vuex-store#the-fetch-method) will not have `req` and `res`.</div> -->

<div class="Alert">`nuxt generate`에 웹어플리케이션을 생성할 때 [data()](/guide/async-data#the-data-method)나 [fetch()](/guide/vuex-store#the-fetch-method)에 넘기는 [context](/api)는 `req`나 `res`를 갖고 있지 않습니다.</div>
