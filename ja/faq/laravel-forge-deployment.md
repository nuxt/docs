---
title: Laravel Forge へデプロイ
description: Laravel Forge にデプロイするには？
---

## 1- 前提条件

Nuxt アプリケーションを Laravel Forge にデプロイする説明をする前に、以下のことを確認してください:

* 選択したクラウドサービスプロバイダーを使用して Forge でサーバーにデプロイします。このサーバーは Node v8以降で実行する必要があります（アップグレードについては後述します）。
* GitHub アカウントと Forge を紐づけます。
* master ブランチの下の GitHub リポジトリにリンクされた Nuxt アプリケーションを作成します。このリポジトリを `nuxt-forge-client`とします。
* セットアップするドメインを `nuxt-forge.com` とします。このページで参照しているドメイン名をすべて自身のドメインに置き換えてください。また、ドメインが Forge でプロビジョニングされたサーバーの IP を指していることを確認してください。

Forge で Node のバージョンをアップグレードするには:
* ssh を使用してターミナル経由でサーバーに接続します。
* `/etc/apt/sources.list.d/nodesource.list` ファイルを編集し、バージョンを正しいものに書き換えます。私の場合は、6から8に書き換えました。
* `sudo apt-get update && sudo apt-get upgrade` で変更を有効にします。sudo パスワードは、サーバーのプロビジョニング時に Forge から受信したメールに記載されています。

## 2- Forge で新しいサイトのセットアップ

* Domain: `nuxt-forge.com`
* Aliases: ` `（空白にしてください）
* Project type: `Static HTML`
* Web Directory: `/`
* `Allow Wildcard Sub-Domains` チェックボックスのチェックを外した状態にしてください

**注意:** Forge のプロジェクトタイプは Nuxt のプロジェクトタイプにリンクされていません。この設定を使用すると、Nuxt.js で SPA およびユニバーサルアプリケーションを使用することができます。

## 3- Github リポジトリ

サーバー下で作成したサイトを選択し、メニューの Apps 下で Github リポジトリを新しいサイトに紐づけます:
* Provider: `Github`
* Repository: `sbkl/nuxt-forge-client`（sbkl は Github での私のユーザーネームで、nuxt-forge-client は Github のリポジトリ名です）
* Branch: `master`
* このアプリケーションでは PHP を使用していないため、`Install Composer dependencies` のチェックを外します
* `Install Repository` をクリックします

## 4- SSL

一度新しいサイトが利用できるようになると、メニューで SSL が選択できるようになり、SSL 証明書を追加することができます。私は Let's Encrypt を使用しています。Forge が証明書をインストールしてアクティブ化するのを待ってから次の手順に進みます。

## 5- Apps: デプロイ

メニューで Apps を選択し、デプロイセクション下の `Enable Quick Deploy` をクリックします。

クイックデプロイは、Forge が提供する機能です。master ブランチ下のプロジェクトに新しいコミットをプッシュするたびに、Forge は後述のデプロイスクリプトセクション下のスクリプトを使用して、変更を本番に自動的にデプロイします。

## 6- Apps: デプロイ用スクリプト

デプロイスクリプトセクションでは、初期スクリプトを次のスクリプトに置き換えます:

```
cd /home/forge/nuxt-forge.com

git checkout .

git pull origin master

npm install --production

npm run build

pm2 start npm --name "nuxt-forge.com" --watch -- start
```
完了したら、`Save Script` をクリックします。

## 7- Nginx 設定ファイル

ページの下部へいくと、`Files` ボタンがあります。このボタンをクリックして、`Edit Nginx configuration` を選択します。

以下の Nginx の設定は、Nuxt.js の FAQ セクションにある [nginx をリバースプロキシとして使う](https://ja.nuxtjs.org/faq/nginx-proxy/)に大きく影響を受けていますが、いくつか異なる点があります。 また、上述の SSL 証明書を既に作成していることを前提としています。

```
# FORGE の設定 （削除しないでください！）
include forge-conf/nuxt-forge.com/before/*;

map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}
        
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name .nuxt-forge.com;
    root /home/forge/nuxt-forge.com/;

    # FORGE SSL (DO NOT REMOVE!)
    ssl_certificate /etc/nginx/ssl/nuxt-forge.com/123456/server.crt;
    ssl_certificate_key /etc/nginx/ssl/nuxt-forge.com/123456/server.key;

    ssl_protocols TLSv1.2;
    ssl_ciphers ECDHE-*********************************************************************;
    ssl_prefer_server_ciphers on;
    ssl_dhparam /etc/nginx/dhparams.pem;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    charset utf-8;

    # FORGE CONFIG (DO NOT REMOVE!)
    include forge-conf/nuxt-forge.com/server/*;

    location / {
        expires $expires;

        proxy_redirect off;
        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                          http://127.0.0.1:3000; # set the address of the Node.js
    }

    access_log off;
    error_log  /var/log/nginx/nuxt-forge.com-error.log error;

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
# FORGE の設定 （削除しないでください！）
include forge-conf/nuxt-forge.com/after/*;
```
完了したら、`Save Script` をクリックします。

完了すると、次のメッセージが表示されます:

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

`OK` をクリックします。

## 8- デプロイ

これで、アプリケーションを初めてデプロイする準備が整いました。

メニューで Apps を選択し、デプロイセクション下にある `Deploy` ボタンをクリックし、完了するまで待ちます。 完了したら、ドメインにアクセスしアプリケーションが動いていることを確認することができます！

## 9- 最後のステップ

マスターブランチを変更してクイックデプロイ機能を使用する前に、スクリプトセクションを次のように変更する必要があります:

* 以下の箇所を:

`pm2 start npm --name "nuxt-forge.com" --watch -- start`

* 以下に置き換えます:

`pm2 restart nuxt-forge.com`

この方法では、マスターブランチに新しい変更をプッシュするたびに、デプロイプロセスは変更を考慮するために pm2 で Node.js サーバーインスタンスを再起動します。

`Save Script` をクリックすることを忘れないでください。

