import React from 'react';
import NextLink from 'next/link';
import routes from './routes';
import { createRouteLinks } from '../dist/routex';

const { link } = createRouteLinks(routes);

export default function CustomLink({ children, title, route, params }) {
  return (
    <NextLink {...link({ route, params: { ...params } })}>
      <a title={title}>{children}</a>
    </NextLink>
  );
}
