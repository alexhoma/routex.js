import createRouteLinks from './client';

describe('client/createRouteLinks', () => {
  test('should return a link() function', () => {
    const routes = [
      {
        name: 'a-route-name'
      }
    ];

    const { link } = createRouteLinks(routes);

    expect(link).toBeDefined();
  });

  test('should throw an error if a route name is not defined', () => {
    const routes = [
      {
        name: 'a-route-name'
      },
      {
        pattern: 'a-route-pattern'
      }
    ];

    expect(() => createRouteLinks(routes)).toThrow(
      new Error(`A route name must be defined`)
    );
  });

  test('should throw an error if a route name is already defined', () => {
    const duplicatedRouteName = 'a-route-name';
    const routes = [
      {
        name: duplicatedRouteName
      },
      {
        name: duplicatedRouteName
      }
    ];

    expect(() => createRouteLinks(routes)).toThrow(
      new Error(`This route name is already defined: ${duplicatedRouteName}`)
    );
  });
});
