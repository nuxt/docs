---
title: 설치
description: Nuxt.js는 시작하기 정말 쉽습니다. 간단한 프로젝트는 딱 `nuxt` 디펜던시만 있으면 됩니다.
---

> Nuxt.js는 시작하기 정말 쉽습니다. 간단한 프로젝트는 딱 `nuxt` 디펜던시만 있으면 됩니다.

## Nuxt.js starter 템플릿 사용하기

빠르게 시작하기 위해서 Nuxt.js 팀은 [starter 템플릿](https://github.com/nuxt-community/starter-template)을 만들어뒀습니다.

starter 템플릿을 [.zip로 다운로드](https://github.com/nuxt-community/starter-template/archive/master.zip)하거나 vue-cli로 설치할 수 있습니다:

```bash
$ vue init nuxt-community/starter-template <project-name>
```

> 만약 [vue-cli](https://github.com/vuejs/vue-cli)가 설치되지 않았다면, `npm install -g vue-cli` 명령어로 설치할 수 있습니다.

디펜던시를 설치하고:

```bash
$ cd <project-name>
$ npm install
```

프로젝트를 실행합니다:

```bash
$ npm run dev
```

애플리케이션이 이제 http://localhost:3000 로 실행되었습니다.

<p class="Alert">Nuxt.js는 <code>pages</code> 디렉토리 내의 파일 변경 사항을 수신하므로 새 페이지를 추가 할 때 응용 프로그램을 다시 시작할 필요가 없습니다.</p>

프로젝트의 디렉토리 구조에 대해 자세히 알고싶다면 [디렉토리 구조 문서](/guide/directory-structure)에서 확인할 수 있습니다.

## 처음부터 시작하기

Nuxt.js 애플리케이션을 처음부터 만드는 것 또한 정말 쉽습니다. *1개의 파일과 1개의 디렉토리* 만 있으면 됩니다. 자, 애플리케이션 개발을 시작하기 위해 빈 디렉토리부터 만들어 보겠습니다.

```bash
$ mkdir <project-name>
$ cd <project-name>
```

<p class="Alert Alert--nuxt-green"><b>정보 : </b><code>&lt;project-name&gt;</code>을 프로젝트 이름으로 바꿉니다.</p>

### package.json

프로젝트는 `nuxt`를 어떻게 실행할 것인지를 명시한 `package.json` 파일이 필요합니다:

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```

`scripts`는 `npm run dev` 명령어를 통해 Nuxt.js를 실행할 것입니다.

### `nuxt` 설치하기

처음 `package.json`가 만들어지면, `nuxt`를 npm을 사용해 프로젝트에 추가합니다:

```bash
npm install --save nuxt
```

### `pages` 폴더

Nuxt.js는 `pages` 디렉토리 내의 모든 `*.vue` 파일을 애플리케이션의 라우트로 변환합니다.

`pages` 디렉토리를 생성합니다:

```bash
$ mkdir pages
```

이제 `pages/index.vue`에 첫 번째 페이지를 만들겠습니다:

```html
<template>
  <h1>Hello world!</h1>
</template>
```

프로젝트를 실행합니다:

```bash
$ npm run dev
```

애플리케이션이 이제 http://localhost:3000 로 실행되었습니다.

<p class="Alert">Nuxt.js는 `pages` 디렉토리를 지속적으로 감시하기 때문에 새로운 페이지가 추가되어도 애플리케이션을 다시 시작할 필요가 없습니다.</p>

프로젝트의 디렉토리 구조에 대해 자세히 알고싶다면 [디렉토리 구조 문서](/guide/directory-structure)에서 확인할 수 있습니다.
