---
title: Dokku 를 사용한 배포
description: Dokku 를 사용하여 배포하려면?
---

<!-- title: Dokku Deployment -->
<!-- description: How to deploy Nuxt.js on Dokku? -->

<!-- # How to deploy on Dokku? -->

# Dokku 를 사용하여 배포하려면?

<!-- We recommend to read [Dokku documentation for the setup](http://dokku.viewdocs.io/dokku/getting-started/installation/) and [Deploying a Node.js Application on Digital Ocean using dokku](http://jakeklassen.com/post/deploying-a-node-app-on-digital-ocean-using-dokku/) -->

[Dokku 셋업 문서](http://dokku.viewdocs.io/dokku/getting-started/installation/) 와 [디지털 대양의 Node.js 어플리케이션을 dokku를 사용하여 배포하기 ](http://jakeklassen.com/post/deploying-a-node-app-on-digital-ocean-using-dokku/)를 추천합니다.

<!-- For the example, we will call our nuxt.js application `my-nuxt-app` -->

한 예로, nuxt.js 어플리케이션을 `my-nuxt-app`이라고 부르겠습니다.

<!-- We need to tell Dokku to install the `devDependencies` of the project (to be able to launch `npm run build`): -->

`npm run build`를 사용하기 위해서 프로젝트의 `devDependencies`를 설치하도록 Dokku에게 요청할 필요가 있습니다:

```bash
// on Dokku Server
dokku config:set my-nuxt-app NPM_CONFIG_PRODUCTION=false
```

<!-- Also, we want our application to listen on the port `0.0.0.0` and run in production mode: -->

또한 어플리케이션에게 `0.0.0.0` 포트를 리슨하도록 하고, 프로덕션 모드로 기동하도록 합니다:
```bash
// on Dokku Server
dokku config:set my-nuxt-app HOST=0.0.0.0 NODE_ENV=production
```

<!-- You should see these 3 line when you type `dokku config my-nuxt-app` -->

`dokku config my-nuxt-app`을 실행하면 다음 3줄을 보게 될텐데요.

![nuxt config vars Dokku](https://i.imgur.com/9FNsaoQ.png)

<!-- Then, we tell Dokku to launch `npm run build` via the `scripts.dokku.predeploy` script in our project `app.json`:
`create a file name app.json in our project root folder` -->

그럼 `app.json`파일의 `scripts.dokku.predeploy`의 `npm run build`를 Dokku에서 실행하도록 합니다:
`프로젝트의 루트 폴더에 app.json을 생성합니다.`
```js
{
  "scripts": {
    "dokku": {
      "predeploy": "npm run build"
    }
  }
}
```

<!-- Finally, we can push our app on Dokku with: -->

이걸로 앱을 Dokku에 git push 할 수 있게 되었습니다:
```bash
// commit your change before push.
git remote add dokku dokku@yourServer:my-nuxt-app
git push dokku master
```

<!-- Voilà! Our nuxt.js application is now hosted on Dokku! -->

자! 이제 nuxt.js 어플리케이션이 Dokku위에서 호스팅 됩니다.
