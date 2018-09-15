---
title: Host und Port
description: Host und Port anpassen mit Nuxt.js
---

# Host und Port anpassen

Die Verbindungsvariablen können auf verschiedene Weisen angepasst werden, hier in aufsteigender Priorität gelistet:

## Mithilfe von `nuxt` in der `package.json`:

In der `package.json`:

```json
"config": {
  "nuxt": {
    "host": "0.0.0.0",
    "port": "3333"
  }
},
"scripts": {
  "dev": "nuxt"
}
```

## Mithilfe der Umgebungsvariablen HOST und PORT

```js
"scripts": {
  "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```

**Hinweis**: Für bessere Unterstützung von system-übergreifender Entwicklung kann das  [cross-env](https://www.npmjs.com/package/cross-env) Paket genutzt werden.

Einrichtung:

```bash
npm install --save-dev cross-env
```

```js
"scripts": {
  "dev": "cross-env HOST=0.0.0.0 PORT=3333 nuxt"
}
```

## Mithilfe der Umgebungsvariablen NUXT_HOST und NUXT_PORT

Falls HOST und PORT für andere Zwecke genutzt werden, können genauso auch NUXT_HOST und NUXT_PORT verwendet werden.

```js
"scripts": {
  "dev": "NUXT_HOST=0.0.0.0 NUXT_PORT=3333 nuxt"
}
```

## Als direkte Argumente

```js
"scripts": {
  "dev": "nuxt --hostname myhost --port 3333"
}
```
