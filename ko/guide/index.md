---
title: 소개
description: "2016년 10월 25일, zeit.co의 개발팀은 서버사이드 렌더링 React 애플리케이션을 위한 프레임워크인 Next.js 프레임워크를 발표했습니다. 발표 몇 시간 뒤, Next.js처럼 서버사이드 렌더링 Vue.js 애플리케이션을 위한 프레임워크를 만들자는 생각이 들었고, 그렇게 Nuxt.js가 탄생했습니다."
---

> 2016년 10월 25일, [zeit.co](https://zeit.co/)의 개발팀은 서버사이드 렌더링 React 애플리케이션을 위한 프레임워크인 [Next.js](https://zeit.co/blog/next) 프레임워크를 발표했습니다. 발표 몇 시간 뒤, Next.js처럼 서버사이드 렌더링 [Vue.js](https://vuejs.org) 애플리케이션을 위한 프레임워크를 만들자는 생각이 들었고, 그렇게 **Nuxt.js** 가 탄생했습니다.

## Nuxt.js란 무엇인가?

Nuxt.js는 범용 Vue.js 애플리케이션을 만들기 위한 프레임워크로, 주요 범위는 클라이언트/서버 배포를 추상화하면서 **UI 렌더링** 을 하는 것입니다.

우리의 목표는 Nuxt.js를 기반 프로젝트로 하거나 Node.js 기반의 프로젝트에 추가해서 사용할 수 있도록 충분히 유연한 프레임워크를 만드는 것입니다.

Nuxt.js는 더 즐거운 **서버 사이드 렌더링** Vue.js 애플리케이션 개발을 위해 필요한 모든 설정들이 미리 준비되어있습니다.

또한 우리는 *nuxt generate* 라고 부르는 배포 옵션을 제공하며, 이는 Vue.js 애플리케이션을 **정적으로 생성** 하는 옵션입니다.
이 옵션이 마이크로 서비스를 지향하는 웹 애플리케이션 개발의 다음 단계가 될 수 있다고 생각합니다.

Nuxt.js 프레임워크는 비동기 데이터, 미들웨어, 레이아웃 등과 같이 클라이언트 측과 서버 측 사이에서 개발하는데 도움되는 많은 기능을 제공합니다.

## 어떻게 동작합니까?

![Vue with Webpack and Babel](https://i.imgur.com/avEUftE.png)

Nuxt.js는 훌륭한 웹 애플리케이션을 만들기 위해 아래의 기능들을 포함합니다.:
- [Vue 2](https://github.com/vuejs/vue)
- [Vue-Router](https://github.com/vuejs/vue-router)
- [Vuex](https://github.com/vuejs/vuex) ([store 옵션](/guide/vuex-store)을 사용할 때만 포함됩니다.)
- [Vue-Meta](https://github.com/declandewet/vue-meta)

총 용량은 **28kb min+gzip** 밖에 되지 않습니다. (vuex를 포함하면 31kb입니다.)

[vue-loader](https://github.com/vuejs/vue-loader)와 [babel-loader](https://github.com/babel/babel-loader)와 함께 [Webpack](https://github.com/webpack/webpack)을 사용해서 코드를 묶고, 분할하며, 압축합니다.

## 특징

- Vue 파일 작성
- 코드 분할 자동화
- 서버 사이드 렌더링
- 비동기 데이터 기반의 강력한 라우팅 시스템
- 정적 파일 전송
- ES6/ES7 지원
- JS & CSS 코드 번들링 및 압축
- HTML head 태그 관리
- 개발 단계에서 핫 리로딩 사용하기
- 전 처리기 지원: SASS, LESS, Stylus 등

## 구조

아래의 구조는 `<nuxt-link>`를 서버가 호출하거나 이를 통해 사용자가 이동한 경우, nuxt.js가 어떻게 동작하는지를 보여줍니다.:

![nuxt-schema](/nuxt-schema.png)

## 서버에서 렌더링하기

여러분은 nuxt.js로 프로젝트의 모든 UI 렌더링을 처리할 수 있습니다.

`nuxt`가 실행될 때, nuxt는 핫 리로딩과 애플리케이션이 자동으로 서버 사이드 렌더링되도록 하는 vue-server-renderer가 포함된 개발 서버를 실행합니다.

이에 대한 자세한 내용을 [명령어](/guide/commands)에서 확인합니다.

만약 이미 서버가 있다면, nuxt.js를 미들웨어로 사용할 수 있지만 제약이 많을 경우 [Nuxt.js를 프로그램적으로 사용하기](/api/nuxt) 가이드를 참고합니다.

## 정적 파일로 생성하기

nuxt.js에서 가장 큰 혁신은 아마 `nuxt generate` 명령어 가 될 것입니다.

이는 애플리케이션을 빌드할 때 모든 라우트를 HTML로 생성하는 명령어 입니다.

예를 들어:

```bash
-| pages/
----| about.vue
----| index.vue
```

위의 라우트는 아래와 같이 생성될 것입니다:
```
-| dist/
----| about/
------| index.html
----| index.html
```

이는 여러분이 어느 정적 파일 호스팅에서든 웹 애플리케이션을 호스팅할 수 있다는 뜻입니다!

가장 좋은 예는 이 웹사이트로, GitHub 페이지에 호스팅 및 생성되었습니다.
- [소스 코드](https://github.com/nuxt/nuxtjs.org)
- [생성된 코드](https://github.com/nuxt/nuxtjs.org/tree/gh-pages)

우리는 [docs repository](https://github.com/nuxt/docs)가 업데이트될 때마다 수동으로 애플리케이션을 매번 생성하고 싶지 않았고, 그래서 매번 push를 하면 아래의 AWS Lambda를 호출하도록 했습니다.:
1. [nuxtjs.org repository](https://github.com/nuxt/nuxtjs.org)를 clone 합니다.
2. `npm install`을 통해 디펜던시를 설치합니다.
3. `nuxt generate`를 실행합니다.
4. `dist` 폴더를 `gh-pages` 브랜치에 push 합니다.

이제 우리는 **서버가 없는 정적 웹 애플리케이션** 을 가지게 되었습니다!

우리는 재고나 있거나 없는 경우 항상 웹앱을 `nuxt generate`로 재생성하고 CDN에 호스팅하는 방식의 e-commerce 웹 애플리케이션을 생각해볼 수 있습니다. 만약 사용자가 그동안 웹앱을 탐색한다면, e-commerce API를 호출하면 최신 정보가 제공될 것입니다. 서버의 다중 인스턴스와 캐싱을 더 이상 고민할 필요가 없습니다!
