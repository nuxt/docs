---
title: Now Deployment
description: How to deploy Nuxt.js with Now.sh?
---

# How to deploy with Now.sh?

To deploy with [now.sh](https://zeit.co/now) a `package.json` like follows is recommended:
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

Then run `now` and enjoy!

Note: we recommend putting `.nuxt` in `.npmignore` or `.gitignore`.
