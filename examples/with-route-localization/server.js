const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const { getRequestHandler } = require('routex.js');
const routes = require('./routes');

function getCountryCodeFromHostname(hostname) {
  return hostname.split('.').pop();
}

function routexHandlerMiddleware(req, res, next) {
  // Select specific hostname routes
  // example: realestate.es / realestate.co.uk
  const currentDomain = req.hostname;
  const domainRouteDefinitions = routes[currentDomain];

  // Load your routes so next will know how to
  // handle requests and manage server side routing
  const requestHandler = getRequestHandler(nextApp, domainRouteDefinitions);

  // Set routes into the request
  // so we can get it on nextjs pages
  req.appRouteDefinitions = domainRouteDefinitions;

  // Set countryCode to the request
  // This is just to tell the api client from witch country we want to fetch de data
  req.countryCode = getCountryCodeFromHostname(currentDomain);

  return requestHandler(req, res, next);
}

nextApp.prepare().then(() => {
  const app = express();

  app
    .use(express.static('public'))
    // Load the requestHandler middleware
    .use(routexHandlerMiddleware)
    .listen(3001);
});
