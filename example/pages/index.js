import React from 'react';
import Link from '../Link';

export default function Blog() {
  return (
    <div>
      <h1>Blog homepage</h1>
      <ul>
        <li>
          <Link
            route="post"
            params={{
              slug: 'next-js-post'
            }}
          >
            Next.js post link
          </Link>
        </li>
        <li>
          <Link
            route="post"
            params={{
              slug: 'routex-js-post'
            }}
          >
            Routex.js post link
          </Link>
        </li>
        <li>
          <Link
            route="post"
            params={{
              slug: 'dynamic-routes-in-next-js'
            }}
          >
            Dynamic routes in Next.js link
          </Link>
        </li>
      </ul>
    </div>
  );
}
