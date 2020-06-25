```
           /$$                   /$$                                  
          | $$                  | $$                                  
  /$$$$$$$| $$$$$$$   /$$$$$$  /$$$$$$    /$$$$$$   /$$$$$$   /$$$$$$ 
 /$$_____/| $$__  $$ |____  $$|_  $$_/   |____  $$ /$$__  $$ /$$__  $$
| $$      | $$  \ $$  /$$$$$$$  | $$      /$$$$$$$| $$  \ $$| $$  \ $$
| $$      | $$  | $$ /$$__  $$  | $$ /$$ /$$__  $$| $$  | $$| $$  | $$
|  $$$$$$$| $$  | $$|  $$$$$$$  |  $$$$/|  $$$$$$$| $$$$$$$/| $$$$$$$/
 \_______/|__/  |__/ \_______/   \___/   \_______/| $$____/ | $$____/ 
                                                  | $$      | $$      
                                                  | $$      | $$      
                                                  |__/      |__/ 
```

## Available Scripts

In the project directory, you can run:

1. `npm install`
2. `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!


## Deployment

`npm run build` creates a `build` directory with a production build of your app. Set up your favourite HTTP server so that a visitor to your site is served `index.html`, and requests to static paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js` file.

### Static Server

For environments using [Node](https://nodejs.org/), the easiest way to handle this would be to install [serve](https://github.com/zeit/serve) and let it handle the rest:

```sh
npm install -g serve
serve -s build
```

