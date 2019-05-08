function createRoute(definition) {
  const { name, pattern, page } = definition;

  const routePattern = `/${pattern || name}`;
  const routePage = name !== 'index' ? `/${page || name}` : '/';

  return {
    name,
    pattern: routePattern,
    page: routePage
  };
}

function routex() {
  let routes = [];

  function findByName(name) {
    return routes.find(route => route.name === name);
  }

  function add(definition) {
    const { name } = definition;

    if (findByName(name)) {
      throw new Error(`This routeName already exists: ${name}`);
    }

    const route = createRoute(definition);
    routes.push(route);

    return this;
  }

  return {
    add,
    routes
  };
}

export default routex;
