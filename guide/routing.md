---
title: Routing
---

# Routing

> Nuxt.js routing is based on [vue-router]().
It generates the application routes by following the structure of the pages folder.

# Table of Contents
1. [Basic Usage](#basic-usage)
2. [Advanced Usage](#advanced-usage)

## Basic Usage

Nuxt.js parses the pages folder and creates the vue-router configuration.
It links each component with the appropriate path and push them into the routes array.

This directory structure:

```bash
|-- pages
    |-- posts
        |-- index.vue
        |-- welcome.vue
    |-- about.vue
    |-- index.vue
```

will become:

```js
routes: [
  {
    path: '/posts',
    component: '~pages/posts/index.vue'
  },
  {
    path: '/posts/welcome',
    component: '~pages/posts/welcome.vue'
  },  
  {
    path: '/about',
    component: '~pages/about.vue'
  },
  {
    path: '/',
    component: '~pages/index.vue'
  }
]
```

## Advanced Usage

Nuxt.js routing system allows to define exceptions.

### Hidden pages

It is possible to specify hidden pages by an underscore prefix.
These pages are not interpreted by Nuxt.js routing system.

This directory structure:

```bash
|-- pages
    |-- _about.vue
    |-- index.vue
```

will become:

```js
routes: [
  {
    path: '/',
    component: '~pages/index.vue'
  }
]
```

### Custom routes

Custom routing is also available but recommended for advanced usage.

It requires an other configuration settings: [Custom Routes Documentation](/guide/custom-routes)
