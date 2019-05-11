# Routex

Dynamic routes for Next.js

## Setup

```
npm i routex
```

## Examples

```javascript
import routex from 'routex';

const wrapper = routex();

wrapper
  .add({ name: 'index' })
  .add({ name: 'about' })
  .add({
    name: 'blog',
    pattern: '/blog/:post',
    page: 'blog-index'
  });
```
