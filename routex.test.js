import routex from './routex';
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';

const renderer = new ReactShallowRenderer();

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
    const routeName = 'repeated-route';

    expect(() =>
      routex()
        .add({ name: routeName })
        .add({ name: routeName })
    ).toThrow(new Error(`This routeName already exists: ${routeName}`));
  });

  test('should replace route definition to slash when equals to "index"', () => {
    const { routes } = routex().add({
      name: 'index'
    });
    const route = routes[0];
    const expected = {
      name: 'index',
      pattern: '/index',
      page: '/'
    };

    expect(route).toMatchObject(expected);
  });
});

describe('RoutexLink ', () => {
  test('should have a Link component that renders its children correctly', () => {
    const { Link } = routex();
    const tree = renderer.render(
      <Link>
        <a>Anchor text</a>
      </Link>
    );

    expect(tree.props.children.type).toBe('a');
  });

  test('should return a Link with "as" and "href" properties', () => {
    const { Link } = routex().add({
      name: 'a-route-name',
      pattern: '/a-route-pattern',
      page: 'a-route-page'
    });
    const tree = renderer.render(
      <Link route="a-route-name">
        <a>Anchor text</a>
      </Link>
    );

    expect(tree.props.as).toBe('a-route-pattern');
    expect(tree.props.href).toBe('a-route-page');
  });
});
