---
title: Directory Structure
description: The default Nuxt.js application structure is intended to provide a great starting point for both large and small applications.
---

> The default Nuxt.js application structure is intended to provide a great starting point for both small and large applications. Of course, you are free to organize your application however you like.

## Directories

### The Assets Directory

The `assets` directory contains your un-compiled assets such as LESS, SASS or JavaScript.

[More documentation about Assets integration](/guide/assets)

### The Components Directory

The `components` directory contains your Vue.js Components. Nuxt.js doesn't supercharge the data method on these components.

### The Layouts Directory

The `layouts` directory contains your Application Layouts.

_This directory cannot be renamed._

[More documentation about Layouts integration](/guide/views#layouts)

### The Middleware Directory

The `middleware` directory contains your Application Middleware. Middleware lets you define custom functions that can be run before rendering either a page or a group of pages (layouts).

[More documentation about Middleware integration](/guide/routing#middleware)

### The Pages Directory

The `pages` directory contains your Application Views and Routes. The framework reads all the `.vue` files inside this directory and creates the application router.

_This directory cannot be renamed._

[More documentation about Pages integration](/guide/views)

### The Plugins Directory

The `plugins` directory contains your Javascript plugins that you want to run before instantiating the root vue.js application.

[More documentation about Plugins integration](/guide/plugins)

### The Static Directory

The `static` directory contains your static files. Each file inside this directory is mapped to /.

**Example:** /static/robots.txt is mapped as /robots.txt

_This directory cannot be renamed._

[More documentation about Static integration](/guide/assets#static)

### The Store Directory

The `store` directory contains your [Vuex Store](http://vuex.vuejs.org) files. The Vuex Store option is implemented in the Nuxt.js framework. Creating an `index.js` file in this directory enables the option in the framework automatically.

_This directory cannot be renamed._

[More documentation about Store integration](/guide/vuex-store)

### The nuxt.config.js File

The `nuxt.config.js` file contains your Nuxt.js custom configuration.

_This file can not be renamed._

[More documentation about nuxt.config.js integration](/guide/configuration)

### The package.json File

The `package.json` file contains your Application dependencies and scripts.

_This file can not be renamed._

## Aliases

| Alias | Directory |
|-----|------|
| `~` or `@` | [srcDir](/api/configuration-srcdir) |
| `~~` or `@@` | [rootDir](/api/configuration-rootdir) |

By default, `srcDir` is the same as `rootDir`.

<p class="Alert Alert--nuxt-green"><b>INFO:</b> Inside your `vue` templates, if you need to link to your `assets` or `static` directory, use `~assets/your_image.png` and `~static/your_image.png`.</p>
