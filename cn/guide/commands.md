---
title: 命令
description: Nuxt.js 提供了一系列常用的命令, 用于开发或发布部署。
---

> Nuxt.js 提供了一系列常用的命令, 用于开发或发布部署。

## 命令列表

| 命令 | 描述 |
|---------|-------------|
| nuxt | 启动一个热加载的Web服务器（开发模式） [localhost:3000](http://localhost:3000)。 |
| nuxt build | 利用webpack编译应用，压缩JS和CSS资源（发布用）。 |
| nuxt start | 以生成模式启动一个Web服务器 (`nuxt build` 会先被执行)。 |
| nuxt generate | 编译应用，并依据路由配置生成对应的HTML文件 (用于静态站点的部署)。 |

你可以将这些命令添加至 `package.json`:

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

这样你可以通过 `npm run <command>` 来执行相应的命令。如: `npm run dev`。

## 发布部署

部署时，有时候会有提前编译的需求（部署前用于检查编译是否正常），因此Nuxt.js将编译和启动应用分成了两个独立的命令：

```bash
nuxt build
nuxt start
```

举个用 [now.sh](https://zeit.co/now) 部署的栗子， 推荐的`package.json` 配置如下:
```json
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```

配置完毕后运行 `now` 即可！

注意: 推荐将 `.nuxt` 目录加入到 `.npmignore` 和 `.gitignore` 文件中去。

## 静态站点部署

Nuxt.js 可依据路由配置将应用静态化，使得我们可以将应用部署至任何一个静态站点主机服务商（如[surge.sh](https://surge.sh/) 或Github的gh-pages）

要部署至[surge.sh](https://surge.sh/), 需先安装surge:
```bash
npm install -g surge
```

然后利用下面的命令生成应用的静态文件:

```bash
npm run generate
```

这个命令会创建一个 `dist` 文件夹，所有静态化后的资源文件均在其中。

接下来可以通过`surge`命令将整个`dist`目录部署至[surge.sh](https://surge.sh/):

```bash
surge dist/
```

嘿嘿，大功告成 :)

如果你的项目需要用到[动态路由](/guide/dynamic-routes)，请移步[generate配置](/api/configuration-generate)了解如果让nuxt.js生成此类动态路由。 

<div class="Alert">注意：使用 `nuxt generate` 静态化应用的时候, 传给 [data()](/guide/async-data#the-data-method) 和 [fetch()](/guide/vuex-store#the-fetch-method) 方法的[上下文对象](/api/pages-context) 不会包含 `req` 和 `res` 两个属性.</div>
