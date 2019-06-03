export default function createRouteLinks(routes) {
  routes.reduce((acc, route) => {
    if (!route.name) {
      throw new Error(`A route name must be defined`);
    }

    if (acc.find(routeToFind => routeToFind.name === route.name)) {
      throw new Error(`This route name is already defined: ${route.name}`);
    }

    return [...routes, route];
  }, []);

  return {
    link() {}
  };
}
