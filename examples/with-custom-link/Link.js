import React from 'react';
import NextLink from 'next/link';
import { createRouteLinks } from 'routex.js';
import routes from './routes';

const { link } = createRouteLinks(routes);

export default function CustomLink({ children, title, route, params }) {
  const { as, href } = link({ route, params: { ...params } });

  return (
    <NextLink href={href} as={as}>
      <a title={title}>{children}</a>
    </NextLink>
  );
}
