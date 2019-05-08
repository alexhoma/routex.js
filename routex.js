function routex() {
  let routes = [];

  function add(route) {
    if (typeof route !== 'object') {
      routes.push({
        name: route,
        pattern: '/' + route,
        page: '/' + route
      });
    }

    routes.push({
      name: route.name,
      pattern: '/' + route.name,
      page: '/' + route.name
    });

    return this;
  }

  return {
    add,
    routes
  };
}

export default routex;
