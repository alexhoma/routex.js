# Routex ![][npm-version] ![][bundlephobia-min-badge] ![][bundlephobia-minzip-badge]

Yes, another library to handle dynamic routes in Next.js

- :earth_africa: Universal
- :leaves: Tree shakeable
- :ant: Tiny for client side
- :link: Build your custom `<Link />` on top
- :tada: Same route api as [next-routes]
- :sunglasses: Cool name

Inspired by [next-routes] and [next-minimal-routes].

## Setup

Install routex in your Next.js project:

```
npm i routex.js
```

Okay, so now we have installed routex. First of all we'll need to declare
our application's route definitions. So let's create a `routes.js` file:

```javascript
module.exports = [
  {
    name: 'index',
    pattern: '/'
  },
  {
    name: 'post',
    pattern: '/post/:slug',
    page: 'post'
  }
];
```

Once routes are declared, we want to handle it whenever a user loads any existing url
in our application. So here we need to create our routex `requestHandlerMiddleware` in our `server.js` file,
passing the next.js instance (`nextApp`) and our route definitions (`routes`) like this:

```javascript
const express = require('express');
const next = require('next');
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const routes = require('./routes');
const { getRequestHandler } = require('routex');

const routexHandlerMiddleware = getRequestHandler(nextApp, routes);

nextApp.prepare().then(() => {
  express()
    .use(routexHandlerMiddleware);
    .listen(3000);
});
```

Hooray! our server now handles dynamic routes. But now we need a way to create link
components to point to that dynamic routes. So let's create a file `CustomLink.js` to use
in our components.

```javascript
import NextLink from 'next/link';
import { createRouteLinks } from 'routex.js';
import routes from './routes';

const { link } = createRouteLinks(routes);

export default function CustomLink({ children, route, params }) {
  return (
    <NextLink {...link({ route, params: { ...params } })}>
      <a>{children}</a>
    </NextLink>
  );
}
```

The `createRouteLinks` function transforms and closures all your routes and returns
a new `link` function. This `link` is the one that will provide to the `<NextLink />` component
the `as` and `href` props. And it needs this two parameters:

- `route`: a route name, the one that you have in the route definiton.
- `params`: all dynamic params

And this is how you'll use your `<CustomLink />` component:

```javascript
import CustomLink from './CustomLink';

export default function MyApp() {
  return (
    <>
      This is an example page component:
      <CustomLink
        route="post"
        params={{
          slug: 'next-js-post'
        }}
      >
        Next.js post link
      </Link>
    </>
  );
}
```

This is exactly the same if we provide to the Next's own `NextLink`
the props `as` and `href` but in an easy way:

```javascript
import NextLink from 'next/link';

<NextLink as="/post/next-js-post" href="/post?slug=next-js-post">
  <a>Next.js post link</a>
</NextLink>;
```

> Also, you can call your link `<CustomLink>` or whatever you want it.
> For more information have a look into the (example app)[./example] directory.

[npm-version]: https://badgen.net/npm/v/routex.js
[bundlephobia-min-badge]: https://badgen.net/bundlephobia/min/routex.js
[bundlephobia-minzip-badge]: https://badgen.net/bundlephobia/minzip/routex.js
[next-routes]: https://github.com/fridays/next-routes 'fridays/next-routes'
[next-minimal-routes]: https://github.com/lydell/next-minimal-routes 'lydell/next-minimal-routes'
