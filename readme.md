# Image-Processing-API
## Overview
The Image API Project is a Node.js and TypeScript application designed to resize images from a predefined list. It utilizes the "sharp" library for efficient and high-quality image resizing. The resized images are stored in a cache folder named "thumbs" for quick retrieval.

## Features
- Resizes images from a predefined list to specified dimensions.
- Utilizes the "sharp" library for fast and high-quality image processing.
- Stores resized images in a cache folder for quicker access.
- Easily extendable for adding more images and resizing options.
- Validates images based on width, height, and filename criteria.

## List of predefined images
      - encenadaport
      - fjord
      - icelandwaterfall
      - palmtunnel
      - santamonica
## URL example
    http://www.localhost:3000/images/?width=100&height=100&filename=fjord

## Tech Stack
The Image Resizer Project is built using the following technologies and libraries:

- Node.js: A JavaScript runtime that allows you to run JavaScript code on the server-side.

- TypeScript: A statically typed superset of JavaScript that adds type annotations, providing better tooling and code quality.

- Sharp: A high-performance image processing library for Node.js that enables efficient image resizing and manipulation.

- Jasmine: A behavior-driven development framework for testing JavaScript code.

- Supertest: A library for testing HTTP APIs in a simple and easy-to-use manner.

## Requirements
 - Node.js installed on your machine (https://nodejs.org/).
 - NPM (Node Package Manager) to manage project dependencies.

## Installation
1. Clone the repository to your local machine:
```
git clone https://github.com/your-username/image-resizer.git
```

2. Navigate to the project directory:
```
cd image processing api
```
3. Install project dependencies:

```
npm install
```
4. Start the server
```
npm run start
```
5. Run tests
```
npm run test
```

## Acknowledments
The project is inspired by Udacity FWD program.