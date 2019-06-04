import routex from '.';

test('routex entry points', () => {
  expect(typeof routex.getRequestHandler).toBe('function');
  expect(typeof routex.createRouteLinks).toBe('function');
});
