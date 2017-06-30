---
title: 路由
description: Nuxt.js 依据页面文件的目录结构来生成应用的路由配置， 和上世纪宇宙最强开发语言PHP创建路由的方式一样的简单。
---

> Nuxt.js 依据 `pages` 目录结构自动生成 [vue-router](https://github.com/vuejs/vue-router) 模块的路由配置。

## 基础路由

假设 `pages` 的目录结构如下：

```bash
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

那么，Nuxt.js 自动生成的路由配置如下：

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

## 动态路由

在 Nuxt.js 里面定义带参数的动态路由，需要创建对应的**以下划线作为前缀**的 Vue 文件 或 目录。

以下目录结构：

```bash
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

Nuxt.js 生成对应的路由配置表为：

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

你会发现名称为 `users-id` 的路由路径带有 `:id?` 参数，表示该路由是可选的。如果你想将它设置为必选的路由，需要在 `users/_id` 目录内创建一个 `index.vue` 文件。

### 路由参数校验

Nuxt.js 可以让你在动态路由组件中定义参数校验方法。

举个例子： `pages/users/_id.vue`

```js
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
```

如果校验方法返回的值不为 `true`， Nuxt.js 将自动加载显示 404 错误页面。

想了解关于路由参数校验的信息，请参考 [页面校验API](/api/pages-validate)。

## 嵌套路由

你可以通过 vue-router 的子路由创建 Nuxt.js 应用的嵌套路由。

创建内嵌子路由，你需要添加一个 Vue 文件，同时添加一个**与该文件同名**的目录用来存放子视图组件。

<p class="Alert Alert--info">别忘了在父级 Vue 文件内增加 `<nuxt-child/>` 用于显示子视图内容。</p>

假设文件结构如：

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

Nuxt.js 自动生成的路由配置如下：

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

## 动态嵌套路由

这个应用场景比较少见，但是 Nuxt.js 仍然支持：在动态路由下配置动态子路由。

假设文件结构如下：

```bash
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue
```

Nuxt.js 自动生成的路由配置如下：

```js
router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```

## 过渡动效

Nuxt.js 使用 Vue.js 的[&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components)组件来实现路由切换时的过渡动效。

### 全局过渡动效设置

<p class="Alert Alert--info">Nuxt.js 默认使用的过渡效果名称为 `page`</p>

如果想让每一个页面的切换都有淡出 (fade) 效果，我们需要创建一个所有路由共用的 CSS 文件。所以我们可以在 `assets/` 目录下创建这个文件：

在全局样式文件 `assets/main.css` 里添加一下样式：
```css
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}
```

然后添加到 `nuxt.config.js` 文件中：
```js
module.exports = {
  css: [
    'assets/main.css'
  ]
}
```

关于过渡效果 `transition` 属性配置的更多信息可参看 [页面过渡效果API](/api/pages-transition)。

### 页面过渡动效设置

如果想给某个页面自定义过渡特效的话，只要在该页面组件中配置 `transition` 字段即可：

在全局样式 `assets/main.css` 中添加一下内容：
```css
.test-enter-active, .test-leave-active {
  transition: opacity .5s;
}
.test-enter, .test-leave-active {
  opacity: 0;
}
```

然后我们将页面组件中的 `transition` 属性的值设置为 `test` 即可：
```js
export default {
  transition: 'test'
}
```

关于过渡效果 `transition` 属性配置的更多信息可参看 [页面过渡效果API](/api/pages-transition)。

## 中间件

> 中间件允许您定义一个自定义函数运行在一个页面或一组页面渲染之前。

每一个中间件应放置在 `middleware/` 目录。文件名的名称将成为中间件名称(`middleware/auth.js`将成为 `auth` 中间件)。

一个中间件接收 [context](/api#上下文对象) 作为第一个参数：

```javascript
export default function (context) {
  context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
}
```  

中间件执行流程顺序：

1. `nuxt.config.js`
2. 匹配布局
3. 匹配页面

中间件可以异步执行,只需要返回一个 `Promise` 或使用第2个 `callback` 作为第一个参数：

`middleware/stats.js`

```javascript
import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
``` 

然后在你的 `nuxt.config.js` 、 layouts 或者 pages 中使用中间件:

`nuxt.config.js`

```javascript
module.exports = {
  router: {
    middleware: 'stats'
  }  
}
```

`stats` 中间件将在每个路由改变时被调用。

如果你想看到一个使用中间件的真实例子，请参阅在 GitHub 上的[example-auth0](https://github.com/nuxt/example-auth0)。
