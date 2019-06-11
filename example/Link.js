import React from 'react';
import NextLink from 'next/link';
import { createRouteLinks } from 'routex.js';
import routes from './routes';

const { link } = createRouteLinks(routes);

export default function CustomLink({ children, title, route, params }) {
  return (
    <NextLink {...link({ route, params: { ...params } })}>
      <a title={title}>{children}</a>
    </NextLink>
  );
}
