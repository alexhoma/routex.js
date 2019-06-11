import { getRequestHandler, createRouteLinks } from '.';

test('routex entry points', () => {
  expect(typeof getRequestHandler).toBe('function');
  expect(typeof createRouteLinks).toBe('function');
});
