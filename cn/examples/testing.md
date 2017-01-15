---
title: 测试
description: Nuxt.js 的测试示例
github: with-ava
---

## 文档

[`ava`](https://github.com/avajs/ava) 是一个很强大的 JavaScript 测试框架，结合 [`jsdom`](https://github.com/tmpvar/jsdom)，我们就可以轻松地给 `nuxt` 应用进行端对端测试。

```bash
npm install --save-dev ava jsdom
```

在 `package.json` 中添加测试脚本：

__package.json__

```javascript
// ...
"scripts": {
  "test": "ava",
}
// ...

```
