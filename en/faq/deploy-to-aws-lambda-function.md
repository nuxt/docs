# Starting template for SSR Nuxt.js on AWS Lambda

Deploy Server Side Rendered Nuxt.js app with the serverless approach to AWS.  
Follow the steps below and your Nuxt.js app can be deployed in several minutes.

## How to use

1. **Set up your AWS CLI.** (if you don't have already)

   Follow the steps for your operating system in the link below.  
   https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html

2. **Install and set up the serverless framework globally.**  (if you don't have already)

   Serverless framework documentation is really nice.  
   https://serverless.com/framework/docs/providers/aws/guide/quick-start/  
   https://serverless.com/framework/docs/providers/aws/guide/installation/  
   https://serverless.com/framework/docs/providers/aws/guide/credentials/

3. **Download or clone this repo.**

   https://github.com/tomasSlouka/template-serverless-nuxtjs-app

4. **Open a terminal and `cd` to the folder where you downloaded/cloned repo.**

5. **Update dependencies**

   If you don't have installed `npm-check-updates` run
   ```shell
   npm install -g npm-check-updates
   ```
   then update your `package.json`
   ```shell
   ncu -u
   ```

6. **Install packages with npm**

   ```shell
   npm install
   ```
   It will take a while so be patient. After installation, you should see a new folder `node_modules` and file `package-lock.json`

7. **Open serverless.yml** 
   
   Change the value `your.custom.domain` to whatever like *yourdomain.com* or *app.yourdomain.com*
   ```shell
   customDomain:
      domainName: your.custom.domain
      basePath: ''
      stage: ${self:provider.stage}
      createRoute53Record: false
      endpointType: regional
   ```
8. **Create custom domain** 

   Before you proceed to create a custom domain, you need to log in to AWS Console and request a new SSL certificate.  
   Find out more here: https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html

   If you have confirmed your certificate continue in the terminal.
   ```shell
   sls create_domain
   ```
   <img width="450" alt="" src="https://github.com/tomasSlouka/template-serverless-nuxtjs-app/blob/master/app/assets/img/create_domain.png">

9. **Run Nuxt.js app locally or deploy to AWS**

   ```shell
   npm run dev
   ```
   or  
   ```shell
   npm run deploy
   ```
   `npm run deploy` will run scripts, that build your Nuxt.js app, create Cloud Formation stack thanks to the serverless framework and automatically deploy it to AWS Lambda function.

   <img width="800" alt="" src="https://github.com/tomasSlouka/template-serverless-nuxtjs-app/blob/master/app/assets/img/deploy.png">

10. **Set up your DNS CNAME value within your domain registrar**
   From the picture above you can see `Distribution Domain Name`. Copy and paste that value to the value of the CNAME record within your domain registrar. After a few minutes, when you visit your custom domain name, you should see your Nuxt.js app live.

11. **Enjoy serverless Nuxt.js app**
   Now your only job is to develop your Nuxt.js app in the `app` folder.  
   While developing, see live changes with `npm run dev`.  
   You can also generate static Nuxt.js app with `npm run generate` and copy the content of the `dist` folder to your FTP server or use it with Netlify.  
   If you will have a new version available just run `npm run deploy` and your app will be deployed to AWS Lambda function.

## Credits
All credits goes to https://github.com/mya-ake/nuxt-on-lambda
