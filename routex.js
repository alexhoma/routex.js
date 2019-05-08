function routex() {
  let routes = [];

  function add(route) {
    const { name, pattern, page } = route;

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
