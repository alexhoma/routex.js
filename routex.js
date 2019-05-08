function routex() {
  let routes = [];

  function add(route) {
    const { name, pattern, page } = route;

    if (routes.find(route => route.name === name)) {
      throw new Error('This routeName already exists');
    }

    routes.push({
      name,
      pattern: `/${pattern || name}`,
      page: `/${page || name}`
    });

    return this;
  }

  return {
    add,
    routes
  };
}

export default routex;
