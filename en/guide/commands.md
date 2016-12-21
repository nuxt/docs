---
title: Commands
---

# Commands

> Explain commands

package.json

## Development Environment

nuxt

## Production Deployment

### Server Rendered App

To deploy, instead of running nuxt, you probably want to build ahead of time. Therefore, building and starting are separate commands:

```bash
nuxt build
nuxt start
```

For example, to deploy with [`now`](https://zeit.co/now) a `package.json` like follows is recommended:
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

### Static Generated App

nuxt generate
