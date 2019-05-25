import { parse } from 'url';
import { createRoute } from '.';
const pathToRegexp = require('path-to-regexp');

function matchRoute(routes, pathname) {
  return routes.reduce(function extractRouteDescription(result, route) {
    const params = route.match(pathname);
    if (!params) {
      return result;
    }

    return {
      ...result,
      params,
      page: route.page
    };
  }, {});
}

function getRequestHandler(nextApp, routesDefinitions = []) {
  const nextRequestHandler = nextApp.getRequestHandler();
  const routes = routesDefinitions.map(createRoute);

  // This returns a middleware function
  // that will be executed by your node server
  return function(req, res) {
    const parsedUrl = parse(req.url, true);
    const pathname = decodeURIComponent(parsedUrl.pathname);

    const { page, params } = matchRoute(routes, pathname);

    if (page) {
      return nextApp.render(req, res, page, params);
    }

    return nextRequestHandler(req, res, parsedUrl);
  };
}

export default getRequestHandler;
