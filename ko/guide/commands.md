---
title: 명령어들
description: Nuxt.js는 개발 환경과 프로덕션 환경에 사용되는 유용한 명령어들이 있습니다.
---

> Nuxt.js는 개발 환경과 프로덕션 환경에 사용되는 유용한 명령어들이 있습니다.

## 명령어 리스트

|     명령어    |                                             설명                                                  |
|---------------|---------------------------------------------------------------------------------------------------|
| nuxt          | 개발서버를 핫 리로딩 상태로 [localhost:3000](http://localhost:3000)에 시작합니다.                 |
| nuxt build    | Webpack을 통해 어플리케이션을 빌드하며, CSS와 JS를 minify하는 작업을 진행합니다.(프로덕션 용으로) |
| nuxt start    | 프로덕션 모드로 서버를 시작합니다.（`nuxt build`를 실행한 후에）                                  |
| nuxt generate | 어플리케이션을 빌드하고 모든 라우트를 HTML 파일로 생성합니다. (정적 호스팅에 사용됩니다.)         |

#### 인자

어떤 코멘트의 자세한 사용법을 알기 위해 `--help`를 사용할 수 있습니다. 일반적인 인자들은:

- **`--config-file` 나 `-c`:** `nuxt.config.js` 파일의 경로를 알려줍니다.
- **`--spa` 나 `-s`:** 서버 사이드 렌더링을 비활성화하고 SPA 모드에서 작동합니다.
- **`--unix-socket` 나 `-n`:** UNIX 소켓으로의 경로를 알려줍니다.

#### Hooks

| Hook                | Objective                                                                 |
|---------------------|---------------------------------------------------------------------------|
|   `cli:buildError`  | 개발 모드에서 빌드 에러를 가져와 로딩 스크린에 보여줍니다.                |

#### package.json에서 사용

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

<div class="Alert Alert--nuxt-green">

<b>Pro tip:</b> npm 커맨드에 인자들을 보내기 위해서는, 여러분은 추가적인 <code>--</code> 스크립트명이 필요합니다(예: <code>npm run dev -- --spa</code>).

</div>

## 개발 환경

핫 리로딩과 함께 개발 모드로 Nuxt를 시작하기 위해서:

```bash
nuxt
// 아니면
npm run dev
```

## 프로덕션 배포

Nuxt.js는 서버 사이드 렌더링 모드 혹은 정적 파일을 생성하는 모드 중 한 가지를 선택할 수 있습니다.

### 서버 사이드 렌더링 환경 (Universal SSR)

여러분은 `nuxt` 명령어를 실행하지 않고 배포하기 위해, 빌드를 할 수 있기를 원할 것입니다.
그래서 빌드와 서버 시작 명령어가 서로 분리되어 있습니다.

```bash
nuxt build
nuxt start
```

You can also set `server.https` in your `nuxt.config.js` with the same set of options passed to [`https.createServer`](https://nodejs.org/api/https.html), should you choose to serve Nuxt.js in HTTPS mode.
Unix sockets are also available if you set the `server.socket` option in `nuxt.config.js` (or `-n` in the [CLI](https://nuxtjs.org/guide/commands#list-of-commands)).
When using [Unix sockets](https://en.wikipedia.org/wiki/Berkeley_sockets), make sure not to set the `host` and `port` parameters otherwise the `socket` parameter is ignored.

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


To return a non-zero status code when a page error is encountered and let the CI/CD fail the deployment or build, you can use the `--fail-on-error` argument.

```bash
npm run generate --fail-on-error

// OR

yarn generate --fail-on-error
```

만약 당신에게 동적 라우팅이 사용되는 프로젝트가 있다면, nuxt.js에서 동적 라우팅을 생성하기 위해 [generate 설정](/api/configuration-generate)을 살펴보아야 합니다.
<div class="Alert">

`nuxt generate` 를 통해 당신의 웹 어플리케이션을 생성할 때、 [data()](/guide/async-data#the-data-method) 와 [fetch()](/guide/vuex-store#the-fetch-method)에 전달되는 [context](/api#context)에는 `req`와 `res`가 포함되지 않습니다.

</div>

### Single Page Application Deployment (SPA)

`nuxt generate` still needs its SSR engine during build/generate time while having the advantage of having all our pages pre rendered, and have a high SEO and page load score. The content is generated at *build time*. For example, we can't use it for applications where content depends on user authentication or a real time API (at least for the first load).

The SPA idea is simple! When SPA mode is enabled using `mode: 'spa'` or `--spa` flag, and we run build, generation automatically starts after the build. This generation contains common meta and resource links, but not page content.

So, for an SPA deployment, you must do the following:

 - Change `mode` in `nuxt.config.js` to `spa`.
 - Run `npm run build`.
 - Deploy the created `dist/` folder to your static hosting like Surge, GitHub Pages or nginx.

Another possible deployment method is to use Nuxt as a middleware in frameworks while in `spa` mode. This helps reduce server load and uses Nuxt in projects where SSR is not possible.

<div class="Alert">

Read our [FAQ](/faq) and find nifty examples for deployments to popular hosts.

</div>
