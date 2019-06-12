const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const routes = require('./routes');
const { getRequestHandler } = require('routex.js');

// Load your routes so next will know how to
// handle requests and manage server side routing
const routexHandlerMiddleware = getRequestHandler(nextApp, routes);

nextApp.prepare().then(() => {
  express()
    // Load the requestHandler middleware
    .use(routexHandlerMiddleware)
    .listen(3001);
});
