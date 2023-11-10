#env #react 
# How to use Environment files (.env) in React App

[Muhammad Sameem](https://www.linkedin.com/in/devsameem?trk=pulse-article_main-author-card)![Click here to view Muhammad Sameem’s profile](https://media.licdn.com/dms/image/C4D03AQECNk4hN9XeoQ/profile-displayphoto-shrink_100_100/0/1664055949869?e=1677715200&v=beta&t=fDkftm6F2d7YguHOe4RBCBWIp_ER9ZLbDB0yqgPJIt8)


## What is .env file ?

environment or env is a file that holds variables and some sensitive data about your app.

## Why we need env files in our app?

1- According to create react app [documentation](https://create-react-app.dev/docs/adding-custom-environment-variables/)

> **_WARNING: Do not store any secrets (such as private API keys) in your React app!_**

Avoid storing any sensitive data in your js files, instead use env files to store them.

Sensitive data mean any data you shouldn't share with any one such as _api keys, secret-ids, firebase config keys_, etc.

2- Declaring different variables for each environment.

variables for Windows, MAC, Linux and API url’s,

## How to setup env files inside react app ?

So, how can we define the values depending on the environment

1- Install env-cmd [package](https://www.npmjs.com/package/env-cmd) from npm

2- Make a file called .env.envName in your project root, sush as .env.staging, .env.production, ... to differentiate between variables in each environment.

3- Inside the env file add your variables in key/value representation with prefix of REACT_APP

EXAMPLE:

REACT_APP_BASE_URL = "https://....."

Your file will look like this after adding your variables.

REACT_APP_API_KEY = "****"
REACT_APP_AUTHDOMAIN =  "****"
REACT_APP_BASEURL = "****"
REACT_APP_PROJECT_ID = "****"
REACT_APP_STORAGEBUCKET = "****""

4- Inside your _package.json_. change the scripts builds.

"scripts": {
    "start": "env-cmd -f .env.staging react-scripts start",
    "build:staging": "env-cmd -f .env.staging react-scripts build",
    "build:production": "env-cmd -f .env.production react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },

-   -f flag is for custom env file paths as the default is in the project root otherwise you should specify the actual path

"start": "env-cmd -f ../../.env.staging react-scripts start",

-   Your build command in each environment is not npm run build any more its **npm run build:staging , npm run build:production**.

## How to read variables values in js files ?

to use a value of a particular variable located in env file inside a js file all u need to do is to use the global process.env.variableName

EXAMPLE:

console.log(process.env.REACT_APP_API_KEY)

**_Important Notes_**

1- Don't forget to add your all env files to git-ignore file if not already added to prevent tracking them after any modification.

2- After each modification in env file, stop the server and start it again, otherwise it wont read your new changes.

3- stick to your company/team for env files naming convention, as not all deployments processes accepts the .env.envName convention.

For example vercel doesn't accept '.' in the env file name at all.

***NOTE**: I propose .env.local instead of .env because create-react-app add this file to gitignore when we create a project.

## References

1- [https://medium.com/swlh/keeping-env-variables-private-in-react-app-fa44a9b33c31](https://medium.com/swlh/keeping-env-variables-private-in-react-app-fa44a9b33c31)

2- [https://create-react-app.dev/docs/adding-custom-environment-variables/](https://create-react-app.dev/docs/adding-custom-environment-variables/)

#cross-env 

## Cross-env

npm i cross-env

in package.json:
"start:dev": "cross-env NODE_ENV=dev"
"start": "cross-env NODE_ENV=prod"

```
envFilePath: `.${process.env.NODE_ENV}.env`
```

