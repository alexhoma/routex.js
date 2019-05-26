## Example

As an example of a Next.js application using Routex,
let's imagine that your current project would look like this:

```
pages/
 |-- blog.js
 |-- about.js
src/
 |-- server.js
 |-- routes.js
```

Your routex instance file `src/routes.js`:

```javascript
import routex from 'routex.js';

// Define here your application routes
const routes = [
  {
    name: 'about',
    pattern: '/about'
  },
  {
    name: 'blog',
    pattern: '/blog/:post'
  }
];

// Instance routex
const routesInstance = routex();

// Load routes into routex instance
routes.forEach(route => routesInstance.add(route));

// Export instance with all loaded routes
export default routesInstance;
```

Your server file `src/server.js`:

```javascript
const express = require('express');
const next = require('next');
const getRequestHandler = require('routex/server');
const { routes } = require('./routes');

const nextApp = next({
  dev: process.env.NODE_ENV !== 'production'
});

// Load your routes so next will know how to
// handle requests and manage server side routing
const routexHandlerMiddleware = getRequestHandler(app, routes);

app.prepare().then(() => {
  const server = express();

  // Load the requestHandler middleware
  server.use(routexHandlerMiddleware);

  server.listen(3000, err => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
```
