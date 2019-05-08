import routex from './routex';

describe('routex', () => {
  test('should add a route definition with name', () => {
    const { routes } = routex().add({ name: 'route' });
    const route = routes[0];
    const expected = {
      name: 'route',
      pattern: '/route',
      page: '/route'
    };

    expect(route).toMatchObject(expected);
  });

  test('should add a route definition with name and pattern', () => {
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

  test('should add a route definition with name, pattern and page', () => {
    const { routes } = routex().add({
      name: 'route',
      pattern: 'route-pattern',
      page: 'route-page'
    });
    const route = routes[0];
    const expected = {
      name: 'route',
      pattern: '/route-pattern',
      page: '/route-page'
    };

    expect(route).toMatchObject(expected);
  });

  test('should add many route definitions', () => {
    const { routes } = routex()
      .add({ name: 'first-route' })
      .add({ name: 'second-route' });

    expect(routes.length).toBe(2);
  });

  test('should throw an Error if route name already exists', () => {
    expect(() =>
      routex()
        .add({ name: 'route' })
        .add({ name: 'route' })
    ).toThrow(new Error('This routeName already exists'));
  });
});
