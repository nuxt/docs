---
title: 插件
description: 你可以配置需要在 `根vue.js应用` 实例化之前需要运行的 Javascript 插件，可以是你自己写的库或第三方模块。
---

> 你可以配置需要在 `根vue.js应用` 实例化之前需要运行的 Javascript 插件，可以是你自己写的库或第三方模块。

<div class="Alert">

需要注意的是，在任何 Vue 组件的[生命周期](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram)内， 只有 `beforeCreate` 和 `created` 这两个钩子方法会在 **客户端和服务端均被调用**。其他钩子方法仅在客户端被调用。

</div>

## 使用第三方模块

我们可以在应用中使用第三方模块，一个典型的例子是在客户端和服务端使用 [axios](https://github.com/mzabriskie/axios) 做 HTTP 请求。

首先我们需要安装 npm 包：

```bash
npm install --save axios
```

然后在页面内可以这样使用：

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
</script>
```

有一个**值得注意的问题**是，如果我们在另外一个页面内也引用了 `axios`，那么在应用打包发布的时候 `axios` 会被打包两次，而实际上我们只需要打包一次。这个问题可以通过在 `nuxt.config.js` 里面配置 `build.vendor` 来解决：

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

经过上面的配置后，我们可以在任何页面里面引入 `axios` 而不用担心它会被重复打包。

## 使用 Vue 插件

假如我们想使用 [vue-notifications](https://github.com/se-panfilov/vue-notifications) 显示应用的通知信息，我们需要在程序运行前配置好这个插件。

首先增加文件 `plugins/vue-notifications.js`：
```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

然后, 在 `nuxt.config.js` 内配置 `plugins` 如下：
```js
module.exports = {
  plugins: ['~/plugins/vue-notifications']
}
```

想了解更多关于 `plugins` 的配置方法，请参考 [插件 API 文档](/api/configuration-plugins)。

实际上， `vue-notifications` 会被打包至应用的脚本代码里， 但是它属于第三方库，我们理应将它打包至库文件里以获得更好的缓存效果。（译者注：应用代码比库文件修改频繁，应尽量将第三方库打包至单独的文件中去）。

我们可以更新 `nuxt.config.js` 文件，在 `vendor` 构建配置项里添加 `vue-notifications`：
```js
module.exports = {
  build: {
    vendor: ['~/plugins/vue-notifications']
  },
  plugins: ['~/plugins/vue-notifications']
}
```

## 注入 $root 和 context

有时您希望在应用程序中提供功能或参数值。您可以将这些变量注入Vue实例（客户端），context（服务器端）甚至Vuex存储中。在Nuxt.js中使用前缀`$`为这些函数添加注入。

### 注入 Vue 实例

将内容注入Vue实例，避免重复引入，在Vue原型上挂载注入一个函数，所有组件内都可以访问(**不包含服务器端**)。

`plugins/vue-inject.js`:

```js
import Vue from 'vue'

Vue.prototype.$myInjectedFunction = (string) => console.log("This is an example", string)
```

`nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/vue-inject.js']
}
```

这时，您现在可以在所有Vue组件中使用该函数。

`example-component.vue`:

```js
export default {
  mounted(){
    this.$myInjectedFunction('test')
  }
}
```

### 注入 context

将内容注入context，避免重复引入，在`app`上挂载注入一个函数，所有组件内都可以访问(**不包含客户端**)。

`plugins/ctx-inject.js`:

```js
export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  app.myInjectedFunction = (string) => console.log('Okay, another function', string)
}
```

`nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/ctx-inject.js']
}
```

只要您有权访问context，该函数现在就可用（例如在`asyncData`和`fetch`中）。

`ctx-example-component.vue`:

```js
export default {
  asyncData(context){
    context.app.myInjectedFunction('ctx!')
  }
}
```

### 联合注入

如果您需要在`context`中,`Vue`实例，甚至可能在`Vuex store`中，您可以使用`inject`方法，这个方法接受两个参数，`$`将自动添加到该函数中。

`plugins/combined-inject.js`:

```js
export default ({ app }, inject) => {
  inject('myInjectedFunction', (string) => console.log('That was easy!', string))
}
```

`nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/combined-inject.js']
}
```

现在您就可以在`context`，或者`Vue`实例中使用`this`，或者在`Vuex`中的`actions/mutations`调用此方法。

`ctx-example-component.vue`:

```js
export default {
  mounted(){
    this.$myInjectedFunction('works in mounted')
  },
  asyncData(context){
    context.app.$myInjectedFunction('works with context')
  }
}
```

`store/index.js`:

```js
export const state = () => ({
  someValue: ''
})

export const mutations = {
  changeSomeValue(state, newValue) {
    this.$myInjectedFunction('accessible in mutations')
    state.someValue = newValue
  }
}

export const actions = {
  setSomeValueToWhatever ({ commit }) {
    this.$myInjectedFunction('accessible in actions')
    const newValue = "whatever"
    commit('changeSomeValue', newValue)
  }
}
```

## 只在浏览器里使用的插件

有些插件可能只是在浏览器里使用，所以你可以用 `ssr: false` 变量来配置插件只从客户端还是服务端运行。

举个例子：

`nuxt.config.js`:
```js
module.exports = {
  plugins: [
    { src: '~/plugins/vue-notifications', ssr: false }
  ]
}
```

`plugins/vue-notifications.js`:
```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

同样地，如果有些脚本库你只想在服务端使用，在 Webpack 打包 `server.bundle.js` 文件的时候会将 `process.server` 变量设置成 `true`。

此外，如果您需要知道您是否在生成的应用程序内(通过`nuxt generator`生成)，你可以检查`process.static`，在生成期间和之后设置为`true`。要知道在保存之前由`nuxt generator`服务器呈现页面的状态，您可以使用`process.static`或`process.server`。
