---
title: Now を使ったデプロイ
description: Now を使ってデプロイするには？
---

<!-- title: Now Deployment -->
<!-- description: How to deploy Nuxt.js with Now.sh? -->

<!-- # How to deploy with Now.sh? -->

# Now を使ってデプロイするには？

<!-- To deploy with [now.sh](https://zeit.co/now) a `package.json` like follows is recommended: -->

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

<!-- Then run `now` and enjoy! -->

これで `now` を実行できます！エンジョイ！

<!-- Note: we recommend putting `.nuxt` in `.npmignore` or `.gitignore`. -->

メモ: `.nuxt` を `.npmignore` または `.gitignore` に入れておくことをお勧めします。
