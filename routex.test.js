import routex from './routex';

describe('routex', () => {
  test('add route with name as object property', () => {
    const { routes } = routex().add({ name: 'route' });
    const route = routes[0];
    const expected = {
      name: 'route',
      pattern: '/route',
      page: '/route'
    };

    expect(route).toMatchObject(expected);
  });

  test('add route with name and pattern as object properties', () => {
    const { routes } = routex().add({
      name: 'route',
      pattern: 'route-pattern'
    });
    const route = routes[0];
    const expected = {
      name: 'route',
      pattern: '/route-pattern',
      page: '/route'
    };

    expect(route).toMatchObject(expected);
  });
});
