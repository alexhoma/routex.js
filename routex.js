import NextLink from 'next/link';
import React from 'react';

function createRoute({ name, pattern = name, page = name }) {
  const routePattern = `/${pattern}`.replace(/^\/\//, '/');
  const routePage = `/${page}`.replace(/^\/index$/, '/').replace(/^\/\//, '/');

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

    if (!name) {
      throw new Error(`A route name must be defined`);
    }

    if (findByName(name)) {
      throw new Error(`This route name already exists: ${name}`);
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
