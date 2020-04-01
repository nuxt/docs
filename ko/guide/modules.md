---
title: 모듈
description: 모듈은 Nuxt.js의 핵심 기능을 확장하고 무한히 통합을 추가할 수 있는 Nuxt.js의 확장입니다.
---

> 모듈은 Nuxt.js의 핵심 기능을 확장하고 무한히 통합을 추가할 수 있는 Nuxt.js의 확장입니다.

## 소개

여러분들은 Nuxt로 프로덕션급 애플리케이션을 개발하면서 프레임워크의 핵심 기능으로는 충분하지 않다는 것을 금방 느끼게 되셨을 겁니다.
Nuxt는 Configuration 옵션과 플러그인으로 확장이 가능하지만,
여러 프로젝트에서 이러한 커스터마이제이션을 유지보수하는 것은 지루하고 반복적이며 시간이 많이 소요되었을 것입니다.
반면, 모든 프로젝트에서 발생하는 요구사항들을 바로 반영한다면 이는 Nuxt를 복잡하고 사용하기 어렵게 만듭니다.

이는 Nuxt가 코어를 쉽게 확장할 수 있는 상위(higher-order) 모듈 시스템을 제공하는 이유 중 하나입니다.
모듈은 간단히 **함수**로서, Nuxt 부팅 시 순차적으로 호출되고,
프레임워크는 각 모듈의 작업이 끝날 때 까지 기다립니다.
이렇게 해서 모듈은 Nuxt의 거의 모든 부분을 커스터마이징할 수 있습니다.
(webpack의 [Tapable](https://github.com/webpack/tapable)에 기반한) Nuxt의 모듈 디자인 덕분에,
모듈은 빌더 초기화 같은 특정 진입점의 훅을 쉽게 등록할 수 있습니다.
모듈은 또한 템플릿을 재정의하고, webpack 로더를 구성하고, CSS 라이브러리를 추가하며, 다른 많은 유용한 작업을 수행할 수 있습니다.

무엇보다도 Nuxt 모듈은 npm 패키지에 통합될 수 있습니다.
이를 통해 모듈을 프로젝트 전반에 걸쳐 재사용하고 Nuxt 커뮤니티와 공유하여 고품질 Nuxt add-on 생태계를 만들 수 있습니다.

모듈은 다음과 같은 경우에 좋습니다:

- **애자일 팀**의 멤버로서 새로운 프로젝트를 신속하게 진행해야 하는 경우
- Google Analytics를 통합하는 것 같은 일반적인 업무 때문에 **이미 있는 것을 다시 만들기에** 질린 경우
- 커뮤니티와 당신의 작업을 **공유**하고 싶은 **오픈 소스** 덕후인 경우
- **품질**과 **재사용성**에 가치를 두는 **기업**의 멤버인 경우
- 보통 짧은 데드라인 앞에서 모든 새로운 라이브러리나 통합(integration)의 세부사항을 파고들 시간이 없는 경우
- 저-레벨 인터페이스에서의 변경사항들에 질렸고, **바로 작동하는** 무언가를 원하는 경우

## Nuxt.js 모듈 리스트

Nuxt.js 팀은 **공식** 모듈을 제공합니다:
- [@nuxt/http](https://http.nuxtjs.org): [ky-universal](https://github.com/sindresorhus/ky-universal)에 기반해 가볍고 범용적인 HTTP 리퀘스트 생성
- [@nuxtjs/axios](https://axios.nuxtjs.org): 안전하고 쉬운 Nuxt.js와 Axios 통합으로 HTTP 요청 가능
- [@nuxtjs/pwa](https://pwa.nuxtjs.org): 엄격한 테스트를 거쳐 업데이트된 안정적인 PWA 솔루션으로 Nuxt를 최대화 
- [@nuxtjs/auth](https://auth.nuxtjs.org): 여러 계획(scheme)과 전략(strategy)를 제공하는 Nuxt.js인증 모듈

커뮤니티가 만든 Nuxt.js 모듈 리스트는 다음 경로에서 보실 수 있습니다:  https://github.com/topics/nuxt-module

## 기본 모듈 작성하기

이미 언급한 모듈들은 단순한 함수일 뿐입니다. 이 함수는 npm 모듈로 패키지화 되거나 프로젝트 소스 코드에 직접 포함될 수 있습니다.

**modules/simple.js**

```js
export default function SimpleModule (moduleOptions) {
  // Write your code here
}

// REQUIRED if publishing the module as npm package
// module.exports.meta = require('./package.json')
```

**`moduleOptions`**

이것은 사용자가 `modules` 배열을 사용할 때 전달되는 객체이고, 그 동작을 커스터마이징하기 위해 사용할 수 있습니다.

**`this.options`**

이를 사용해 Nuxt 옵션에 직접 액세스할 수 있습니다. 이것은 디폴트 옵션이 모두 할당된 사용자의 "nuxt.config.js"의 내용으로, 모듈 간 공유 옵션에 사용할 수 있습니다.

**`this.nuxt`**

이것은 현재 Nuxt 인스턴스에 대한 레퍼런스입니다. 사용 가능한 메소드를 보시려면 [Nuxt](/api/internals-nuxt) 클래스 문서를 참조해주세요.

**`this`**

모듈의 컨텍스트 입니다. 사용 가능한 메소드를 보시려면 [ModuleContainer](/api/internals-module-container) 클래스 문서를 참조해주세요.

**`module.exports.meta`**

npm 패키지로 모듈을 게시하는 경우 이는 **필수** 입니다. Nuxt는 당신의 패키지와 더 잘 작동하기 위해 내부적으로 메타를 사용합니다.

**nuxt.config.js**

```js
export default {
  modules: [
    // Simple usage
    '~/modules/simple'

    // Passing options directly
      ['~/modules/simple', { token: '123' }]
  ]
}
```
그런 다음 Nuxt에 옵션 매개변수를 가진 프로젝트의 특정 모듈을 로드하도록 알려주세요.
더 자세히 보시려면 [모듈 설정](/api/configuration-modules) 문서를 참조해 주세요!

## 비동기 모듈

모든 모듈들이 모든 것을 동기적으로 처리하는 것은 아닙니다. 예를 들어 API를 호출하거나 비동기 IO를 수행하는 모듈을 개발하려 할 수 있습니다. 이를 위해 Nuxt는 프로미스나 콜백을 반환할 수 있는 비동기 모듈을 지원합니다.

### async/await 사용

<div class="Alert Alert--orange">

Be aware that `async`/`await` is only supported in Node.js > 7.2. So if you are a module developer at least warn users about that if using them. For heavily async modules or better legacy support you can use either a bundler to transform it for older Node.js compatibility or a promise method.

</div>

```js
import fse from 'fs-extra'

export default async function asyncModule () {
  // You can do async works here using `async`/`await`
  const pages = await fse.readJson('./pages.json')
}
```

### Return a Promise

```js
import axios from 'axios'

export default function asyncModule () {
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then((routes) => {
      // Do something by extending Nuxt routes
    })
}
```

## Common Snippets

### Top level options

Sometimes it is more convenient if we can use top level options while registering modules in `nuxt.config.js`.
This allows us to combine multiple option sources.

**nuxt.config.js**

```js
export default {
  modules: [
    ['@nuxtjs/axios', { anotherOption: true }]
  ],

  // axios module is aware of this by using `this.options.axios`
  axios: {
    option1,
    option2
  }
}
```

**module.js**

```js
export default function (moduleOptions) {
  // `options` will contain option1, option2 and anotherOption
  const options = Object.assign({}, this.options.axios, moduleOptions)

  // ...
}
```

### Provide plugins

It is common that modules provide one or more plugins when added.
For example [bootstrap-vue](https://bootstrap-vue.js.org) module would require to register itself into Vue.
In such situations we can use the `this.addPlugin` helper.

**plugin.js**

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```

**module.js**

```js
import path from 'path'

export default function nuxtBootstrapVue (moduleOptions) {
  // Register `plugin.js` template
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

### Template plugins

Registered templates and plugins can leverage [lodash templates](https://lodash.com/docs/4.17.4#template) to conditionally change registered plugins output.

**plugin.js**

```js
// Set Google Analytics UA
ga('create', '<%= options.ua %>', 'auto')

<% if (options.debug) { %>
// Dev only code
<% } %>
```

**module.js**

```js
import path from 'path'

export default function nuxtBootstrapVue (moduleOptions) {
  // Register `plugin.js` template
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      // Nuxt will replace `options.ua` with `123` when copying plugin to project
      ua: 123,

      // conditional parts with dev will be stripped from plugin code on production builds
      debug: this.options.dev
    }
  })
}
```

### Add a CSS library

If your module will provide a CSS library, make sure to perform a check if the user already included the library to avoid duplicates, and add **an option to disable** the CSS library in the module.

**module.js**

```js
export default function (moduleOptions) {
  if (moduleOptions.fontAwesome !== false) {
    // Add Font Awesome
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```

### Emit assets

<!-- todo: up2date? -->

We can register webpack plugins to emit assets during build.

**module.js**

```js
export default function (moduleOptions) {
  const info = 'Built by awesome module - 1.3 alpha on ' + Date.now()

  this.options.build.plugins.push({
    apply (compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        // This will generate `.nuxt/dist/info.txt' with contents of info variable.
        // Source can be buffer too
        compilation.assets['info.txt'] = { source: () => info, size: () => info.length }

        cb()
      })
    }
  })
}
```

### Register custom webpack loaders

We can do the same as `build.extend` in `nuxt.config.js` using `this.extendBuild`.

**module.js**

```js
export default function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
      // `.foo` Loader
      config.module.rules.push({
        test: /\.foo$/,
        use: [...]
      })

      // Customize existing loaders
      // Refer to source code for Nuxt internals:
      // https://github.com/nuxt/nuxt.js/tree/dev/packages/builder/src/webpack/base.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```

## Run Tasks on Specific hooks

Your module may need to do things only on specific conditions and not just during Nuxt initialization.
We can use the powerful [Hookable](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/hookable.js) Nuxt.js system to do tasks on specific events.
Nuxt will wait for your function if it return a Promise or is defined as `async`.

Here are some basic examples:

```js
export default function myModule () {
  this.nuxt.hook('modules:done', (moduleContainer) => {
    // This will be called when all modules finished loading
  })

  this.nuxt.hook('render:before', (renderer) => {
    // Called after the renderer was created
  })

  this.nuxt.hook('build:compile', async ({ name, compiler }) => {
    // Called before the compiler (default: webpack) starts
  })

  this.nuxt.hook('generate:before', async (generator) => {
    // This will be called before Nuxt generates your pages
  })
}
```

## Module package commands

**Experimental**

Starting in `v2.4.0`, you can add custom nuxt commands through a Nuxt module's package. To do so, you must follow the `NuxtCommand` API when defining your command. A simple example hypothetically placed in `my-module/bin/command.js` looks like this:

```js
#!/usr/bin/env node

const consola = require('consola')
const { NuxtCommand } = require('@nuxt/cli')

NuxtCommand.run({
  name: 'command',
  description: 'My Module Command',
  usage: 'command <foobar>',
  options: {
    foobar: {
      alias: 'fb',
      type: 'string',
      description: 'Simple test string'
    }
  },
  run (cmd) {
    consola.info(cmd.argv)
  }
})
```

A few things of note here. First, notice the call to `/usr/bin/env` to retrieve the Node executable. Also notice that ES module syntax can't be used for commands unless you manually incorporate [`esm`](https://github.com/standard-things/esm) into your code.

Next, you'll notice how `NuxtCommand.run()` is used to specify the settings and behavior of the command. Options are defined in `options`, which get parsed via [`minimist`](https://github.com/substack/minimist).
Once arguments are parsed, `run()` is automatically called with the `NuxtCommand` instance as first parameter.

In the example above, `cmd.argv` is used to retrieve parsed command-line arguments. There are more methods and properties in `NuxtCommand` -- documentation on them will be provided as this feature is further tested and improved.

To make your command recognizable by the Nuxt CLI, list it under the `bin` section of your package.json, using the `nuxt-module` convention, where `module` relates to your package's name. With this central binary, you can use `argv` to further parse more `subcommands` for your command if you desire.

```js
{
  "bin": {
    "nuxt-foobar": "./bin/command.js"
  }
}
```

Once your package is installed (via NPM or Yarn), you'll be able to execute `nuxt foobar ...` on the command-line.

<div class="Alert">

There are way more hooks and possibilities for modules. Please read the [Nuxt Internals](/api/internals) to find out more about the nuxt-internal API.

</div>
