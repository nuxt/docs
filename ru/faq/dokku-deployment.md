---
title: Развёртывание на Dokku
description: Как развернуть Nuxt.js приложение на Dokku?
---

# Как развёртывать на Dokku?

Мы рекомендуем прочитать [документацию Dokku по настройке](http://dokku.viewdocs.io/dokku/getting-started/installation/) и [Развёртывание Node.js приложения на Digital Ocean с использованием dokku](http://jakeklassen.com/post/deploying-a-node-app-on-digital-ocean-using-dokku/)

Например, мы назовём наше приложение nuxt.js `my-nuxt-app`

Мы должны указать Dokku установить `devDependencies` проекта (чтобы смогли запустить `npm run build`):

```bash
// на сервере Dokku
dokku config:set my-nuxt-app NPM_CONFIG_PRODUCTION=false
```

Также, мы хотим чтобы наше приложение прослушивало порт `0.0.0.0` и запускалось в режиме production:

```bash
// на сервере Dokku
dokku config:set my-nuxt-app HOST=0.0.0.0 NODE_ENV=production
```

Вы должны увидеть эти 3 строки когда набираете `dokku config my-nuxt-app`

![конфигурация переменых nuxt в Dokku](https://i.imgur.com/9FNsaoQ.png)

Затем, мы указываем Dokku запускать `npm run build` через скрипт `scripts.dokku.predeploy` в нашем проекте `app.json`:
`create a file name app.json in our project root folder`

```js
{
  "scripts": {
    "dokku": {
      "predeploy": "npm run build"
    }
  }
}
```

Наконец, мы можем опубликовать наше приложение с Dokku:

```bash
// коммитим изменения перед публикацией.
git remote add dokku dokku@yourServer:my-nuxt-app
git push dokku master
```

Готово! Наше nuxt.js приложение теперь на хостинге Dokku!
