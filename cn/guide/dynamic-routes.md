---
title: 动态路由
description: 在 Nuxt.js 里面定义带参数的动态路由，需要创建对应的以下划线作为前缀的 Vue 文件。
---

> 在 Nuxt.js 里面定义带参数的动态路由，需要创建对应的**以下划线作为前缀**的 Vue 文件。

## 目录结构

以下目录结构：

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
```

Nuxt.js 生成对应的路由配置表为：

```js
router: {
  routes: [
    {
      name: 'users',
      path: '/users',
      component: 'pages/users/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id',
      component: 'pages/users/_id.vue'
    }
  ]
}
```

## 路由参数校验

```js
validate({ params, query }) {
  return true // 如果参数有效
  return false // 参数无效返回false，会阻止 Nuex.js 渲染路由对应的视图组件并显示错误页面
}
```

可以在动态路由组件（上例中的 `pages/users/_id.vue`）里面设置 `validate` 方法来实现路由参数的校验。

如果 `validate` 方法不返回 `true`, Nuxt.js 会自动加载404错误页面。

校验示例：

```js
<script>
export default {
  validate ({ params }) {
    // 必须是数字
    return /^\d+$/.test(params.id)
  }
}
</script>
```
