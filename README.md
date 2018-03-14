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

4. Run eleventy

> npm run build  # generates site in _site

or 

> npm run dev  # generates site in _site, watches and generates again when changes are made, serves the site at http://localhost:8080