function createRouteLinks(routeDefinitions) {
  function findRouteByName(routesList, route) {
    return routesList.find(routeToFind => routeToFind.name === route.name);
  }

  function replaceStartingSlash(string) {
    return `/${string}`.replace(/^(\/\/)/, '/');
  }

  function createRoute({ name, pattern = name, page = name }) {
    const routePattern = replaceStartingSlash(pattern);
    const routePage = replaceStartingSlash(page);

    return {
      as: routePattern,
      href: routePage
    };
  }

  function composeRoutes(routes) {
    return routes.reduce((accumulatedRoutes, route) => {
      if (!route.name) {
        throw new Error(`A route name must be defined`);
      }

      if (findRouteByName(accumulatedRoutes, route)) {
        throw new Error(`This route name is already defined: ${route.name}`);
      }

      return [...routes, createRoute(route)];
    }, []);
  }

  const composedRoutes = composeRoutes(routeDefinitions);

  return {
    link({ route }) {
      const { as, href } = findRouteByName(composedRoutes, route);

      return {
        as,
        href
      };
    }
  };
}

export default createRouteLinks;
