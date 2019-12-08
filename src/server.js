import { parse } from 'url';
import { pathToRegexp } from 'path-to-regexp';
import { replaceIndexRoute, replaceStartingSlash } from './utils';

function createRoute({ name, pattern = name, page = name }) {
  const routePattern = replaceIndexRoute(replaceStartingSlash(pattern));
  const routePage = replaceStartingSlash(page);

  const keys = [];
  const regex = pathToRegexp(routePattern, keys);

  function match(pathname) {
    const matched = regex.exec(pathname);

    if (!matched) {
      return null;
    }

    const matchedRouteKeys = matched.slice(1);

    return matchedRouteKeys.reduce(function transformParamsToObject(
      parameters,
      param,
      key,
    ) {
      if (param === undefined) {
        return parameters;
      }

      return {
        ...parameters,
        [keys[key].name]: decodeURIComponent(param),
      };
    },
    {});
  }

  return {
    match,
    page: routePage,
  };
}

function matchRoute(routes, pathname) {
  return routes.reduce(function extractRouteDescription(result, route) {
    if (result.page) {
      return result;
    }

    const params = route.match(pathname);
    if (!params) {
      return result;
    }

    return {
      params,
      page: route.page,
    };
  }, {});
}

function getRequestHandler(nextApp, routesDefinitions = []) {
  const nextRequestHandler = nextApp.getRequestHandler();
  const routes = routesDefinitions.map(createRoute);

  // This returns a middleware function
  // that will be executed by your node server
  return function requestHandler(req, res) {
    const parsedUrl = parse(req.url, true);
    const pathname = decodeURIComponent(parsedUrl.pathname);

    const { page, params } = matchRoute(routes, pathname);

    if (page) {
      const pageParams = {
        ...params,
        ...parsedUrl.query,
      };

      return nextApp.render(req, res, page, pageParams);
    }

    return nextRequestHandler(req, res, parsedUrl);
  };
}

export default getRequestHandler;
