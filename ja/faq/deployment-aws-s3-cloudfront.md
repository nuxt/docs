---
title: AWS: SS3 と Cloudfront によるデプロイ
description: S3 と Cloudfront を使用した AWS での静的ホスティング
---

# AWS S3 ,Cloudfront 上にデプロイするには？

AWS は Amazon Web Services です。
S3 は、静的サイトホスティング用に設定できる静的ストレージです。
Cloudfront は、AWS の CDN（コンテンツ配信ネットワーク）です。

静的に生成された Nuxt アプリケーションを、AWS の S3 及び Cloudfront 上にホスティングするのは強力で安価です。 

> AWS では少額の利用料が積算して高額の請求を受けることがあります。 もし抜けているステップがあれば, どうぞこのドキュメントを更新するPRを送ってください。

## 概要

デプロイのために、 [Gulp](https://gulpjs.com/) ビルドシステムを使います。 `Gulp` は、私たちが使うことができる手軽で実用性を備えた成熟したビルドシステムです。

  - [gulp](https://www.npmjs.com/package/gulp)
  - [gulp-awspublish](https://www.npmjs.com/package/gulp-awspublish)
  - [gulp-cloudfront-invalidate-aws-publish](https://www.npmjs.com/package/gulp-cloudfront-invalidate-aws-publish)
  - [concurrent-transform](https://www.npmjs.com/package/concurrent-transform) (for parallel uploads)

私たちのデプロイスクリプトは、以下の環境変数を設定する必要があります
  - AWS_BUCKET_NAME="example.com" 
  - AWS_CLOUDFRONT="UPPERCASE"
  - AWS_ACCESS_KEY_ID="key" 
  - AWS_SECRET_ACCESS_KEY="secret" 

## AWSの設定

  1. S3 bucket を作成し、静的サイトホスティング用に設定する
  2. cloudfront distribution を作成する
  3. セキュリティアクセスを設定する
  4. プロジェクトにビルドスクリプトを設定する
  
### 1. AWS S3 bucket の設定と 2. Cloudfront Distribution の設定

ステップ 1 と 2 については、このチュートリアル（S3 と Cloudfront をセットアップするためのチュートリアル）（https://reidweb.com/2017/02/06/cloudfront-cdn-tutorial/）に従ってください。

あなたは今このデータを持っているはずです：
  - AWS_BUCKET_NAME="example.com" 
  - AWS_CLOUDFRONT="UPPERCASE"

### 3. セキュリティアクセスを設定する

ステップ3では, 以下の事が可能なユーザーが必要です:
  - bucketのコンテンツを更新する
  - cloudfront distribution でのキャッシュ無効化 (変更を素早くユーザに伝播させる)

[このポリシーを使用してプログラムのユーザーを作成する](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html):

> 注: 下の二つの`example.com` をあなたのS3バケット名に置き換えてください。 このポリシーでは、指定された bucket にプッシュすること、CloudFront での Invalidation が可能になります。

``` json
{
    "Version": "2012-10-17",
    "Statement": [ {
            "Effect": "Allow",
            "Action": [ "s3:ListBucket" ],
            "Resource": [
                "arn:aws:s3:::example.com"
            ]
        }, {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:GetObjectAcl",
                "s3:DeleteObject",
                "s3:ListMultipartUploadParts",
                "s3:AbortMultipartUpload"
            ],
            "Resource": [
                "arn:aws:s3:::example.com/*"
            ]
        }, {
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation",
                "cloudfront:GetInvalidation",
                "cloudfront:ListInvalidations",
                "cloudfront:UnknownOperation"
            ],
            "Resource": "*"
        }
    ]
}
```

次に [アクセスキーとシークレットを取得する](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

あなたは今このデータを持っているはずです：
  - AWS_ACCESS_KEY_ID="key" 
  - AWS_SECRET_ACCESS_KEY="secret" 

### 4. プロジェクトにビルドスクリプトを設定する

4.1) プロジェクトとコマンドラインに Gulp を追加する
``` bash
npm install --save-dev gulp gulp-awspublish gulp-cloudfront-invalidate-aws-publish concurrent-transform
npm install -g gulp
```

4.2) `deploy.sh` スクリプトを作成する  [nvm (node version manager)](https://github.com/creationix/nvm) を参照して下さい。
``` bash
#!/bin/bash

# Load nvm (node version manager), install node (version in .nvmrc), and npm install packages
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm use
# Npm install if not already.
[ ! -d "node_modules" ] && npm install

npm run generate
AWS_ACCESS_KEY_ID="key" AWS_SECRET_ACCESS_KEY="secret" AWS_BUCKET_NAME="example.com" AWS_CLOUDFRONT="UPPERCASE" gulp deploy
```

4.3) `deploy.sh` を実行可能にし、git から除外します　
``` bash
chmod +x deploy.sh
echo "
# Don't commit build files
node_modules
dist
.nuxt
.awspublish
deploy.sh
" >> .gitignore
```

4.4) `gulpfile.js` ビルドスクリプトを作成します

``` javascript
var gulp = require('gulp');
var awspublish = require('gulp-awspublish');
var cloudfront = require('gulp-cloudfront-invalidate-aws-publish');
var parallelize = require('concurrent-transform');

// https://docs.aws.amazon.com/cli/latest/userguide/cli-environment.html

var config = {

  // Required
  params: { Bucket: process.env.AWS_BUCKET_NAME },
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

  // Optional
  deleteOldVersions: false,                 // NOT FOR PRODUCTION
  distribution: process.env.AWS_CLOUDFRONT, // Cloudfront distribution ID
  region: process.env.AWS_DEFAULT_REGION,
  headers: { /*'Cache-Control': 'max-age=315360000, no-transform, public',*/ },

  // Sensible Defaults - gitignore these Files and Dirs
  distDir: 'dist',
  indexRootPath: true,
  cacheFileName: '.awspublish',
  concurrentUploads: 10,
  wait: true,  // wait for Cloudfront invalidation to complete (about 30-60 seconds)
}

gulp.task('deploy', function() {
  // create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  var publisher = awspublish.create(config, config);

  var g = gulp.src('./' + config.distDir + '/**');
    // publisher will add Content-Length, Content-Type and headers specified above
    // If not specified it will set x-amz-acl to public-read by default
  g = g.pipe(parallelize(publisher.publish(config.headers), config.concurrentUploads))

  // Invalidate CDN
  if (config.distribution) {
    console.log('Configured with Cloudfront distribution');
    g = g.pipe(cloudfront(config));
  } else {
    console.log('No Cloudfront distribution configured - skipping CDN invalidation');
  }

  // Delete removed files
  if (config.deleteOldVersions) g = g.pipe(publisher.sync());
  // create a cache file to speed up consecutive uploads
  g = g.pipe(publisher.cache());
  // print upload updates to console
  g = g.pipe(awspublish.reporter());
  return g;
});
```
4.5) デプロイとデバッグ

実行する:
``` bash
./deploy.sh
```

次のような出力が得られるはずです:
```
$ ./deploy.sh                                                                                                                                                          Mod master

Found '/home/michael/scm/example.com/www/.nvmrc' with version <8>
Now using node v8.11.2 (npm v5.6.0)

> example.com@1.0.0 generate /home/michael/scm/example.com/www
> nuxt generate

  nuxt:generate Generating... +0ms
  nuxt:build App root: /home/michael/scm/example.com/www +0ms
  nuxt:build Generating /home/michael/scm/example.com/www/.nuxt files... +0ms
  nuxt:build Generating files... +36ms
  nuxt:build Generating routes... +10ms
  nuxt:build Building files... +24ms
  ████████████████████ 100% 

Build completed in 7.009s



 DONE  Compiled successfully in 7013ms                                                                                                                                     21:25:22

Hash: 421d017116d2d95dd1e3
Version: webpack 3.12.0
Time: 7013ms
                                   Asset     Size  Chunks             Chunk Names
     pages/index.ef923f795c1cecc9a444.js  10.6 kB       0  [emitted]  pages/index
 layouts/default.87a49937c330bdd31953.js  2.69 kB       1  [emitted]  layouts/default
pages/our-values.f60c731d5c3081769fd9.js  3.03 kB       2  [emitted]  pages/our-values
   pages/join-us.835077c4e6b55ed1bba4.js   1.3 kB       3  [emitted]  pages/join-us
       pages/how.75f8cb5bc24e38bca3b3.js  2.59 kB       4  [emitted]  pages/how
             app.6dbffe6ac4383bd30a92.js   202 kB       5  [emitted]  app
          vendor.134043c361c9ad199c6d.js  6.31 kB       6  [emitted]  vendor
        manifest.421d017116d2d95dd1e3.js  1.59 kB       7  [emitted]  manifest
 + 3 hidden assets
Hash: 9fd206f4b4e571e9571f
Version: webpack 3.12.0
Time: 2239ms
             Asset    Size  Chunks             Chunk Names
server-bundle.json  306 kB          [emitted]  
  nuxt: Call generate:distRemoved hooks (1) +0ms
  nuxt:generate Destination folder cleaned +10s
  nuxt: Call generate:distCopied hooks (1) +8ms
  nuxt:generate Static & build files copied +7ms
  nuxt:render Rendering url /our-values +0ms
  nuxt:render Rendering url /how +67ms
  nuxt:render Rendering url /join-us +1ms
  nuxt:render Rendering url / +0ms
  nuxt: Call generate:page hooks (1) +913ms
  nuxt: Call generate:page hooks (1) +205ms
  nuxt: Call generate:page hooks (1) +329ms
  nuxt: Call generate:page hooks (1) +361ms
  nuxt:generate Generate file: /our-values/index.html +2s
  nuxt:generate Generate file: /how/index.html +0ms
  nuxt:generate Generate file: /join-us/index.html +0ms
  nuxt:generate Generate file: /index.html +0ms
  nuxt:render Rendering url / +2s
  nuxt: Call generate:done hooks (1) +4ms
  nuxt:generate HTML Files generated in 11.8s +5ms
  nuxt:generate Generate done +0ms
[21:25:27] Using gulpfile ~/scm/example.com/www/gulpfile.js
[21:25:27] Starting 'deploy'...
Configured with Cloudfront distribution
[21:25:27] [cache]  README.md
[21:25:27] [cache]  android-chrome-192x192.png
[21:25:27] [cache]  android-chrome-512x512.png
[21:25:27] [cache]  apple-touch-icon.png
[21:25:27] [cache]  browserconfig.xml
[21:25:27] [cache]  favicon-16x16.png
[21:25:27] [cache]  favicon-32x32.png
[21:25:27] [cache]  favicon.ico
[21:25:27] [cache]  favicon.svg
[21:25:27] [cache]  logo-branches.svg
[21:25:27] [cache]  logo-small.svg
[21:25:27] [cache]  logo.svg
[21:25:27] [cache]  mstile-150x150.png
[21:25:27] [cache]  og-image.jpg
[21:25:27] [cache]  safari-pinned-tab.svg
[21:25:27] [cache]  site.webmanifest
[21:25:28] [create] _nuxt/manifest.421d017116d2d95dd1e3.js
[21:25:29] [update] 200.html
[21:25:30] [create] videos/flag.jpg
[21:25:30] [create] _nuxt/vendor.134043c361c9ad199c6d.js
[21:25:34] [create] videos/flag.mp4
[21:25:34] [cache]  _nuxt/pages/how.75f8cb5bc24e38bca3b3.js
[21:25:34] [cache]  _nuxt/pages/join-us.835077c4e6b55ed1bba4.js
[21:25:34] [cache]  _nuxt/pages/our-values.f60c731d5c3081769fd9.js
[21:25:36] [update] our-values/index.html
[21:25:36] [create] _nuxt/layouts/default.87a49937c330bdd31953.js
[21:25:36] [create] _nuxt/app.6dbffe6ac4383bd30a92.js
[21:25:37] [create] _nuxt/pages/index.ef923f795c1cecc9a444.js
[21:25:38] [update] join-us/index.html
[21:25:38] [update] how/index.html
[21:25:43] [create] videos/flag.webm
[21:25:43] [update] index.html
[21:25:43] Cloudfront invalidation created: I16NXXXXX4JDOA
[21:26:09] Finished 'deploy' after 42 s
```

`deploy.sh` はまず `nuxt generate` を実行し、環境変数を設定して `gulp deploy` を実行します。

`Cloudfront invalidation created：XXXX` は cloudfront invalidation のための npm パッケージからの唯一の出力です。 それが表示されない場合は、動作していません。
