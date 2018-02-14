---
title: "API: performance 프로퍼티"
description: nuxt.js performance 옵션을 설정해봅시다
---

# performance 프로퍼티

> Nuxt.js는 사용자의 nuxt.js performance 옵션을 설정합니다.

## gzip

- 타입: `Boolean` or `Object`
- 기본값:

```js
{
  threshold: 0
}
```

프로덕션 모드일 경우, nuxt.js는 [compression](https://github.com/expressjs/compression) 모듈에 의해 모든 assets이 gzip될 것입니다.

만약 [CloudFare](https://www.cloudflare.com/)와 같은 서비스를 사용할 경우, 이미 gzip으로 response 가 동작할 것이고, `nuxt.config.js`의 수정으로 이를 제어할 수 있습니다:
```js
module.exports = {
  performance: {
    gzip: false
  }
}
```

## prefetch

- 타입: `Boolean`
- 기본값: `true`

프로덕션 모드일 경우, nuxt.js는 [prefetch](https://www.w3.org/TR/resource-hints/#dfn-prefetch) 전략을 사용하여 다음 페이지에서 요구되는 번들을 미리 가져옵니다. 사용자가 링크를 클릭한 경우, nuxt.js는 이미 페이지를 미리 가져왔기 때문에 탐색을 할 때, 분할된 코드가 계속 유지되는 것처럼 느껴질 것입니다.

`prefetch` 특징을 예로 들겠습니다 (페이지가 랜더될 때의`<head>` 내부):

```html
<link rel="prefetch" href="/_nuxt/0.nuxt.bundle.61ba3fe4687aed56a098.js">
<link rel="prefetch" href="/_nuxt/1.nuxt.bundle.0e300058ecb654f36fb7.js">
<link rel="prefetch" href="/_nuxt/2.nuxt.bundle.2617656a084bb6760331.js">
```

사용하지 않기를 원한다면, `nuxt.config.js`에 다음과 같이 추가합니다:

```js
module.exports = {
  performance: {
    prefetch: false
  }
}
```
