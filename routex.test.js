import routex from './routex';

describe('routex', () => {
  test('add with object', () => {
    const { routes } = routex().add({ name: 'a' });
    const route = routes[0];
    const expected = { name: 'a', pattern: '/a', page: '/a' };

    expect(route).toMatchObject(expected);
  });
});
