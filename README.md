# happyair-backend

This repo is the backend for City of Helsinki air quality satisfaction project
The Android client: https://github.com/giang29/happyair-android

## Language, libraries and tools

-   [TypeScript](https://www.typescriptlang.org/) the project is 100% written in TypeScript
-   [Node.js](https://nodejs.org/en/) a JavaScript runtime
-   [Express](https://expressjs.com/) a minimal and flexible Node.js web application framework
-   [Axios](https://github.com/axios/axios) Promise based HTTP client for the browser and node.js
-   [Moment.js](https://momentjs.com/) Parse, validate, manipulate, and display dates and times in JavaScript.

## Getting Started

### Requirements

-   Node version >= 12
-   Internet connection for fetching data.

### Run the application

1. Create a `.env` file in the root directory, then add your Feedbackly token and Nuuka token as follow:

```
FEEDBACKLY_TOKEN=<YOUR-FEEDBACKLY-TOKEN>
NUUKA_TOKEN=<YOUR-NUUKA-TOKEN>
```

3. Install the required packages with `yarn install` or `npm install`.
4. Start the dev server with `yarn dev` or `npm run dev`.
