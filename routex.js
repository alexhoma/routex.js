function routex() {
  let routes = [];

  function add(route) {
    routes.push({
      name: route,
      pattern: '/' + route,
      page: '/' + route
    });

    return this;
  }

  return {
    add,
    routes
  };
}

export default routex;
