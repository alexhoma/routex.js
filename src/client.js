import NextLink from 'next/link';
import { createElement, createContext, useContext } from 'react';
import { compile } from 'path-to-regexp';

function toQueryString(obj) {
  const queryString = Object.keys(obj)
    .filter(key => obj[key] !== null && obj[key] !== undefined)
    .map(key => {
      let value = obj[key];

      if (Array.isArray(value)) {
        value = value.join('/');
      }
      return [encodeURIComponent(key), encodeURIComponent(value)].join('=');
    })
    .join('&');

  return queryString ? `?${queryString}` : '';
}

function createRoute({ name, pattern = name, page = name }) {
  const routePage = `/${page}`
    .replace(/^(\/index)$/, '/')
    .replace(/^(\/\/)/, '/');

  const toPath = compile(pattern);

  function getUrlProperties(params = {}) {
    const as = toPath(params);
    const href = `${routePage}${toQueryString(params)}`;

    return {
      as,
      href
    };
  }

  return {
    name,
    getUrlProperties
  };
}

function composeRoutes(routes) {
  return routes.map(route => {
    const { name } = route;

    if (!name) {
      throw new Error(`A route name must be defined`);
    }

    return createRoute(route);
  });
}

function createRoutesProvider(routes, { Link = NextLink } = {}) {
  const composedRoutes = composeRoutes(routes);
  const RoutexContext = createContext(composedRoutes);

  function RoutesProvider(props) {
    return createElement(RoutexContext.Provider, {
      value: composedRoutes,
      ...props
    });
  }

  function RoutexLink(props) {
    const { route: currentRoute, params } = props;

    if (!currentRoute) {
      return createElement(Link, { ...props });
    }

    return createElement(RoutexContext.Consumer, null, routes => {
      const foundRoute = routes.find(route => {
        return route.name === currentRoute;
      });
      const { as, href } = foundRoute.getUrlProperties(params);

      return createElement(Link, { as, href, ...props });
    });
  }

  return {
    RoutesProvider,
    Link: RoutexLink
  };
}

export default createRoutesProvider;
