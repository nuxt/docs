---
title: nginx proxy
description: How to use nginx as a reverse proxy
---

# Using nginx as a reverse proxy

```nginx
map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    listen          80;             # the port nginx is listening on
    server_name     your-domain;    # setup your domain here

    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    location / {
        expires $expires;

        proxy_redirect                      off;
        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                          http://127.0.0.1:3000; # set the adress of the Node.js instance here
    }
}
```

# nginx configuration for Laravel Forge

Change `YOUR_WEBSITE_FOLDER` to your web site folder and `YOUR_WEBSITE_DOMAIN` to your website URL. Laravel Forge will have filled out these values for you but be sure to double check.

```nginx
# FORGE CONFIG (DOT NOT REMOVE!)
include forge-conf/YOUR_WEBSITE_FOLDER/before/*;

map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    listen 80;
    listen [::]:80;
    server_name YOUR_WEBSITE_DOMAIN;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    charset utf-8;

    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    # FORGE CONFIG (DOT NOT REMOVE!)
    include forge-conf/YOUR_WEBSITE_FOLDER/server/*;

    location / {
        expires $expires;

        proxy_redirect off;
        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                          http://127.0.0.1:3000; # set the adress of the Node.js
    }

    access_log off;
    error_log  /var/log/nginx/YOUR_WEBSITE_FOLDER-error.log error;

    location ~ /\.(?!well-known).* {
        deny all;
    }
}

# FORGE CONFIG (DOT NOT REMOVE!)
include forge-conf/YOUR_WEBSITE_FOLDER/after/*;
```

# Secure Laravel Forge with TLS

It's best to let Laravel Forge do the editing of the `nginx.conf` for you, by clicking on Sites -> YOUR_WEBSITE_DOMAIN (SERVER_NAME) and then click on SSL and install a certificate from one of the providers. Remember to activate the certificate. Your `nginx.conf` should now look something like this:

```nginx
# FORGE CONFIG (DOT NOT REMOVE!)
include forge-conf/YOUR_WEBSITE_FOLDER/before/*;

map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name YOUR_WEBSITE_DOMAIN;

    # FORGE SSL (DO NOT REMOVE!)
    ssl_certificate /etc/nginx/ssl/YOUR_WEBSITE_FOLDER/258880/server.crt;
    ssl_certificate_key /etc/nginx/ssl/YOUR_WEBSITE_FOLDER/258880/server.key;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA:!3DES';
    ssl_prefer_server_ciphers on;
    ssl_dhparam /etc/nginx/dhparams.pem;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    charset utf-8;

    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    # FORGE CONFIG (DOT NOT REMOVE!)
    include forge-conf/YOUR_WEBSITE_FOLDER/server/*;

    location / {
        expires $expires;

        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_redirect              off;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                          http://127.0.0.1:3000; # set the adress of the Node.js
    }

    access_log off;
    error_log  /var/log/nginx/YOUR_WEBSITE_FOLDER-error.log error;

    location ~ /\.(?!well-known).* {
        deny all;
    }
}

# FORGE CONFIG (DOT NOT REMOVE!)
include forge-conf/YOUR_WEBSITE_FOLDER/after/*;
```
