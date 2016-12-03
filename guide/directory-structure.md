---
title: Directory Structure
---

# Directory Structure

> Nuxt.js doesn't require a lot of directory structure convention. It is free to define most of the directory structure with its own convention.

# Table of Contents
1. [Minimum Required Directory Structure](#minimum-required-directory-structure)
2. [Required Directory Structure with Options](#required-directory-structure-with-options)
3. [Recommended Directory Structure](#recommended-directory-structure)
4. [Directories Aliases](#directories-aliases)

## Minimum Required Directory Structure

Nuxt.js doesn't required a lot of files to work properly. However, it requires at least an index.vue file inside the ```/pages``` folder.
It will automatically generate the main route (/) of the application.
Checkout the [Hello-World example](/examples) to get started.

```bash
|-- pages
    |-- index.vue
|-- package.json
```

## Required Directory Structure with Options

Static files and [Vuex Store](/guide/vuex-store) options are already implemented inside the Nuxt.js framework.
Creating a static folder or store folder will activate the option from the framework automatically.

```bash
|--- pages
    |--- index.vue
|--- static
    |--- favicon.ico
|--- store
    |--- index.js
|--- nuxt.config.js
|--- package.json
```

## Recommended Directory Structure

Excepted for the required directory structure above, the rest of the structure is completely free of convention. However the Nuxt.js team gives a recommended directory structure.

```bash
|--- assets
    |--- global.css
|--- components
    |--- nav.vue
|--- pages
    |--- index.vue
|--- plugins
    |--- filters.js
|--- static
    |--- favicon.ico
|--- store
    |--- index.js
|--- nuxt.config.js
|--- package.json
```


## Directories Aliases

| Alias | Directory |
|-----|------|
| ~ | / |
| ~assets | /assets |
| ~components | /components |
| ~pages | /pages |
| ~plugins | /plugins |
| ~static | /static |
| ~store | /store |

Examples of how to link an image from ```static``` folder into a .vue file in ```/pages/user/me.vue```

```html
<img src="~static/img/logo.png" alt="Logo"/>
```
