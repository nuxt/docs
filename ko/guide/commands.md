---
title: 명령어들
description: Nuxt.js는 개발 환경과 프로덕션 목적을 위한 유용한 명령어들이 있습니다.
---

> Nuxt.js는 개발 환경과 프로덕션 환경에 사용되는 유용한 명령어들이 있습니다.

<!-- title: Commands -->
<!-- description: Nuxt.js comes with a set of useful commands, both for development and production purpose. -->

<!-- \> Nuxt.js comes with a set of useful commands, both for development and production purpose. -->

<!-- ## List of Commands -->

## 명령어 리스트

<!-- | Command | Description | -->
<!-- |---------|-------------| -->
<!-- | nuxt | Launch a development server on [localhost:3000](http://localhost:3000) with hot-reloading. | -->
<!-- | nuxt build | Build your application with webpack and minify the JS & CSS (for production). | -->
<!-- | nuxt start | Start the server in production mode (After running `nuxt build`). | -->
<!-- | nuxt generate | Build the application and generate every route as a HTML file (used for static hosting). | -->

| 명령어 | 설명 |
|---------|-------------|
| nuxt | 개발서버를 핫 리로딩 상태로 [localhost:3000](http://localhost:3000)에 시작합니다.|
| nuxt build | Webpack을 통해 어플리케이션을 빌드하며, CSS와 JS를 최소화하는 작업을 진행합니다.(프로덕션 용으로) |
| nuxt start | 프로덕션 모드로 서버를 시작합니다.（`nuxt build`를 실행한 후에） |
| nuxt generate | 어플리케이션을 빌드하고 모든 라우트를 HTML 파일로 생성합니다. (정적 호스팅에 사용됩니다.) |

<!-- You should put these commands in the `package.json`: -->

이 명령문들을 `package.json`에 작성하여야 합니다.

<!--```json-->
<!--"scripts": {-->
  <!--"dev": "nuxt",-->
  <!--"build": "nuxt build",-->
  <!--"start": "nuxt start",-->
  <!--"generate": "nuxt generate"-->
<!--}-->
<!--```-->

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

<!-- Then, you can launch your commands via `npm run <command>` (example: `npm run dev`). -->

그 다음에, 당신은 `npm run <command>` 명령어를 통해 서버를 시작할 수 있습니다. (예: `npm run dev`).

<!-- ## Development Environment -->

## 개발 환경

<!-- Then, you can launch your commands via `npm run <command>` (example: `npm run dev`). -->

핫 리로딩과 함께 개발 모드로 Nuxt를 시작하기 위해서:

<!-- ```bash -->
<!-- nuxt -->
<!-- // OR -->
<!-- npm run dev -->
<!-- ``` -->

```bash
nuxt
// 아니면
npm run dev
```

<!-- ## Production Deployment -->

## 프로덕션 환경

<!-- Nuxt.js lets your choose between 2 modes to deploy your application: Server Rendered or Static Generated. -->

Nuxt.js는 당신이 서버 사이드 렌더링 모드 혹은 정적 파일을 생성하는 모드 중 한 가지를 선택할 수 있도록 합니다.

<!-- ### Server Rendered Deployment -->

### 서버 사이드 렌더링 환경

<!-- To deploy, instead of running nuxt, you probably want to build ahead of time. Therefore, building and starting are separate commands: -->

nuxt 명령어를 실행하지 않고 배포하기 위해, 당신은 먼저 빌드하길 원할 것입니다.
그러므로 빌드와 서버 시작 명령어가 서로 분리되어 있습니다.

<!--```bash-->
<!--nuxt build-->
<!--nuxt start-->
<!--```-->

```bash
nuxt build
nuxt start
```

<!-- The `package.json` like follows is recommended: -->

`package.json`는 다음과 같이 작성하는 것을 권장합니다.

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

<!-- Note: we recommend putting `.nuxt` in `.npmignore` or `.gitignore`. -->

메모: 우리는 `.npmignore`이나 `.gitignore`에 `.nuxt`를 작성하길 권고합니다.

<!-- ### Static Generated Deployment -->

### 정적 파일 생성 환경

<!-- Nuxt.js gives you the possibility to host your web application on any static hosting. -->

Nuxt.js는 당신의 웹 어플리케이션을 정적 파일 호스팅 서비스에 호스팅할 수 있게 해줍니다.
우리의 웹 어플리케이션을 정적 파일들로 생성하기 위해서:

<!--```bash-->
<!--npm run generate-->
<!--```-->

```bash
npm run generate
```

<!-- It will create a `dist` folder with everything inside ready to be deployed on a static hosting. -->

이 명령어는 정적 호스팅 서비스에 배포될 모든 파일들이 담긴 `dist` 폴더를 생성할 것입니다.

<!-- If you have a project with [dynamic routes](/guide/routing#dynamic-routes), take a look at the [generate configuration](/api/configuration-generate) to tell nuxt.js how to generate these dynamic routes. -->

만약 당신에게 동적 라우팅이 사용되는 프로젝트가 있다면, nuxt.js에서 동적 라우팅을 생성하기 위해 [generate 설정](/api/configuration-generate)을 살펴보아야 합니다.

<!-- <div class="Alert">When generating your web application with `nuxt generate`, [the context](/api#context) given to [data()](/guide/async-data#the-data-method) and [fetch()](/guide/vuex-store#the-fetch-method) will not have `req` and `res`.</div> -->

<div class="Alert">`nuxt generate` 를 통해 당신의 웹 어플리케이션을 생성할 때、 [data()](/guide/async-data#the-data-method) 와 [fetch()](/guide/vuex-store#the-fetch-method)에 전달되는 [context](/api#context)는 `req` 와 `res`를 가지지 않게됩니다.</div>
