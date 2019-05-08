function routex() {
  let routes = [];

  function add(route) {
    const { name, pattern } = route;

    routes.push({
      name,
      pattern: `/${pattern || name}`,
      page: `/${name}`
    });

    return this;
  }

  return {
    add,
    routes
  };
}

export default routex;
