import NextLink from 'next/link';
import React from 'react';

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

function routex({ Link = NextLink } = {}) {
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

  function getLinkComponent() {
    const RoutexLink = props => (
      <Link as="a-route-pattern" href="a-route-page" {...props} />
    );

    return RoutexLink;
  }

  return {
    add,
    routes,
    Link: getLinkComponent()
  };
}

export default routex;
