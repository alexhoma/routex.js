import { compile } from 'path-to-regexp';

function findRouteByName(routesList, routeName) {
  return routesList.find(routeToFind => routeToFind.name === routeName);
}

function replaceStartingSlash(string) {
  return `/${string}`.replace(/^(\/\/)/, '/');
}

function replaceIndexRoute(string) {
  return string.replace(/^(\/index)$/, '/');
}

function paramsToQueryString(params) {
  const queryString = Object.keys(params)
    .filter(key => params[key] !== null && params[key] !== undefined)
    .map(key => {
      let value = params[key];

      if (Array.isArray(value)) {
        value = value.join('/');
      }
      return [encodeURIComponent(key), encodeURIComponent(value)].join('=');
    })
    .join('&');

  return queryString ? `?${queryString}` : '';
}

function createRoute({ name, pattern = name, page = name }) {
  const routePattern = replaceIndexRoute(replaceStartingSlash(pattern));
  const routePage = replaceStartingSlash(page);

  const toPath = compile(routePattern);

  function getLinkProps(params) {
    const as = toPath(params);
    const href = `${routePage}${paramsToQueryString(params)}`;

    return {
      as,
      href
    };
  }

  return {
    name,
    getLinkProps
  };
}

function composeRoutes(routes) {
  return routes.reduce((accumulatedRoutes, route) => {
    if (!route.name) {
      throw new Error(`A route name must be defined`);
    }

    if (findRouteByName(accumulatedRoutes, route.name)) {
      throw new Error(`This route name is already defined: ${route.name}`);
    }

    return [...accumulatedRoutes, createRoute(route)];
  }, []);
}

function createRouteLinks(routeDefinitions) {
  const composedRoutes = composeRoutes(routeDefinitions);

  return {
    link({ route: routeName, params = {} }) {
      if (!routeName) {
        throw new Error(`Function link() should have a route name`);
      }

      let foundRoute = findRouteByName(composedRoutes, routeName);

      if (!foundRoute) {
        throw new Error(
          `Route name "${routeName}" is not defined in your route definitions`
        );
      }

      const { as, href } = foundRoute.getLinkProps(params);

      return {
        as,
        href
      };
    }
  };
}

export default createRouteLinks;
