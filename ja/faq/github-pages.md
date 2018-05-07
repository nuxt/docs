---
title: GitHub Pages へデプロイ
description: GitHub Pages へデプロイするには？
---

# GitHub Pages へデプロイするには？

Nuxt.js を使うと、例えば [GitHub Pages](https://pages.github.com/) のような静的ホスティングサービスで、ウェブアプリケーションをホストすることが可能です。

GitHub Pages へデプロイするには、静的なウェブアプリケーションを生成する必要があります:

```bash
npm run generate
```

GitHub Pages のホスティングにデプロイするもの全てが入った
 `dist` フォルダが作成されます。プロジェクトリポジトリであれば `gh-pages` ブランチ、ユーザーや組織のサイトであれば `master` ブランチにデプロイしてください 。

<p class="Alert Alert--nuxt-green"><b>情報:</b> GitHub Pages にカスタムドメインを利用し `CNAME` ファイルを置くのであれば、CNAME ファイルは `static` ディレクトリに置くことをお勧めします。 より詳しい情報は[こちら](/guide/assets#static)を参照してください。</p>

## リポジトリに GitHub Pages をデプロイする

ある特定のリポジトリに GitHub Pages を作成しており、カスタムドメインをお持ちでない場合、ページの URL はこの形式になります:  `http://<username>.github.io/<repository-name>`。

If you deployed `dist` folder without adding [router base](https://nuxtjs.org/api/configuration-router/#base), when you visit the deployed site you will find that the site is not working due to missing assets. This is because we assume that the website root will be `/`, but in this case it is `/<repository-name>`.

この問題を解決するためには、`nuxt.config.js` に [router base](https://nuxtjs.org/api/configuration-router/#base) の設定を追加する必要があります:

```js
module.exports = {
  router: {
    base: '/<repository-name>/'
  }
}
```

This way, all generated path asset will be prefixed with `/<repository-name>/`, and the next time you deploy the code to repository GitHub Pages, the site should be working properly.

There is a downside adding `router.base` as the default setting in `nuxt.config.js` though, when you are running `npm run dev`, it won't be working properly since the base path changes. To fix this issue, we want to create a conditional for `router.base` whether to include `<repository-name>`:

```js
/* nuxt.config.js */
// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/<repository-name>/'
  }
} : {}

module.exports = {
  ...routerBase
}
```

and now we just need to set `DEPLOY_ENV='GH_PAGES'` to build the site for GitHub Pages:

```js
/* package.json */
"scripts": {
  "build:gh-pages": "DEPLOY_ENV=GH_PAGES nuxt build",
  "generate:gh-pages": "DEPLOY_ENV=GH_PAGES nuxt generate"
},
```

For Windows user, you might want to install [cross-env](https://github.com/kentcdodds/cross-env) if you are not using `bash`

```sh
npm install cross-env --save-dev
```

そして、このように使用します:

```js
  "build:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt build",
  "generate:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt generate"
```

## コマンドラインでデプロイする

[push-dir package](https://github.com/L33T-KR3W/push-dir) を使うこともできます:

まず npm でインストールしてください:

```bash
npm install push-dir --save-dev
```

`deploy` コマンドを package.json に追加してください。ブランチは、プロジェクトリポジトリならば `gh-pages` ブランチ、ユーザーまたは組織サイトならば `master` ブランチを指定してください。

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate",
  "deploy": "push-dir --dir=dist --branch=gh-pages --cleanup"
},
```

それから静的なアプリケーションを生成し、デプロイしてください:

```bash
npm run generate
npm run deploy
```

## Build server deployment

You can take deployment one step further and rather than having to manually compile and deploy the files from your local install, you can make use of a build server to monitor your GitHub repository for new commits and then checkout, compile and deploy everything for you automatically.

Before you configure the build server, you'll first need to [generate a GitHub personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/#creating-a-token) in order to grant the build server permission to perform tasks on your behalf. Once you have created your token, keep a copy of it safe ready to use a little later on.

### Travis CI

To deploy with [Travis CI](https://travis-ci.org/), a free for open source projects build server, sign in via your GitHub account, granting Travis access to view your repositories, and then enable the build server for your repository by toggling the switch next to your repositories name in the list displayed.

![Travis Builder Server Enable](/github_pages_travis_01.png)

Next, click the cog icon beside your repository name to configure the general settings of the build sever and enable the 'Build only if .travis.yml is present' feature by toggling the switch.

![Travis Builder Server Settings](/github_pages_travis_02.png)

On the same screen, scroll down to the Environment Variables section and create a new variables named `GITHUB_ACCESS_TOKEN` and in the value field paste a copy of the GitHub personal access token your created earlier and click the 'Add' button.

![Travis Builder Server Environment Variables](/github_pages_travis_03.png)

最後に、以下の内容の `.travis.yml` 設定ファイルをリポジトリのルートに作成します。

```yaml
language: node_js
node_js:
  - "8"

cache:
  directories:
    - "node_modules"

branches:
  only:
  - master

install:
  - npm install
  - npm run generate

script:
  - echo "Skipping tests"

deploy:
  provider: pages
  skip-cleanup: true
  github-token: $GITHUB_ACCESS_TOKEN  # セキュアとマークされたアクセストークンを travis-ci.org のダッシュボードに設定してください。https://docs.travis-ci.com/user/deployment/pages/#Setting-the-GitHub-token
  target-branch: gh-pages
  local-dir: dist
  on:
    branch: master
```

そしてリポジトリにこれをコミットしてください。

```bash
git add .travis.yml
git commit -m "Adding travis deploy configuration"
git push origin
```

Now, whenever you commit any changes to your repository, from within Travis, you'll see a new build start up

![Travis Builder Server Output](/github_pages_travis_04.png)

and on completion, you'll see your GitHub pages site automatically updated.

### Appveyor

To deploy via [Appveyor](https://www.appveyor.com), another free for open source projects build server, sign up for a new account choosing the GitHub authentication option to sign in using your GitHub account.

Once signed in, click the 'New project' link and then click the 'Add' button beside your repository name in the list displayed to enable the build server on your repository.

![Appveyor Builder Server Enable](/github_pages_appveyor_01.png)

Next, in the root of your repository, create an `appveyor.yml` configuration file with the following contents

```yaml
environment:
  # Nuxt requires node v8 minimum
  nodejs_version: "8"
  # Encrypt sensitive data (https://ci.appveyor.com/tools/encrypt)
  github_access_token:
    secure: ENCRYPTED_GITHUB_ACCESS_TOKEN
  github_email:
    secure: ENCRYPTED_GITHUB_EMAIL

# Only run on master branch
branches:
  only:
  - master

# Install scripts. (runs after repo cloning)
install:
  # switch nodejs version
  - ps: Install-Product node $env:nodejs_version
  # install modules
  - npm install
  # generate static files
  - npm run generate
  # configure global git credentials store (https://www.appveyor.com/docs/how-to/git-push/)
  - git config --global credential.helper store
  - ps: Add-Content "$env:USERPROFILE\.git-credentials" "https://$($env:github_access_token):x-oauth-basic@github.com`n"
  - git config --global user.email $env:github_email
  # deploy to GitHub pages
  - npm run deploy

# No tests to run
test: off

# Don't actually build.
build: off
```

***NB*** This configuration assumes you've configured your `package.json` file as per the [Command line deployment](#command-line-deployment) instructions

Before you commit this file however, you'll need to change the `ENCRYPTED_GITHUB_ACCESS_TOKEN` and `ENCRYPTED_GITHUB_EMAIL` variables with your GitHub personal access token from earlier and your GitHub email address, encrypted using the [Appveyor encryption tool](https://ci.appveyor.com/tools/encrypt).

Once updated, commit the file to your repository

```bash
git add appveyor.yml
git commit -m "Adding appveyor deploy configuration"
git push origin
```

Now, whenever you commit any changes to your repository, from within Appveyor, you'll see a new build start up

![Appveyor Builder Server Output](/github_pages_appveyor_02.png)

and on completion, you'll see your GitHub pages site automatically updated.
