const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const routes = require('./routes');
const { getRequestHandler } = require('../dist/routex');

// Load your routes so next will know how to
// handle requests and manage server side routing
const routexHandlerMiddleware = getRequestHandler(nextApp, routes);

nextApp.prepare().then(() => {
  const server = express();

  // Load the requestHandler middleware
  server.use(routexHandlerMiddleware);

  server.listen(3001, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:3001`);
  });
});
