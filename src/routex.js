import NextLink from 'next/link';
import React from 'react';
import toQueryString from './toQueryString';
import pathToRegexp from 'path-to-regexp';

function createRoute({ name, pattern = name, page = name }) {
  const routePattern = `/${pattern}`.replace(/^(\/\/)/, '/');
  const routePage = `/${page}`
    .replace(/^(\/index)$/, '/')
    .replace(/^(\/\/)/, '/');

  const regex = pathToRegexp(routePattern);
  const toPath = pathToRegexp.compile(pattern);

  function getComputedProps(params = {}) {
    const as = toPath(params);
    const href = `${routePage}${toQueryString(params)}`;

    return {
      as,
      href
    };
  }

  return {
    name,
    pattern: routePattern,
    page: routePage,
    getComputedProps
  };
}

function routex(createLink) {
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

  return {
    add,
    routes,
    Link: createLink(findByName)
  };
}

export default function({ Link = NextLink } = {}) {
  function createLink(findByName) {
    const RoutexLink = props => {
      const { route, params } = props;

      if (!route) {
        return <Link {...props} />;
      }

      const foundRoute = findByName(route);
      const { as, href } = foundRoute.getComputedProps(params);

      return <Link as={as} href={href} {...props} />;
    };

    return RoutexLink;
  }

  return routex(createLink);
}
