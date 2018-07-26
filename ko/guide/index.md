---
title: 소개
description: 2016년 10월 25일, zeit.co의 개발팀은 서버사이드 렌더링 React 애플리케이션을 위한 프레임워크인 Next.js
  프레임워크를 발표했습니다. 발표 몇 시간 뒤, Next.js처럼 서버사이드 렌더링 Vue.js 애플리케이션을 위한 프레임워크를 만들자는 생각이
  들었고, 그렇게 Nuxt.js가 탄생했습니다.
---

> 2016년 10월 25일, [zeit.co](https://zeit.co/)의 개발팀은 서버사이드 렌더링 React 애플리케이션을 위한 프레임워크인 [Next.js](https://zeit.co/blog/next) 프레임워크를 발표했습니다. 발표 몇 시간 뒤, Next.js처럼 서버사이드 렌더링 [Vue.js](https://vuejs.org) 애플리케이션을 위한 프레임워크를 만들자는 생각이 들었고, 그렇게 **Nuxt.js** 가 탄생했습니다.

## What is Nuxt.js?

Nuxt.js는 일반적인 Vue.js 어플리케이션을 만드는 프레임워크 입니다.

주요 범위는 클라이언트/서버 배포를 추상화 하는 동안의 **UI rendering** 입니다.


우리의 목표는 Node.js 기반의 프로젝트 또는 기본 프로젝트 베이스로 사용할 수 있을 만큼 유연한 프레임워크를 만드는 것 입니다.

Nuxt.js는 Vue.js 애플리케이션 **서버 렌더링**을 보다 즐겁게 개발하는 데 필요한 모든 구성을 미리 설정합니다.

또한 우리는 *nuxt generate* 라고 부르는 배포 옵션을 제공하며, 이는 Vue.js 애플리케이션을 **정적으로 생성** 하는 옵션입니다.
이 옵션이 마이크로 서비스를 지향하는 웹 애플리케이션 개발의 다음 단계가 될 수 있다고 생각합니다.

Nuxt.js 프레임워크는 비동기 데이터, 미들웨어, 레이아웃 등과 같이 클라이언트 측과 서버 측 사이에서 개발하는데 도움되는 많은 기능을 제공합니다.

## 어떻게 동작합니까?

![Vue with Webpack and Babel](https://i.imgur.com/avEUftE.png)

Nuxt.js는 훌륭한 웹 애플리케이션을 만들기 위해 아래의 기능들을 포함합니다:

- [Vue 2](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/en/)
- [Vuex](https://vuex.vuejs.org/en/) ([store 옵션](/guide/vuex-store)을 사용하는 경우에만 포함)
- [Vue Server Renderer](https://ssr.vuejs.org/en/) ([`mode: 'spa'`](/api/configuration-mode)를 사용하는 경우에는 제외)
- [vue-meta](https://github.com/declandewet/vue-meta)

총 용량이 **57kB min+gzip** 밖에 되지 않습니다. (53kB  Vuex 포함).

[vue-loader](https://github.com/vuejs/vue-loader)와 [babel-loader](https://github.com/babel/babel-loader)와 함께 [Webpack](https://github.com/webpack/webpack)을 사용해서 코드를 묶고, 분할하며, 압축합니다.

## 특징

- Vue 파일 쓰기 (`*.vue`)
- 코드 분할 자동화
- 서버 사이드 렌더링
- 비동기 데이터 기반의 강력한 라우팅 시스템
- 정적 파일 전송
- ES6/ES7 지원
- JS & CSS 코드 번들링 및 압축
- `<head>` 요소 관리 (`<title>`, `<meta>`, 기타.)
- 개발 중 Hot module 대체
- 전 처리기 지원: SASS, LESS, Stylus 등
- HTTP/2 푸시 헤더 준비
- 모듈식 아키텍처 확장

## 구조

아래의 구조는 `<nuxt-link>`를 서버가 호출하거나 이를 통해 사용자가 이동한 경우, nuxt.js가 어떻게 동작하는지를 보여줍니다:

![nuxt-schema](/nuxt-schema.png)

## 서버 렌더링 (범용 SSR)

프로젝트의 모든 UI렌더링을 처리하는 프레임워크로 Nuxt.js를 사용할 수 있습니다.

`nuxt`를 시작할때 자동으로 서버 렌더링 하도록 구성된 핫 리로드 및 [Vue Server Renderer](https://ssr.vuejs.org/en/)로 개발 서버를 시작합니다.

### Single Page Applications (SPA)

어떤 이유로 든 서버 측 렌더링을 사용하지 않거나 애플리케이션에 정적 호스팅이 필요한 경우 `nuxt --spa`를 사용하여 SPA 모드를 간단하게 사용할 수 있습니다. *generate* 기능과 함께 Node.js 런타임이나 특수 서버 처리를 사용하지 않고도 강력한 SPA 배포 메커니즘을 제공합니다.

이에 대한 자세한 내용을 [명령어](/guide/commands)에서 확인합니다.

이미 서버가있는 경우 Nuxt.js를 미들웨어로 사용하여 플러그 할 수 있습니다. Nuxt.js를 사용하여 Universal Web Applications을 개발할 때 아무런 제한이 없습니다. [프로그래밍 방식으로 Nuxt.js 사용하기 가이드](/api/nuxt)를 참조하십시오.

## 정적 생성 (사전 렌더링)

nuxt.js에서 가장 큰 혁신은 아마 `nuxt generate` 명령어 가 될 것입니다.

이는 애플리케이션을 빌드할 때 모든 라우트를 HTML로 생성하는 명령어 입니다.

예를 들어 다음과 같은 파일 구조가 있습니다:

```
-| pages/
----| about.vue
----| index.vue
```

아래와 같이 생성됩니다:

```
-| dist/
----| about/
------| index.html
----| index.html
```

이렇게 하면 생성된 웹 어플리케이션을 모든 정적 호스팅에서 호스팅 할 수 있습니다 !

가장 좋은 예는 이 웹 사이트 입니다. 이는 GitHub Pages에서 생성되고 호스트 됩니다.:

- [Source code](https://github.com/nuxt/nuxtjs.org)
- [Generated code](https://github.com/nuxt/nuxtjs.org/tree/gh-pages)

우리는 [docs repository](https://github.com/nuxt/docs)가 업데이트될 때마다 수동으로 애플리케이션을 매번 생성하고 싶지 않았고, 그래서 매번 push를 하면 아래의 AWS Lambda를 호출하도록 했습니다:

1. [nuxtjs.org repository](https://github.com/nuxt/nuxtjs.org) Clone
2. `npm install`를 통한 의존성 설치
3. `nuxt generate` 실행
4. `dist` 폴더를 `gh-pages` 브랜치로 Push

우리는 이제 **서버 없는 정적 생성  웹 어플리케이션**를 가졌습니다. :)

우리는 재고가 있거나 없는 경우 항상 웹앱을 `nuxt generate`로 재생성하고 CDN에 호스팅하는 방식의 e-commerce 웹 애플리케이션을 생각해볼 수 있습니다. 만약 사용자가 그동안 웹앱을 탐색한다면, e-commerce API를 호출하면 최신 정보가 제공될 것입니다. 서버의 다중 인스턴스와 캐싱을 더 이상 고민할 필요가 없습니다!

<div class="Alert">깃 허브 페이지에 배포하는 방법에 대한 자세한 내용은 [How to deploy on GitHub Pages?](/faq/github-pages)를 참조하십시오.</div>
