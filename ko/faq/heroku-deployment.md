---
title: Heroku 에 배포하기
description: Heroku 에 배포하려면?
---

<!-- title: Heroku Deployment -->
<!-- description: How to deploy Nuxt.js on Heroku? -->

<!-- # How to deploy on Heroku? -->

# Heroku 에 배포하려면?

<!-- We recommend you to read the [Heroku documentation for node.js](https://devcenter.heroku.com/articles/nodejs-support). -->

[Node.js 용 Heroku 문서](https://devcenter.heroku.com/articles/nodejs-support) 를 읽어두시는 것을 추천합니다.

<!-- First, we need to tell Heroku to install the `devDependencies` of the project (to be able to launch `npm run build`): -->

우선 `npm run build`를 실행할 수 있도록, Heroku에게 프로젝트의 `devDependencies` 를 설치하도록 합니다:

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
```

<!-- Also, we want our application to listen on the port `0.0.0.0` and run in production mode: -->

또한 어플리케이션에 `0.0.0.0` 포트를 리슨하도록 하고, 프로덕션 모드로 기동하도록 합니다:

```bash
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production
```

<!-- You should see this in your Heroku dashboard (Settings section): -->

Heroku 대쉬보드의 세팅색션을 봅시다.

 ![nuxt config vars Heroku](https://i.imgur.com/EEKl6aS.png)

<!-- Then, we tell Heroku to launch `npm run build` via the `heroku-postbuild` script in our `package.json`: -->

그리고 `package.json`에 `heroku-postbuild`스크립트를 사용해서 Heroku에게 `npm run build`를 실행하도록 합니다:

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "heroku-postbuild": "npm run build"
}
```

<!-- Finally, we can push the app on Heroku with: -->

마지막으로, 어플리케이션을 Heroku에 `git push` 합니다:

```bash
git push heroku master
```

<!-- Voilà! Your nuxt.js application is now hosted on Heroku! -->

자！ 이걸로 Nuxt.js 어플리케이션은 이제 Heroku에서 호스팅되도록 되었습니다！
