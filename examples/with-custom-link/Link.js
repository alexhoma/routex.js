import React from 'react';
import NextLink from 'next/link';
import { createRouteLinks } from 'routex.js';
import isEqual from 'react-fast-compare';
import routes from './routes';

const { link } = createRouteLinks(routes);

const CustomLink = ({ children, title, route, params }) => {
  const { as, href } = link({ route, params: { ...params } });

  return (
    <NextLink href={href} as={as}>
      <a title={title}>{children}</a>
    </NextLink>
  );
};


export default React.memo(CustomLink, isEqual);
