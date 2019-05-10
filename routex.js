import NextLink from 'next/link';
import React from 'react';

function createRoute(definition) {
  const { name, pattern, page } = definition;

  const routePattern = `/${pattern || name}`.replace(/^\/\//, '/');
  const routePage = `/${page || name}`
    .replace(/^\/index$/, '/')
    .replace(/^\/\//, '/');

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
    const RoutexLink = props => {
      const { route } = props;
      const { pattern, page } = findByName(route);

      return <Link as={pattern} href={page} {...props} />;
    };

    return RoutexLink;
  }

  return {
    add,
    routes,
    Link: getLinkComponent()
  };
}

export default routex;
