---
title: "API: The ignore Property"
description: Define the ignore files for your Nuxt.js application
---

# .nuxtignore

You can use `.nuxtignore` to let Nuxt.js building phase ignore `layout`, `page`, `store` and `middleware` files in your project’s root directory (`rootDir`). The `.nuxtignore` file is file wih same specification like `.gitignore` and `.eslintignore` in which each line is a glob pattern indicating which files should be ignores.

For example:

```
# ignore layout foo.vue
layouts/foo.vue
# ignore layout files whose name ends with -ignore.vue
layouts/*-ignore.vue

# ignore page bar.vue
pages/bar.vue
# ignore page inside ignore folder
layouts/ignore/*.vue

# ignore store baz.js
store/baz.js
# ignore store files match *.test.*
store/ignore/*.test.*

# ignore middleware files under foo folder except foo/bar.js
middleware/foo/*.js
!middleware/foo/bar.js
```

> More details about the spec are in [gitignore doc](https://git-scm.com/docs/gitignore)

# The ignorePrefix Property

- Type: `String`
- Default: `'-'`

> Any file in pages/ layout/ middleware/ or store/ will be ignored during building if its filename starts with the prefix specified by `ignorePrefix`.

By default all files which start with `-` will be ignored, such as `store/-foo.js` and `pages/-bar.vue`. This allows for co-locating tests, utilities, and components with their callers without themselves being converted into routes, stores, etc.

**Note:** This option will be deprecated in Nuxt.js 3. We recommend using a `.nuxtignore` file instead.

# The ignore Property

- Type: `Array`
- Default: `['**/*.test.*']`

> More customizable than `ignorePrefix`: all files matching glob patterns specified inside `ignore` will be ignored in building.

**Note:** This option will be deprecated in Nuxt.js 3. We recommend using a `.nuxtignore` file instead.
