---
title: 如何部署至GitHub Pages？
description: 如何将 Nuxt.js 应用部署至GitHub Pages？
---

# 如何部署至GitHub Pages？

Nuxt.js 允许你将静态化后的站点部署至任何静态站点托管服务中，例如 [GitHub Pages](https://pages.github.com/)。

部署至 GitHub Pages，首先需要将应用静态化：

```bash
npm run generate
```

上述的命令会生成一个 `dist` 目录，该目录包含了待部署的所有资源文件。
如果是项目站点，可以将 `dist` 的内容提交至项目的 `gh-pages` 分支；如果是用户（github.com/user/user.github.io）或组织（github.com/org/org.github.io）站点，需提交至对应 GitHub 项目的 `master` 分支。

<p class="Alert Alert--nuxt-green"><b>提示：</b> 如果你的 GitHub Pages 使用了自定义域名，建议将 `CNAME` 放在 Nuxt.js 应用的 `static` 目录。 可以移步 [`static`](/guide/assets#静态文件) 了解更多信息。</p>

## 使用命令行进行部署

你也可以利用 [push-dir](https://github.com/L33T-KR3W/push-dir) npm 包来部署：

首先安装 `push-dir`：
```bash
npm install push-dir --save-dev
```

然后在 `package.json` 中添加一个 `deploy` 的命令如下：

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate",
  "deploy": "push-dir --dir=dist --branch=gh-pages --cleanup"
},
```

> 注：如果是个人或组织站点，需将上面 `deploy` 命令中的 `--branch` 设置成 `master`。

最后，我们可以通过以下命令来部署应用：
```bash
npm run generate
npm run deploy
```
