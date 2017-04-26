---
title: "API: Nuxt(options)"
description: nuxt.js 의 programmatically 을 사용하면, 렌더링 시 원하는 방식으로 서버를 구성할 수 있는 미들웨어로 사용할 수 있습니다.
---

# Nuxt.js Programmatically 사용
<!--# Using Nuxt.js Programmatically-->

미들웨어와 API 만을 사용하여 서버를 구성해야 할 수도 있기에, Nuxt.js 에서는 Programmatically 방식을 제공합니다.
Nuxt.js 는 코드가 좀 더 재미있고, 깔끔하게 읽을 수 있게 만들어주는 ES2015 를 기반으로 구현되었습니다. 코드는 별다른 트랜스파일러를 사용하지 않으며, 코어 V8 엔진에만 의존합니다. 때문에 Nuxt.js 는 Node.js `4.0` 또는 `그 이상의 버전` 을 대상으로 합니다.

<!--You might want to use your own server with your middleware and your API. That's why you can use Nuxt.js programmatically.
Nuxt.js is built on the top of ES2015, which makes the code more enjoyable and cleaner to read. It doesn't make use of any transpilers and depends upon Core V8 implemented features. For these reasons, Nuxt.js targets Node.js `4.0` or higher.-->

require 를 통해 Nuxt.js 를 사용할 수 있습니다.
<!--You can require Nuxt.js like this:-->
```js
const Nuxt = require('nuxt')
```

## Nuxt(options)

Nuxt.js 의 옵션을 보려면, configuration section 을 확인해보세요.
<!--To see the list of options to give to Nuxt.js, see the configuration section.-->

```js
const options = {}

const nuxt = new Nuxt(options)
nuxt.build()
.then(() => {
  // nuxt.render(req, res) 또는 nuxt.renderRoute(route, context) 를 사용할 수 있습니다.
})
```
[nuxt-express](https://github.com/nuxt/express), [adonuxt](https://github.com/nuxt/adonuxt) 를 사용하면 빠르게 시작할 수 있습니다.

<!--You can take a look at the [nuxt-express](https://github.com/nuxt/express) and [adonuxt](https://github.com/nuxt/adonuxt) starters to start quickly.-->

### 디버그 로그
<!--### Debug logs-->

nuxt.js 로그가 화면에 표시되는 것을 원한다면, 파일의 최상단에 아래와 같은 코드를 추가하시면 됩니다.
<!--If you want to display nuxt.js logs, you can add to the top of your file:-->

```js
process.env.DEBUG = 'nuxt:*'
```
