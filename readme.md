# Image-Processing-API

## Scripts
  "scripts": {
    "test": "npm run build && npm run jasmine",
    "jasmine": "jasmine",
    "build": "npx tsc",
    "start": "nodemon src/server.ts",
    "lint": "eslint . --ext .ts",
    "prettier": "prettier --write src/**/*.ts "
  }
## LocalHost
    Listening on port 3000
## List of predefined images
    encenadaport,fjord,icelandwaterfall,palmtunnel,santamonica
## URL example
    http://www.localhost:3000/images/?width=100&height=100&filename=fjord

## Start
    To start the server type in the terminal "npm run start"
