
# Alpheta Client

The web client for Alpheta, written in React.

## Configuring & Deploying
The primary configuration for the client resides in the `src/config.js` file.

```
export const isDebug = false

export const API_ROOT_DEBUG = 'http://localhost:17655'
export const API_ROOT_PROD = 'http://alpheta-server.netlify.com'

export const discordLink = 'https://discord.com'
export const instagramLink = 'https://instagram.com'
export const facebookLink = 'https://facebook.com'
export const twitterLink = 'https://twitter.com'
```

For deployment, set `isDebug` to `false` and update the `API_ROOT_PROD` to your deployed API endpoint. 
Also, update the social media links to reflect the correct ones.

In order to update the FAQs, you will need to edit the `faqs` Object in `src/routes/FAQ.js`. 

### Building

Navigate to the project directory and run the following command:

```
npm run build
```

This builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

### Deployment

Take the generated files from the `build/` directory and upload it to your server.

When deploying, you will have to configure your web server such that any request to a location that is not found is routed to `index.html`. This needs to be done to ensure that routing works as intended. (If you need to Google, the term you are looking for is `Configuring 'Client Side Routing'`)

For example, in Apache2, you can add a .htaccess file with the following contents to handle this for you.

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
