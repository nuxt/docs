---
title: Azure Portal へデプロイするには？
description: Azure Portal へデプロイするには？
---

## Requirements
- It is required that you select a backend when setting up the project. Even if you don't need it, or else the site won't start up.
- The server is running Node 8 or greater

## What if I already have a project without an backend?
No worries. It is easy to add an express server to an existing project.

Create a new folder called `server` in the root of the project. Then create an `index.js` file inside the `server` folder and paste the following inside the `index.js`:

```
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'
async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  // Give nuxt middleware to express
  app.use(nuxt.render)
  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
```

Then edit your nuxt.config.js:

Before:

```
import pkg from './package'
export default {
... config
}
```

After: 
```
module.exports = {
... config
}
```

**Remember to remove the references to the pkg object inside the config.**

Thats it!

## How to set Node version on Web App in DevOps

You can set the Node version on the server, via the App setting inside the "Deploy Azure Web Service" task in the release pipeline

Add this to the App settings field under "Application and Configuration Settings"
```
-WEBSITE_NODE_DEFAULT_VERSION 10.16.3
```
It's recommended to use the LTS version.

## Artifacts

Azure DevOps を使用しており、かつビルドパイプラインを走らせていて、アーティファクトを保存したい場合、 ファイル名の先頭に `.` が付いているファイルは、アーティファクトフォルダーに明示的に移動する必要があります。そして、アーティファクトアーカイブを作成することで、リリースデプロイ時にダウンロードすることができます。

## webserver の実行
Azure Portal の場合、`web.config` ファイルが必要です。ファイルが提供されない場合は自身でファイルを作成します。ただし、これは **Nuxt では機能しません**。
`web.config` ファイルをリポジトリに追加します。`Nuxt` の最新のバージョンでは、サーバーファイルは `server/index.js` に配置されています。 
`web.config` ファイルでは、`server/index.js` のように正確なパスを指定せず、ただ `server` と指定します。以下の `web.config` ファイルの例を参照してください。これを行わないと、ログで Vue がルートを見つけられないことを通知します。


```xml
<?xml version="1.0" encoding="utf-8"?>
<!--
     iisnode を使用して IIS もしくは IIS Express のバックグラウンドで node プロセスを使う場合、
     この設定ファイルが必要です。詳細は以下を参照してください:

     https://github.com/tjanczuk/iisnode/blob/master/src/samples/configuration/web.config
-->

<configuration>
  <system.webServer>
    <!-- WebSocket サポートについての詳細は https://azure.microsoft.com/ja-jp/blog/introduction-to-websockets-on-windows-azure-web-sites/ を参照してください -->
    <webSocket enabled="false" />
    <handlers>
      <!-- server.js ファイルが iisnode モジュールによって処理される node.js サイトであることを示します -->
      <add name="iisnode" path="server" verb="*" modules="iisnode"/>
    </handlers>
    <rewrite>
      <rules>
        <!-- node-inspector デバッギングの要求を妨げないでください -->
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^server\/debug[\/]?" />
        </rule>

        <!-- 最初に、受け取る URL が /public フォルダー内の物理ファイルと一致するかどうかを検討します -->
        <rule name="StaticContent">
          <action type="Rewrite" url="public{REQUEST_URI}"/>
        </rule>

        <!-- 他のすべての URL は node.js サイトエントリポイントにマッピングされます -->
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="server"/>
        </rule>
      </rules>
    </rewrite>

    <!-- node.js では 'bin' ディレクトリは特別な意味を持たずアプリケーションを配置することができます -->
    <security>
      <requestFiltering>
        <hiddenSegments>
          <remove segment="bin"/>
        </hiddenSegments>
      </requestFiltering>
    </security>

    <!-- エラーレスポンスが変更されていないことを確認してください -->
    <httpErrors existingResponse="PassThrough" />

    <!--
      次のオプションを使用して、IIS 内で Node がホストされる方法を制御できます:
        * watchedFiles: サーバーを再起動するための変更を監視するセミコロン区切りのリストになったファイル
        * node_env: NODE_ENV 環境変数として node に伝播されます
        * debuggingEnabled - 組み込まれたデバッガを有効にするかどうかを制御します

      オプションの完全なリストは  https://github.com/tjanczuk/iisnode/blob/master/src/samples/configuration/web.config を参照してください
    -->
    <!--<iisnode watchedFiles="web.config;*.js"/>-->
  </system.webServer>
</configuration>
```
