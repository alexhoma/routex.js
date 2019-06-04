import createRouteLinks from './client';

describe('client/createRouteLinks', () => {
  test('should return a link() function', () => {
    const routes = [{ name: 'a-route-name' }];

    const { link } = createRouteLinks(routes);

    expect(link).toBeDefined();
  });

  test('should throw an error if a route name is not defined', () => {
    const routes = [{ name: 'a-route-name' }, { pattern: '/a-route-pattern' }];

    expect(() => createRouteLinks(routes)).toThrow(
      new Error(`A route name must be defined`)
    );
  });

  test('should throw an error if a route name is already defined', () => {
    const duplicatedRouteName = 'a-route-name';
    const routes = [
      { name: duplicatedRouteName },
      { name: duplicatedRouteName }
    ];

    expect(() => createRouteLinks(routes)).toThrow(
      new Error(`This route name is already defined: ${duplicatedRouteName}`)
    );
  });

  describe('link', () => {
    test('should throw an error if no route given', () => {
      const { link } = createRouteLinks([]);

      expect(() => link({ route: undefined })).toThrow(
        new Error(`Function link() should have a route name`)
      );
    });

    test('should return link props given a route definition with a name', () => {
      const routes = [{ name: 'a-route-name' }];
      const { link } = createRouteLinks(routes);

      const expected = {
        as: '/a-route-name',
        href: '/a-route-name'
      };

      expect(
        link({
          route: 'a-route-name'
        })
      ).toEqual(expected);
    });

    test('should return link props given a route definition with a name and pattern', () => {
      const routes = [{ name: 'a-route-name', pattern: '/a-route-pattern' }];
      const { link } = createRouteLinks(routes);

      const expected = {
        as: '/a-route-pattern',
        href: '/a-route-name'
      };

      expect(
        link({
          route: 'a-route-name'
        })
      ).toEqual(expected);
    });

    test('should return link props given a route definition with a name, pattern and page', () => {
      const routes = [
        {
          name: 'a-route-name',
          pattern: '/a-route-pattern',
          page: '/a-route-page'
        }
      ];
      const { link } = createRouteLinks(routes);

      const expected = {
        as: '/a-route-pattern',
        href: '/a-route-page'
      };

      expect(
        link({
          route: 'a-route-name'
        })
      ).toEqual(expected);
    });

    test('link properties should not have more than one starting slash', () => {
      const routes = [
        {
          name: 'a-route-name',
          pattern: '/a-route-pattern',
          page: '/a-route-page'
        }
      ];
      const { link } = createRouteLinks(routes);

      const expected = {
        as: '/a-route-pattern',
        href: '/a-route-page'
      };

      expect(
        link({
          route: 'a-route-name'
        })
      ).toEqual(expected);
    });

    test('link "as" property should be a slash when route definition name is equal to "index"', () => {
      const routes = [{ name: 'index' }];
      const { link } = createRouteLinks(routes);

      const expected = {
        as: '/',
        href: '/index'
      };

      expect(
        link({
          route: 'index'
        })
      ).toEqual(expected);
    });

    test('should return link props with amatched route definition', () => {
      const routes = [
        {
          name: 'a-route-name',
          pattern: '/a-route-pattern',
          page: '/a-route-page'
        },
        {
          name: 'another-route-name',
          pattern: '/another-route-pattern',
          page: '/another-route-page'
        }
      ];
      const { link } = createRouteLinks(routes);

      const expected = {
        as: '/another-route-pattern',
        href: '/another-route-page'
      };

      expect(
        link({
          route: 'another-route-name'
        })
      ).toEqual(expected);
    });
  });
});
