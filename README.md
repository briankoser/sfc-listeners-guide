# sfc-listeners-guide
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
npm run dev
```

4c. Build for production

```shell
npm run prod
```

## Architecture
[Layouts, Templates, Components, Partials, Macros](https://css-tricks.com/component-led-design-patterns-nunjucks-grunt/)