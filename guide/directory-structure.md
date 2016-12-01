---
title: Directory Structure
---

# Directory Structure

> Nuxt.js doesn't require a lot of directory structure convention. It lets you free to define most of the directory structure with your own convention to make your development experience more enjoyable.

# Table of Contents
1. [Required Directory Structure](#required-directory-structure)
2. [Full Options Directory Structure](#full-options-directory-structure)
3. [Recommended Directory Structure](#recommended-directory-structure)
4. [Shortcuts](#shortcuts)

## Required Directory Structure

Nuxt.js doesn't required a lot of files to work properly. However, it requires at least an index.vue file inside the ```/pages``` folder for initiate the main route (/) of your project and of course a package.json file.

```bash
|-- pages
    |-- index.vue
|-- package.json
```

## Full Options Directory Structure

> Need to be written and explain that static and store folders are convention named

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

Excepted for the full options structure above, the rest of the structure is completely free of convention. However the Nuxt.js team give you a recommended directory structure.

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


## Shortcuts

<div class="Alert Alert--light"><b>TIPS</b> : The shortcut ```~``` is provide with Nuxt.js. You can use it to access the root directory of your app.<br><u>Example</u> : ~/api/user.js</div>

> Documentation is coming soon
