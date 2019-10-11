# sfc-listeners-guide

[![Netlify Status](https://api.netlify.com/api/v1/badges/b5295de5-7a12-4b05-9bfa-895c4d29b4ed/deploy-status)](https://app.netlify.com/sites/sfcblue/deploys)

The Unofficial Listener's Guide for The Sci-Fi Christian podcast

## Development

1. Install node

2. Navigate to repository folder and install dependencies

> cd projects/sfc-listeners/guide
> 
> npm install

3. (if running on Windows) Install Windows Build Tools (needed for node-sass)

> npm install --global --production windows-build-tools

4a. Build site (in _site)

```shell
npm run build
```

4b. Build, watch, serve site (at http://localhost:8080)

```shell
env:NODE_ENV="dev"; npm run dev # could not set NOD_ENV from node, so do in ps for now
```

4c. Build for production

```shell
env:NODE_ENV="prod"; npm run prod # could not set NOD_ENV from node, so do in ps for now
```

## Architecture
[Layouts, Templates, Components, Partials, Macros](https://css-tricks.com/component-led-design-patterns-nunjucks-grunt/)
