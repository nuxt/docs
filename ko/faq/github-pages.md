---
title: GitHub Pages 에 배포하기
description: GitHub Pages 에 배포하려면?
---

<!-- title: GitHub Pages Deployment -->
<!-- description: How to deploy Nuxt.js on GitHub Pages? -->

<!-- # How to deploy on GitHub Pages? -->

# GitHub Pages 에 배포하려면?

<!-- Nuxt.js gives you the possibility to host your web application on any static hosting like [GitHub Pages](https://pages.github.com/) for example. -->

Nuxt.js를 사용하면, 예를들어 [GitHub Pages](https://pages.github.com/)과 같은 정적호스팅 서비스에서 웹어플리케이션을 호스팅할 수 있습니다.

<!-- To deploy on GitHub Pages, you need to generate your static web application: -->

GitHub Pages에 배포하려면 정적 웹어플리케이션을 생성해야 합니다:

```bash
npm run generate
```

<!-- It will create a `dist` folder with everything inside ready to be deployed on GitHub Pages hosting. -->

이때 `dist` 폴더가 생성되는데, 그 안에 GitHub pages에 배포될 모든것이 들어가 있습니다.

<!-- Branch `gh-pages` for project repository OR branch `master` for user or organization site -->

프로젝트 리포지토리라면 `gh-pages` 브랜치, 사용자 혹은 조직 사이트라면 `master` 브랜치를 지정하세요.

<!-- <p class="Alert Alert--nuxt-green"><b>INFO:</b> If you use a custom domain for your GitHub Pages and put `CNAME` file, it is recommended that CNAME file is put in the `static` directory. [More documentation](/guide/assets#static) about it.</p> -->

<p class="Alert Alert--nuxt-green"><b>정보:</b> GitHub Pages에서 독립도메인을 사용하기 위해서 `CNAME` 파일을 사용한다면, `CNAME` 파일은 `static` 디렉토리에 위치시키는게 좋습니다. 자세한 내용은 [webpack에서 다루지 않는 정적 파일](/guide/assets/#정적-파일-사용)을 참고해 주세요.</p>

<!-- ## Command line deployment -->

## 커맨드라인에서 배포하기

<!-- You can also use [push-dir package](https://github.com/L33T-KR3W/push-dir): -->

[push-dir package](https://github.com/L33T-KR3W/push-dir)를 사용하는 것도 가능합니다:

<!-- First install it via npm: -->

우선은 npm 으로 설치하세요:

```bash
npm install push-dir --save-dev
```

<!-- Add a `deploy` command to your package.json with the branch as `gh-pages` for project repository OR `master` for user or organization site. -->

`deploy` 커맨드를 package.json에 추가해 주세요. 브랜치는 프로젝트 리포지토리라면 `gh-pages` 브랜치를, 사용자 혹은 조직 사이트라면 `master` 브랜치를 지정해 주세요.

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate",
  "deploy": "push-dir --dir=dist --branch=gh-pages --cleanup"
},
```

<!-- Then generate and deploy your static application: -->

자, 정적 어플리케이션을 생성하고 배포하세요!:

```bash
npm run generate
npm run deploy
```
