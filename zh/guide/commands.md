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

你可以将这些命令添加至 `package.json`：

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

这样你可以通过 `npm run <command>` 来执行相应的命令。如: `npm run dev`。

## 开发模式

可通过以下命令以开发模式启动带热加载特性的 Nuxt 服务：

```bash
nuxt
// 或
npm run dev
```

## 发布部署

Nuxt.js 提供了两种发布部署应用的方式：服务端渲染应用部署 和 静态应用部署。

### 服务端渲染应用部署

部署 Nuxt.js 服务端渲染的应用不能直接使用 `nuxt` 命令，而应该先进行编译构建，然后再启动 Nuxt 服务，可通过以下两个命令来完成：

```bash
nuxt build
nuxt start
```

推荐的 `package.json` 配置如下：
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

提示： 建议将 `.nuxt` 加入 `.npmignore` 和 `.gitignore` 文件中。

### 静态应用部署

Nuxt.js 可依据路由配置将应用静态化，使得我们可以将应用部署至任何一个静态站点主机服务商。

可利用下面的命令生成应用的静态目录和文件：

```bash
npm run generate
```

这个命令会创建一个 `dist` 文件夹，所有静态化后的资源文件均在其中。

如果你的项目需要用到[动态路由](/guide/routing#动态路由)，请移步 [generate配置API](/api/configuration-generate) 了解如何让 Nuxt.js 生成此类动态路由的静态文件。 

<div class="Alert">注意：使用 `nuxt generate` 静态化应用的时候, 传给 [asyncData()](/guide/async-data#asyncdata-方法) 和 [fetch()](/guide/vuex-store#fetch-方法) 方法的[上下文对象](/api#上下文对象) 不会包含 `req` 和 `res` 两个属性。</div>
