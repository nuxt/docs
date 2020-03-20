---
title: NuxtJS v2.4.0 is out
description: TypeScript, smart prefetching, RFC process, module commands, releases plan and more...
imgUrl: https://user-images.githubusercontent.com/904724/77156498-c3783200-6a9f-11ea-86bd-b085ceae3e23.jpg
date: 2019-01-28
authors:
  - name: Sébastien Chopin
    avatarUrl: https://pbs.twimg.com/profile_images/1042510623962275840/1Iw_Mvud_400x400.jpg
    link: https://twitter.com/atinux
tags:
    - framework
    - release
---

## Important news 👀

### New core team member 🐤

We are really proud to announce Kevin Marrec ([@kevinmarrec](https://dev.to/kevinmarrec) ) as a new core team member of Nuxt.js. He is French 🇫🇷 and responsible for the TypeScript integration 💚

### Official Consulting ⛑

We now offer official support & consulting from the core team. We partnered with Otechie for the process and already did some beta-tests with selected companies.

Are you interested or curious?  
Learn more on [https://otechie.com/nuxt](https://otechie.com/nuxt) 🙌

### RFC Process 📎

We invite you to take a look at our [nuxt/rfcs](https://github.com/nuxt/rfcs) repository where we discuss the future of Nuxt and its vision.

Here are some interesting proposals if you want to learn more about the upcoming changes of Nuxt:

*   [Full static generated mode](https://github.com/nuxt/rfcs/issues/22) to generate offline-ready static websites with Nuxt by default
*   [Fabula](https://github.com/nuxt/rfcs/issues/20), a Vue/Nuxt-inspired tool for running tasks on local and remote hosts
*   [Improve @nuxt/config package](https://github.com/nuxt/rfcs/issues/16) to support a `config/` directory and autocomplete
*   [Nuxt Workers](https://github.com/nuxt/rfcs/issues/15) to open more possibilities on the server part (clustering, PM2 integration, HMR on the server and more)
*   [Module improvements](https://github.com/nuxt/rfcs/issues/10) to give more power to Nuxt modules
*   And [many more](https://github.com/nuxt/rfcs/issues) 💚

### Release Plan 🚢

Starting with this release, Nuxt will adhere to a formalized release plan (as good as possible). Also, an end of life for older major versions is defined within [RELEASE_PLAN.md](https://github.com/nuxt/nuxt.js/blob/dev/RELEASE_PLAN.md).

Quick summary:

*   Nuxt major releases are planned every 6 months.
*   The release cycle for Nuxt.js minor versions is roughly 4 weeks.
*   Fixes will be released as soon as possible after the actual PR/commit

We strongly invite you to read the [RELEASE_PLAN.md](https://github.com/nuxt/nuxt.js/blob/dev/RELEASE_PLAN.md) for further details.

### Thank you ❤️

We want to specially thanks:

*   Our contributors submitting bug reports, feature requests and commenting on issues
*   Our users participating on our [Discord server](https://discord.gg/9NWWc7E) and sharing the love by mentioning our [Twitter account](https://twitter.com/nuxt_js)
*   All the devs working for companies using Nuxt.js and who helped us building a [showcases list](https://github.com/nuxt/nuxt.js/issues/4681)
*   Our backers and sponsors supporting us financially through our [open Collective](https://opencollective.com/nuxtjs)

## New Features ✨

### Speaking of TypeScript...

> TypeScript support has landed!

[![nuxt-ts](https://res.cloudinary.com/practicaldev/image/fetch/s--k_PnuXll--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://user-images.githubusercontent.com/904724/51127667-51b2b180-1826-11e9-9e8f-07bb39d09d3a.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--k_PnuXll--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://user-images.githubusercontent.com/904724/51127667-51b2b180-1826-11e9-9e8f-07bb39d09d3a.gif)

In order to run Nuxt with TypeScript, we created a new distribution, called [nuxt-ts](http://npmjs.com/package/nuxt-ts) (we also have [nuxt-ts-edge](http://npmjs.com/package/nuxt-ts-edge)).  
We want to thank [@hmsk](https://dev.to/hmsk) for his donation of the package name on npm ❤️

You can explore [Nuxt TypeScript example](https://github.com/nuxt/nuxt.js/tree/dev/examples/typescript) or play with it directly in our [Nuxt TS CodeSandBox](https://codesandbox.io/s/github/nuxt/nuxt.js/tree/dev/examples/typescript).

For a more advanced example, you can look at the [HackerNews-TS repo](https://github.com/nuxt-community/hackernews-nuxt-ts) or play with it on [CodeSandBox](https://codesandbox.io/s/github/nuxt-community/hackernews-nuxt-ts), made by [@husayt](https://dev.to/husayt) & [@kevinmarrec](https://dev.to/kevinmarrec) .

This work has been made by [@kevinmarrec](https://dev.to/kevinmarrec) with the help of [@pi0](https://dev.to/pi0) & [@atinux](https://dev.to/atinux) .

⚠️ **Experimental:** We are waiting for your feedback to keep improving it and breaking changes can occur without a semver major release. However, all changes will be documented properly

### Smart prefetching ⚡️

Nuxt.js will automagically prefetch the code-splitted pages linked with `<nuxt-link>` when visible in the viewport **by default**. This hugely improves the end user performances, inspired by [quicklink](https://github.com/GoogleChromeLabs/quicklink).

[![nuxt-prefetch-comparison](https://res.cloudinary.com/practicaldev/image/fetch/s--jP7Crsw7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://user-images.githubusercontent.com/904724/51692960-4158be80-1ffe-11e9-9299-61881d06412e.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--jP7Crsw7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://user-images.githubusercontent.com/904724/51692960-4158be80-1ffe-11e9-9299-61881d06412e.gif)

Demos are online and we recommend you to try it out to feel the difference:

*   No prefetching (v2.3): [https://nuxt-no-prefetch.surge.sh](https://nuxt-no-prefetch.surge.sh)
*   With prefetching (v2.4): [https://nuxt-prefetch.surge.sh](https://nuxt-prefetch.surge.sh)

**Bonus:** we added `$nuxt.isOnline` and `$nuxt.isOffline` which is reactive, so you can use it directly inside your components (see [this example](https://github.com/nuxt/nuxt.js/blob/dev/examples/nuxt-prefetch/layouts/default.vue#L3)).

You can learn more about this feature in the associated PR #4574 and in [the documentation](https://nuxtjs.org/api/components-nuxt-link).

### HMR & best practices for `store/` 👀

> Save more development time with full HMR support for the store (`mutations`, `getters`, and `actions`).

[![nuxt-vuex-hmr](https://res.cloudinary.com/practicaldev/image/fetch/s--oq49NDCr--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://user-images.githubusercontent.com/904724/51385153-b3bd3080-1b1e-11e9-891f-c136a3182ca0.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--oq49NDCr--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://user-images.githubusercontent.com/904724/51385153-b3bd3080-1b1e-11e9-891f-c136a3182ca0.gif)

This feature has been implemented by [@mannil](https://dev.to/mannil) & [@atinux](https://dev.to/atinux) on PRs #4589, #4582 and #4791

### Autocomplete for VS Code (via. Vetur extension) ✅

If you are using VS Code, with this version, you will now have autocomplete for Nuxt.js components:

[![nuxt-vs-autocomplete](https://res.cloudinary.com/practicaldev/image/fetch/s--OC6YX46I--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://user-images.githubusercontent.com/904724/51854163-70d33800-232a-11e9-98b0-f5e7406996cd.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--OC6YX46I--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://user-images.githubusercontent.com/904724/51854163-70d33800-232a-11e9-98b0-f5e7406996cd.gif)

This feature has been implemented by [@octref](https://dev.to/octref) & [@atinux](https://dev.to/atinux) on PR #4524

### Port taken? Nuxt got your back! 💪

If Nuxt wants to listen on a port which is already used, it will warn you **in development** and listen to a free port instead:

[![49249621-efe2e780-f431-11e8-90fb-ba48e67ba5c9](https://res.cloudinary.com/practicaldev/image/fetch/s--ooxDU4_W--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/904724/49298719-5c0b2d00-f4be-11e8-9639-ec914ff64782.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--ooxDU4_W--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/904724/49298719-5c0b2d00-f4be-11e8-9639-ec914ff64782.png)

In production it will throw an error instead to avoid unwanted behavior:

[![49249634-f8d3b900-f431-11e8-9f51-afbf3ffc68ed](https://res.cloudinary.com/practicaldev/image/fetch/s--1yqZBa_v--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/904724/49298757-6e856680-f4be-11e8-9485-812805b83906.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--1yqZBa_v--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/904724/49298757-6e856680-f4be-11e8-9485-812805b83906.png)

This feature has been implemented by [@ricardogobbosouza](https://dev.to/ricardogobbosouza) on PR #4428 with the help of [@pi0](https://dev.to/pi0) and [@mannil](https://dev.to/mannil) .

### Suggest installing missing dependencies or mismatches 💯

Nuxt requires all peer like dependencies as a dependency for easier usage. Sometimes this causes unwanted behaviors when users explicitly add a specific version in their package.json which is incompatible with nuxt. This could also help to resolve popular Vue packages version mismatch error (#198, #669, #1084, #1414, #1851, #2079, #2406, #3454).

Nuxt is now able to automatically self-verify installed dependencies and warn with a proper message in case of detecting problems.

[![image](https://res.cloudinary.com/practicaldev/image/fetch/s--x7Y9f4Oe--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/5158436/50593651-613d0c80-0eae-11e9-89b4-396c5f64d31d.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--x7Y9f4Oe--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/5158436/50593651-613d0c80-0eae-11e9-89b4-396c5f64d31d.png)

This feature has been implemented by [@pi0](https://dev.to/pi0) in PR [#4669](https://github.com/nuxt/nuxt.js/pull/4669)

### Auto-detection of modern bundles 🥇

When running `nuxt start`, Nuxt will automatically detect if you built your app modern mode enabled. No need to run `nuxt start --modern`explicitly anymore 🌟

[![screenshot 2018-11-30 at 16 55 48](https://res.cloudinary.com/practicaldev/image/fetch/s--gocbhrVn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/904724/49299896-1bf97980-f4c1-11e8-9321-9268c0f4c228.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--gocbhrVn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/904724/49299896-1bf97980-f4c1-11e8-9321-9268c0f4c228.png)

This detection was created by [@clarkdo](https://dev.to/clarkdo) on PR [#4422](https://github.com/nuxt/nuxt.js/pull/4422)

### Plugin modes and file extensions 💅

Until now, you used `ssr: false` in your plugin declarations to disable server-side rendering. We decided to deprecate that option and introduce a `mode` instead, which can be `'all'`, `'client'` or `'server'`. No worries, `ssr` is still working (until Nuxt 3).

The new feature coming with the `mode` is that you can define it by using the file suffix:

*   `plugins/plugin.server.js`
*   `plugins/plugin.client.js`
*   `plugins/plugin.js`

By adding the plugins to your `nuxt.config.js`:  

<div class="highlight">

    plugins: [
      '~/plugins/plugin.server.js',
      '~/plugins/plugin.client.js',
      '~/plugins/plugin.js'
    ]

</div>

The declaration will be internally transformed to:  

<div class="highlight">

    plugins: [
      { mode: 'server', src: '~/plugins/plugin.server.js' },
      { mode: 'client', src: '~/plugins/plugin.client.js' },
      { mode: 'all', src: '~/plugins/plugin.js' }
    ]

</div>

(If you specify the `mode` manually, it will overwrite the suffix detection)

This feature has been implemented by [@clarkdo](https://dev.to/clarkdo) on PR [#4592](https://github.com/nuxt/nuxt.js/pull/4592)

### Module commands 🖥

Nuxt modules can now include `bin` scripts that are recognized by Nuxt's CLI.

Here's an example of `my-module/bin/command.js`:  

<div class="highlight">

    #!/usr/bin/env node

    const consola = require('consola')
    const { NuxtCommand } = require('@nuxt/cli')

    NuxtCommand.run({
      name: 'command',
      description: 'My Module Command',
      usage: 'command <foobar>',
      options: {
        foobar: {
          alias: 'fb',
          type: 'string',
          description: 'Simple test string'
        }
      },
      run(cmd) {
        consola.info(cmd.argv)
      }
    })

</div>

The command could be run with:  

<div class="highlight">

    npx nuxt command arg1 arg2

</div>

You can learn more about that in the [modules command documentation](https://nuxtjs.org/guide/modules#module-package-commands).

⚠️ **Experimental:** We are waiting for your feedback to keep improving it and breaking changes can occur without a semver major release. However, all changes will be documented properly <3

This feature has been implemented by [@galvez](https://dev.to/galvez) on PR #4314 with the help of [@pi0](https://dev.to/pi0) .

### PostCSS in Vue Components 💃

You can now use `lang="postcss"` in your Vue components. Postcss has applied to _all_ your styles anyway (e.g. to resolve aliases like `~`) but the `lang` attribute enables autocomplete and syntax highlighting for some IDEs.

[![nuxt-postcss](https://res.cloudinary.com/practicaldev/image/fetch/s--J-ePlYh9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/904724/49299286-ad67ec00-f4bf-11e8-9a4d-96e725e1fcf9.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--J-ePlYh9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/904724/49299286-ad67ec00-f4bf-11e8-9a4d-96e725e1fcf9.png)

This feature has been implemented by [@mannil](https://dev.to/mannil) on PR #4417.

### No more extensions for Stylesheets needed 🦅

[![stylesheet extensions](https://res.cloudinary.com/practicaldev/image/fetch/s--EN8qtaNn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://user-images.githubusercontent.com/640208/51384714-05f95400-1b15-11e9-9ff4-d05451c9d548.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--EN8qtaNn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://user-images.githubusercontent.com/640208/51384714-05f95400-1b15-11e9-9ff4-d05451c9d548.gif)

We are concerned to improve the Developer Experience ("DX") with each release. This small change allows you to omit the file extension for CSS/SCSS/Postcss/Less/Stylus/... files listed in the `css` array inside your `nuxt.config.js`. For the `plugins` or `serverMiddleware` key, this is already possible.

This feature has been implemented by [@mannil](https://dev.to/mannil) on PR [#4671](https://github.com/nuxt/nuxt.js/pull/4671).

### SSR Bundle improvements 🔹

We made a full rewrite of how SSR bundle is packaged.

This means better performance, less memory overhead, fewer OOM crashes and easier SSR bundle debugging.

|_|Before|After|Diff|
|--- |--- |--- |--- |
|Dist|8.2M|7.2M|-1M / 12%|
|Dev|281 MB (RSS: 439 MB)|237 MB (RSS: 354 MB)|-44M / 16% (RSS: -85M / 19%)|
|Start|106 MB (RSS: 169 MB)|71.7 MB (RSS: 137 MB)|-34M / 32% (RSS: -32M / 19%)|

This feature has been implemented by [@pi0](https://dev.to/pi0) on PR [#4439](https://github.com/nuxt/nuxt.js/pull/4439).

## Other changes 🌔

*   `process.modern` can be used for distinguishing modern environment.
*   Add `server.timing` to give Server-Timing header, useful for monitoring and performances overview (PR #4800)
*   **⚠️ Experimental:** Enable `HardSourceWebpackPlugin` by `hardSource: true` in `hardSource` of `nuxt.config.js`
*   You can now set `scrollToTop` to `false` in pages (PR #4564)
*   Aliases for `nuxt-link` and `nuxt-child` (`n-link` and `n-child`) are available now (PR #4525)
*   Components can now be used in `PascalCase` as recommended by the Vue styleguide (PR #4396)
*   VueMetas `headAttrs` are now supported for the appTemplate (PR #4536)
*   More browsers are added to the list of modern browsers (PR #4516, PR #4775)
*   Loaded resources can now have a `crossorigin` attribute (PR #4472)
*   Modern mode resources are preloaded and will be pushed via HTTP2 server push if set (PR #4508)
*   Add option to disable the `compression` middleware (PR #4381)
*   Add option to disable the `FriendlyErrorsWebpackPlugin` overlay (PR #4381)
*   Add `exclude` option to exclude pages from being `generated` (in static mode) but still get rendered via fallback/SPA (PR #4754)
*   Support `build.hotMiddleware.client` (PR #4796)
*   New examples have been added:
    *   [styled-vue](https://github.com/nuxt/nuxt.js/tree/dev/examples/styled-vue) (PR #4712)
    *   [pug](https://github.com/nuxt/nuxt.js/tree/dev/examples/pug) (PR #4409)
*   Internal changes:
    *   feat: use `runInNewContext: true` for nuxt dev (#4508)
    *   feat: check modern build file in modern mode (#4467)
    *   refactor: migrate to extract-css-chunks-webpack-plugin (#4495)

## Further Patches (30+) 🔍

*   hotfix(vue-app): ReferenceError error passed with routeChanged (PR #4444)
*   fix(vue-app): properly serialize head functions (PR #4558 #4585)
*   fix(vue-app): Handle `middleware` correctly when using `Vue.extend` in layout (fix #4724)
*   fix (vue-renderer): remove `undefined` script in modern mode & generated ([https://github.com/nuxt/nuxt.js/commit/0a21d4b34ca2f3bde2a54452f3d6831a0b1ee362](https://github.com/nuxt/nuxt.js/commit/0a21d4b34ca2f3bde2a54452f3d6831a0b1ee362))
*   fix: add option to rewatch on path after raw fs event (PR #4717)
*   fix(builder, module): addLayout and nuxt.config precedence over auto-scanned layouts (PR #4702)
*   fix: Support plugins with a directory and index.js (PR #4714)
*   fix: use case insensitive regex for webpack loader rules (PR #4728)
*   fix: require postcss module via resolver (PR #4737)
*   fix: Safari fix is not injected in client modern mode ([https://github.com/nuxt/nuxt.js/commit/ecf76d91f1bec8dcab8f2c7715e0e07a19d0b6fe](https://github.com/nuxt/nuxt.js/commit/ecf76d91f1bec8dcab8f2c7715e0e07a19d0b6fe))
*   fix(server): allow rendering urls with unicode characters (#4512)
*   fix(builder): add lodash inside templates (PR #4368)
*   fix: fall back to default value when `publicPath` is falsy (PR #4365)
*   fix: modern=true or false not work as expected (PR #4378)
*   fix: empty error message in dev mode ([https://github.com/nuxt/nuxt.js/commit/3d990fe60675f44a1771b765a73d9bbe5d5fa8f8](https://github.com/nuxt/nuxt.js/commit/3d990fe60675f44a1771b765a73d9bbe5d5fa8f8))
*   fix(progress-bar): allow 0 for values and remove duplicate defaults (PR #4397)
*   fix(vue-app): allow passing custom props to error function (PR #4462)
*   fix(webpack): deepClone before calling extendConfig (PR #4464)
*   fix(vue-app): router.meta is null on extendRoutes(PR #4478)
*   fix: merge route.meta into options.meta (PR #4479)
*   fix: improvements for build and dev stability (PR #4470)
*   fix(vue-app): Fix route meta to handle order ([https://github.com/nuxt/nuxt.js/commit/45be6384794fa5239b27ade8966d5d40955d8bb7](https://github.com/nuxt/nuxt.js/commit/45be6384794fa5239b27ade8966d5d40955d8bb7))
*   fix(dev): Show correct path when webpack watched files changed ([https://github.com/nuxt/nuxt.js/commit/25dea5f52a30628c43213fdc6d620c0d0eda8d9d](https://github.com/nuxt/nuxt.js/commit/25dea5f52a30628c43213fdc6d620c0d0eda8d9d))
*   fix(webpack): allow changing devtool with extend (PR #4515)
*   fix: keepAliveProps broken in (PR #4521)
*   fix: csp SHA hashes accumulate when using custom script-src rules (#4519)
*   fix: duplicate style in extractCSS (#4546)
*   fix: hmr in modern mode (#4623)
*   fix: wrong devMiddleware in non-modern dev mode ([https://github.com/nuxt/nuxt.js/commit/35151150fde5ad21087f14bf22cf1acf0f150979](https://github.com/nuxt/nuxt.js/commit/35151150fde5ad21087f14bf22cf1acf0f150979))
*   fix(ts): fix `$nuxt.$loading` typedefs (#4778)
*   fix(ts): Add missing `loading` property to Component options (#4786)
*   fix: match subdir under node_module in transpile (#4850)

### Upgrade Note ⚠️

Due to a known problem (webpack/webpack#8656, #4869, #4839) users of **npm** should either remove `package-lock.json` and reinstall before upgrade or use `npm update acorn --depth 20 && npm dedupe` after upgrading to 2.4.0\. **yarn** users should have no problems but removing `yarn.lock` still recommended before the upgrade process.
