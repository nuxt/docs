---
title: 安装
description: Nuxt.js 十分简单易用。一个简单的项目只需将 `nuxt` 添加为依赖组件即可。
---

> Nuxt.js 十分简单易用。一个简单的项目只需将 `nuxt` 添加为依赖组件即可。

## 新手模板

为了便于大家快速使用，Nuxt.js提供了一个 [starter 模板](https://github.com/nuxt-community/starter-template)。

[下载模板的压缩包](https://github.com/nuxt-community/starter-template/archive/master.zip) 或利用 `vue-cli` 安装使用：

```bash
$ vue init nuxt-community/starter-template <project-name>
```

> 如果 [vue-cli](https://github.com/vuejs/vue-cli) 没有安装, 需先通过 `npm install -g vue-cli` 来安装。

然后安装依赖包：

```bash
$ cd <project-name>
$ npm install
```

接着通过以下命令启动项目：
```bash
$ npm run dev
```
应用现在运行在 http://localhost:3000

<p class="Alert">注意：Nuxt.js 会监听 `pages` 目录中的文件变更并自动重启， 当添加新页面时没有必要手工重启应用。</p>

了解模板项目的目录结构： [目录结构](/guide/directory-structure)。

## 从头开始新建项目

如果不使用 Nuxt.js 提供的 starter 模板，我们也可以从头开始新建一个 Nuxt.js 应用项目，过程非常简单，只需要 *1个文件和1个目录*。如下所示：

```bash
$ mkdir <项目名>
$ cd <项目名>
```

*提示: 将 项目名 替换成为你想创建的实际项目名*

### 新建 package.json 文件

`package.json` 文件用来设定如何运行 `nuxt`：
```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```
上面的配置使得我们可以通过运行 `npm run dev` 来运行 `nuxt`。

### 安装 `nuxt`

一旦 `package.json` 创建好， 可以通过以下npm命令将 `nuxt` 安装至项目中：
```bash
npm install --save nuxt
```

### pages 目录

Nuxt.js 会依据 `pages` 目录中的所有 `*.vue` 文件生成应用的路由配置。

创建 `pages` 目录：
```bash
$ mkdir pages
```

创建我们的第一个页面 `pages/index.vue`：
```html
<template>
  <h1>Hello world!</h1>
</template>
```

然后启动项目：
```bash
$ npm run dev
```
Bingo！现在我们的应用运行在 http://localhost:3000

<p class="Alert">注意：Nuxt.js 会监听 `pages` 目录中的文件变更并自动重启， 当添加新页面时没有必要手工重启应用。</p>

了解更多关于Nuxt.js应用的目录结构： [目录结构](/guide/directory-structure)。
