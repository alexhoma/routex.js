import routex from './routex';

describe('routex', () => {
  test('add route as string', () => {
    const { routes } = routex().add('string-route');
    const route = routes[0];
    const expected = {
      name: 'string-route',
      pattern: '/string-route',
      page: '/string-route'
    };

    expect(route).toMatchObject(expected);
  });
});
