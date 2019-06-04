function createRouteLinks(routeDefinitions) {
  function findRouteByName(routesList, routeName) {
    return routesList.find(routeToFind => routeToFind.name === routeName);
  }

  function replaceStartingSlash(string) {
    return `/${string}`.replace(/^(\/\/)/, '/');
  }

  function replaceIndexRoute(string) {
    return string.replace(/^(\/index)$/, '/');
  }

  function createRoute({ name, pattern = name, page = name }) {
    const routePattern = replaceIndexRoute(replaceStartingSlash(pattern));
    const routePage = replaceStartingSlash(page);

    return {
      name,
      as: routePattern,
      href: routePage
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

  const composedRoutes = composeRoutes(routeDefinitions);

  return {
    link({ route: routeName }) {
      if (!routeName) {
        throw new Error(`Function link() should have a route name`);
      }

      const { as, href } = findRouteByName(composedRoutes, routeName);

      return {
        as,
        href
      };
    }
  };
}

export default createRouteLinks;
