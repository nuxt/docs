---
title: "API: 캐시 프로퍼티"
description: Nuxt.js는 더 나은 랜더 성능을 위해 lru-cache로 컴포넌트 캐시를 허용합니다.
---

# 캐시 프로퍼티

> Nuxt.js는 더 나은 랜더 성능을 위해 [lru-cache](https://github.com/isaacs/node-lru-cache)로 컴포넌트 캐시를 허용합니다.

## 사용법

- 타입: `Boolean` or `Object` (Default: `false`)

만약 타입이 object라면 [lru-cache options](https://github.com/isaacs/node-lru-cache#options)를 참고하세요:

`nuxt.config.js` 안에 정의된 `cache`키를 사용합니다.
```js
module.exports = {
  cache: true
  // 또는
  cache: {
    max: 1000,
    maxAge: 900000
  }
}
```

만약 `cache`의 기본키가 `true`로 주어진다면:

| key  | Optional? | Type | Default | definition |
|------|------------|-----|---------|------------|
| `max` | Optional | Integer | 1000 | 캐시된 컴포넌트 최대 사이즈를 넘는 1001이 입력되었을 때, 새로운 데이터의 공간을 위해 제일 처음 입력된 값이 지워집니다. |
| `maxAge` | Optional | Integer | 900000 | 기본 값은 15분입니다. |
