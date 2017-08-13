---
title: 명령어들
description: Nuxt.js는 개발 환경과 프로덕션 목적을 위한 유용한 명령어들이 있습니다.
---

> Nuxt.js는 개발 환경과 프로덕션 환경에 사용되는 유용한 명령어들이 있습니다.

## 명령어 리스트

| 명령어 | 설명 |
|---------|-------------|
| nuxt | 개발서버를 핫 리로딩 상태로 [localhost:3000](http://localhost:3000)에 시작합니다.|
| nuxt build | Webpack을 통해 어플리케이션을 빌드하며, CSS와 JS를 최소화하는 작업을 진행합니다.(프로덕션 용으로) |
| nuxt start | 프로덕션 모드로 서버를 시작합니다.（`nuxt build`를 실행한 후에） |
| nuxt generate | 어플리케이션을 빌드하고 모든 라우트를 HTML 파일로 생성합니다. (정적 호스팅에 사용됩니다.) |

<!-- You should put these commands in the `package.json`: -->

이 명령문들을 `package.json`에 작성하여야 합니다.


```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

그 다음에, 당신은 `npm run <command>` 명령어를 통해 서버를 시작할 수 있습니다. (예: `npm run dev`).

<!-- ## Development Environment -->

## 개발 환경

핫 리로딩과 함께 개발 모드로 Nuxt를 시작하기 위해서:

```bash
nuxt
// 아니면
npm run dev
```

## 프로덕션 배포

Nuxt.js는 서버 사이드 렌더링 모드 혹은 정적 파일을 생성하는 모드 중 한 가지를 선택할 수 있습니다.

### 서버 사이드 렌더링 환경

당신은 nuxt 명령어를 실행하지 않고 배포하기 위해, 빌드를 할 수 있기를 원할 것입니다.
그래서 빌드와 서버 시작 명령어가 서로 분리되어 있습니다.

```bash
nuxt build
nuxt start
```

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

메모: 우리는 `.npmignore`이나 `.gitignore`에 `.nuxt`를 작성하길 권고합니다.

### 정적 파일 생성 환경

Nuxt.js는 당신의 웹 어플리케이션을 정적 파일 호스팅 서비스에 호스팅할 수 있게 해줍니다.
우리의 웹 어플리케이션을 정적 파일들로 생성하기 위해서:

```bash
npm run generate
```

이 명령어는 정적 호스팅 서비스에 배포될 모든 파일들이 담긴 `dist` 폴더를 생성할 것입니다.

만약 당신에게 동적 라우팅이 사용되는 프로젝트가 있다면, nuxt.js에서 동적 라우팅을 생성하기 위해 [generate 설정](/api/configuration-generate)을 살펴보아야 합니다.
<div class="Alert">`nuxt generate` 를 통해 당신의 웹 어플리케이션을 생성할 때、 [data()](/guide/async-data#the-data-method) 와 [fetch()](/guide/vuex-store#the-fetch-method)에 전달되는 [context](/api#context)에는 `req`와 `res`가 포함되지 않습니다.</div>
