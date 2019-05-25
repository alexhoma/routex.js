import NextLink from 'next/link';
import React from 'react';
import toQueryString from './to-query-string';
import pathToRegexp from 'path-to-regexp';

export function createRoute({ name, pattern = name, page = name }) {
  const routePattern = `/${pattern}`.replace(/^(\/\/)/, '/');
  const routePage = `/${page}`
    .replace(/^(\/index)$/, '/')
    .replace(/^(\/\/)/, '/');

  const keys = [];
  const regex = pathToRegexp(routePattern, keys);
  const toPath = pathToRegexp.compile(pattern);

  function getComputedProps(params = {}) {
    const as = toPath(params);
    const href = `${routePage}${toQueryString(params)}`;

    return {
      as,
      href
    };
  }

  function match(pathname) {
    const matched = regex.exec(pathname);

    if (!matched) {
      return null;
    }

    const matchedRouteKeys = matched.slice(1);

    function transformParamsToObject(parameters, param, i) {
      if (param === undefined) {
        return parameters;
      }

      return {
        ...parameters,
        [keys[i].name]: decodeURIComponent(param)
      };
    }

    return matchedRouteKeys.reduce(transformParamsToObject, {});
  }

  return {
    name,
    pattern: routePattern,
    page: routePage,
    getComputedProps,
    match
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
