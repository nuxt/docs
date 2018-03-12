---
title: "API: The Generator Class"
description: Nuxt Generator Class
---

# Generator Class

- Source: **[builder/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/builder/generator.js)**


## Tapable plugins

We can register hooks on certain life cycle events.


Plugin           | Arguments                   | When
-----------------|-----------------------------|--------------------------------------------------------------------------------
`generate:before`        |   | Hook on before generation     |                                  
`generate:distRemoved`   |   | Hook on  destination folder  cleaned   |                                |  
`generate:distCopied`    |   | Hook on copy static and built files     |    
`generate:page`          |   | Hook to let user update the path & html     |                                 |  
`generate:routeCreated`  |   | *description missing*     |           
`generate:extendRoutes`  |   | *description missing*     |          
`generate:routeFailed`   |   | *description missing*     |   
`generate:done`          |   | Hook on generation finished     | 
