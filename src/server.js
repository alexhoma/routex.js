const { parse } = require('url');
const { createRoute } = require('./index');
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
      const pageParams = {
        ...params,
        ...parsedUrl.query
      };

      return nextApp.render(req, res, page, pageParams);
    }

    return nextRequestHandler(req, res, parsedUrl);
  };
}

module.exports = getRequestHandler;
