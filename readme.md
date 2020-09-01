Code for the Brain Beats Website (client side)

## How to run:

- Install Node & npm
- Install yarn
- Enter these commands:
Please refer to this link to get your github token and how to make a .npmrc in the root folder of your machine to be able to install our BrainBeats Audio Package
https://docs.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages

```
npm install
yarn start
```


## How to build and run brain_beats docker image

1. Create an access token from your github account by following this [link](https://github.com/settings/tokens)

   - Create a note for the purpose of the token
   - Under 'select scopes' check off ' read:packages '
   - Click Generate token

2. Go to root of project folder (where Dockerfile is located)

3. Copy token into ARG command placeholder

``` docker
ARG apikey="INSERT_GITHUB_AUTH_TOKEN_HERE"
``` 

4. Run docker build from console. (make sure you're at the root of your project folder)
```docker
docker build -t react-docker .
```

Note: Ignore warning/errors that show up in npm console output

5. Run image
```docker
docker run -it -p 3000:3000 react-docker:latest
```

Note: Depending on your port availability or usage you might have to change it to a different port (e.g. 3001, 3002, ....)

6. open localhost:3000