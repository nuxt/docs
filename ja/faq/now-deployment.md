---
title: Now を使ったデプロイ
description: Now を使ってデプロイするには？
---

# Now を使ってデプロイするには？

## Now V2

**Note:** You cannot deploy a server-side-rendered Nuxt app with Now V2 right now. Please use Now V1 for such apps.

To deploy with [ZEIT Now](https://zeit.co/now) you need to customize `package.json` add create a `now.json` config.

* Add `now-build` script command to `package.json`:
  * For SPA (without SSR):
    ```js
    "scripts": {
       ...
       "now-build": "nuxt build --spa"
    }
    ```
  * For Static Generated (Pre Rendering):
    ```js
    "scripts": {
       ...
       "now-build": "nuxt generate"
    }
    ```
* Create `now.json` and define `builds`
  ```json
  {
    "version": 2,
    "builds": [
      { "src": "package.json", "use": "@now/static-build" }
    ]
  }
  ```
* Run `now` and enjoy!

[now.sh](https://zeit.co/now) を使ってデプロイするには `package.json` を次のように記述することが推奨されます:

```json
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```

これで `now` を実行できます！エンジョイ！

メモ: `.nuxt` を `.npmignore` または `.gitignore` に入れておくことをお勧めします。
