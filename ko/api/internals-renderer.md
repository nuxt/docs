---
title: "API: Renderer Class"
description: Nuxt Renderer Class
---

- 소스: **[vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)**

이 클래스는 모든 SSR 및 애셋 요청을 처리하고 제공하는 연결 미들웨어(connect middleware)를 내보냅니다.


## 훅

특정 라이프사이클 이벤트에 훅을 등록할 수 있습니다.


훅                        | 인자                     | 시기
--------------------------|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 `render:before`          | (renderer, options)      | Renderer 클래스에 대한 미들웨어 및 리소스를 설정하기 전에 일부 메서드 또는 옵션을 오버로드하는 데 유용.
 `render:setupMiddleware` | (app) *connect instance* | Nuxt가 미들웨어 스택을 추가하기 전. 사용자 지정 서버 측 미들웨어를 등록하는 데 사용.
 `render:errorMiddleware` | (app) *connect instance* | Nuxt가 에러 미들웨어 스택을 추가하기 전. 사용자 지정 에러 미들웨어를 등록하는 데 사용. [Sentry module](https://github.com/nuxt-community/sentry-module/blob/v4.0.3/lib/module.js#L151)을 참조.
 `render:resourcesLoaded` | (resources)              | Renderer에 대한 리소스가 로드된 후 호출 (client manifest, server bundle 등).
 `render:done`            |  (renderer)              | SSR 미들웨어와 모든 리소스가 준비되었을 때(Renderer ready)
 `render:routeContext`    |  (context.nuxt)          | *라우트가 서버에서 렌더링되고 `render:route`훅 전에*. `window.__NUXT__`로 Nuxt 컨텍스트를 시리얼라이즈 하기 전 호출. 클라이언트 사이드에서 가져올 데이터를 추가하는 데 유용.
 `render:route`           |  (url, result, context)  | *라우트가 서버에서 렌더링될 때*. 요청을 브라우저로 다시 보내기 전에 호출.
 `render:beforeResponse`  |  (url, result, context)  | *라우트가 서버에서 렌더링될 때*. 응답 시 `.end(...)`를 호출하기 전 호출.
 `render:routeDone`       |  (url, result, context)  | *라우트가 서버에서 렌더링될 때*. 응답이 브라우저로 전송된 후 호출. 
