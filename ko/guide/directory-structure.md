---
title: 디렉토리 구조
description: Nuxt.js 어플리케이션의 기본 구조는 작고 큰 어플리케이션 모두를 위해 고안되었습니다.
---

> Nuxt.js 어플리케이션의 기본 구조는 작고 큰 어플리케이션 모두를 위해 고안되었습니다. 그렇지만 당연히 자유롭게 구성할 수도 있습니다.

## 디렉토리

### Assets 디렉토리

`assets` 디렉토리는 LESS, SASS, Javascript 같은 컴파일되지 않은 에셋들을 포함하는 디렉토리 입니다.

[Assets의 동작에 대한 문서](/guide/assets)

### Components 디렉토리

`components` 디렉토리는 Vue.js 컴포넌트를 포함하는 디렉토리 입니다. Nuxt.js는 이러한 컴포넌트에 데이터 메소드를 크게 신경쓰지 않습니다.

### Layouts 디렉토리

`layouts` 디렉토리는 애플리케이션의 레이아웃을 포함하는 디렉토리 입니다.

_이 디렉토리 이름은 변경할 수 없습니다._

[Layouts의 동작에 대한 문서](/guide/views#layouts)

### Middleware 디렉토리

`middleware` 디렉토리는 애플리케이션의 미들웨어를 포함하는 디렉토리 입니다. 미들웨어는 페이지나 레이아웃이 렌더링되기 전에 실행할 사용자 정의 함수를 정의할 수 있습니다.

[Middleware의 동작에 대한 문서](/guide/routing#middleware)

### Pages 디렉토리

`pages` 디렉토리는 애플리케이션의 뷰와 라우트를 포함하는 디렉토리 입니다. Nuxt.js는 모든 `.vue` 파일을 읽고 애플리케이션의 라우터를 생성합니다.

_이 디렉토리 이름은 변경할 수 없습니다._

[Pages의 동작에 대한 문서 ](/guide/views)

### Plugins 디렉토리

`plugins` 디렉토리는 루트 vue.js 애플리케이션이 생성되기 전 실행하고 싶은 자바스크립트 플러그인을 포함하는 디렉토리 입니다.

[Plugins의 동작에 대한 문서](/guide/plugins)

### Static 디렉토리

`static` 디렉토리는 정적 파일들을 포함하는 디렉토리 입니다. 이 디렉토리의 파일들은 /에 연결됩니다.

**예를 들어,:** /static/robots.txt 은 /robots.txt 로 연결됩니다.

_이 디렉토리 이름은 변경할 수 없습니다._

[Static의 동작에 대한 문서](/guide/assets#static)

### Store 디렉토리

`store` 디렉토리는 [Vuex Store](http://vuex.vuejs.org) 파일을 포함하는 디렉토리 입니다. Vuex Store 옵션은 Nuxt.js 프레임워크에 의해 실행되며, `index.js` 파일을 생성하면 프레임워크가 자동으로 옵션을 활성화합니다.

_이 디렉토리 이름은 변경할 수 없습니다._

[Store의 동작에 대한 문서](/guide/vuex-store)

### nuxt.config.js 파일

`nuxt.config.js` 파일은 Nuxt.js의 사용자 정의 설정을 포함하는 파일 입니다.

_이 파일의 이름은 변경할 수 없습니다._

[nuxt.config.js의 동작에 대한 문서](/guide/configuration)

### package.json 파일

`package.json` 애플리케이션의 의존성과 스크립트를 포함하는 파일 입니다.

_이 파일의 이름은 변경할 수 없습니다._

## 별칭

| 별칭 | 디렉토리 |
|-----|------|
| `~` or `@` | [srcDir](/api/configuration-srcdir) |
| `~~` or `@@` | [rootDir](/api/configuration-rootdir) |

설정을 변경하지 않았다면, `srcDir` 은 `rootDir` 와 같습니다.

<p class="Alert Alert--nuxt-green"><b>INFO:</b> `vue` 템플릿 내에서 `assets` 이나 `static` 디렉토리에 링크할 필요가 있다면 `~assets/your_image.png`, `~static/your_image.png` 처럼 입력해야 합니다.</p>
