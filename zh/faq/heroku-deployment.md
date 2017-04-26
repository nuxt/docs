---
title: 部署至 Heroku
description: 如何将 Nuxt 应用部署至 Heroku?
---

# 如何将 Nuxt 应用部署至 Heroku？

推荐先去了解下 [在 Heroku 里部署 node.js 应用的文档](https://devcenter.heroku.com/articles/nodejs-support)。

首先，我们需要告诉 Heroku 安装项目的开发依赖包 `devDependencies` (以便能在 Heroku 环境下运行 `npm run build`)：
```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
```

同时，我们想让应用以 `生产模式` 运行，绑定的主机IP为 `0.0.0.0`：
```bash
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production
```

配置完毕后可以在 Heroku 管理后台看到以下内容 (设置界面)：

![nuxt 在 Heroku 的配置变量](https://i.imgur.com/EEKl6aS.png)

然后，通过在 `package.json` 里面添加 `heroku-postbuild` 脚本让 Heroku 运行 `npm run build` 命令：
```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "heroku-postbuild": "npm run build"
}
```

最后，使用以下命令将应用源码推送至 Heroku：
```bash
git push heroku master
```

嘿嘿！现在你的 nuxt.js 应用已成功部署至 Heroku！
