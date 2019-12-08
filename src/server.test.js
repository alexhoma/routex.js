import getRequestHandler from './server';
import { parse } from 'url';

const nextRender = jest.fn();
const nextRequestHandler = jest.fn();
const nextApp = {
  render: nextRender,
  getRequestHandler: () => nextRequestHandler,
};

beforeEach(() => jest.resetAllMocks());

describe('server/getRequestHandler', () => {
  test('call next requestHandler when route does not exist in route definitions', () => {
    const httpHandler = {
      req: {
        url: '/a-route-url',
      },
      res: {},
    };
    const { req, res } = httpHandler;
    const parsedUrl = parse(req.url, true);

    getRequestHandler(nextApp)(req, res);

    expect(nextRequestHandler).toHaveBeenCalledWith(req, res, parsedUrl);
  });

  test('call next render when given route exists', () => {
    const httpHandler = {
      req: {
        url: '/a-route-pattern',
        query: {},
      },
      res: {},
    };
    const { req, res } = httpHandler;

    const routes = [
      {
        name: 'a-route-name',
        pattern: 'a-route-pattern',
        page: '/a-route-page',
      },
      {
        name: 'another-route-name',
        pattern: 'another-route-pattern',
        page: '/another-route-page',
      },
    ];

    const [matchedRoute] = routes;
    getRequestHandler(nextApp, routes)(req, res);

    expect(nextRender).toHaveBeenCalledWith(
      req,
      res,
      matchedRoute.page,
      req.query,
    );
  });

  test('call next render with /index page when matched route name is "index"', () => {
    const httpHandler = {
      req: {
        url: '/',
        query: {},
      },
      res: {},
    };
    const { req, res } = httpHandler;

    const routes = [
      {
        name: 'index',
      },
    ];

    const [matchedRoute] = routes;
    const expectedPage = '/index';
    getRequestHandler(nextApp, routes)(req, res);

    expect(nextRender).toHaveBeenCalledWith(req, res, expectedPage, req.query);
  });

  test('call next render with existing page when matched route is defined only by name', () => {
    const httpHandler = {
      req: {
        url: '/a-route-name',
        query: {},
      },
      res: {},
    };
    const { req, res } = httpHandler;

    const routes = [
      {
        name: 'a-route-name',
      },
    ];

    const [matchedRoute] = routes;
    const expectedPage = `/${matchedRoute.name}`;
    getRequestHandler(nextApp, routes)(req, res);

    expect(nextRender).toHaveBeenCalledWith(req, res, expectedPage, req.query);
  });

  test('call next render when matched route pattern starts with a slash', () => {
    const httpHandler = {
      req: {
        url: '/a-route-pattern-with-starting-slash',
        query: {},
      },
      res: {},
    };

    const { req, res } = httpHandler;

    const routes = [
      {
        name: 'a-route-name',
        pattern: '/a-route-pattern-with-starting-slash',
        page: '/a-route-page',
      },
    ];

    const [matchedRoute] = routes;
    getRequestHandler(nextApp, routes)(req, res);

    expect(nextRender).toHaveBeenCalledWith(
      req,
      res,
      matchedRoute.page,
      req.query,
    );
  });

  test('call next render when given route exists with route path params', () => {
    const httpHandler = {
      req: {
        url: '/a-route-pattern-firstParam-secondParam',
        query: {
          param1: 'firstParam',
          param2: 'secondParam',
        },
      },
      res: {},
    };
    const { req, res } = httpHandler;

    const routes = [
      {
        name: 'a-route-name',
        pattern: 'a-route-pattern-:param1-:param2',
        page: '/a-route-page',
      },
    ];

    const matchedRoute = routes[0];
    getRequestHandler(nextApp, routes)(req, res);

    expect(nextRender).toHaveBeenCalledWith(
      req,
      res,
      matchedRoute.page,
      req.query,
    );
  });

  test('call next render without optional parameters when optionals are not provided', () => {
    const httpHandler = {
      req: {
        url: '/a-route-pattern',
        query: {},
      },
      res: {},
    };
    const { req, res } = httpHandler;

    const routes = [
      {
        name: 'a-route-name',
        pattern: 'a-route-pattern{-:withOptionalParam}?',
        page: '/a-route-page',
      },
    ];

    const matchedRoute = routes[0];
    getRequestHandler(nextApp, routes)(req, res);

    expect(nextRender).toHaveBeenCalledWith(
      req,
      res,
      matchedRoute.page,
      req.query,
    );
  });

  test('call next render with the first defined route when two routes match the same pattern', () => {
    const httpHandler = {
      req: {
        url: '/a-route-withoutParam',
        query: {},
      },
      res: {},
    };
    const { req, res } = httpHandler;

    const routes = [
      {
        name: 'first-route-name',
        pattern: 'a-route-withoutParam',
        page: '/first-route-page',
      },
      {
        name: 'second-route-name',
        pattern: 'a-route-:withParam',
        page: '/second-route-page',
      },
    ];

    const [matchedRoute] = routes;
    getRequestHandler(nextApp, routes)(req, res);

    expect(nextRender).toHaveBeenCalledWith(
      req,
      res,
      matchedRoute.page,
      req.query,
    );
  });

  test('call next render when given route exists with additional query params', () => {
    const httpHandler = {
      req: {
        url: '/a-route-pattern?q=queryParam',
        query: {
          q: 'queryParam',
        },
      },
      res: {},
    };
    const { req, res } = httpHandler;

    const routes = [
      {
        name: 'a-route-name',
        pattern: 'a-route-pattern',
        page: '/a-route-page',
      },
    ];

    const [matchedRoute] = routes;
    getRequestHandler(nextApp, routes)(req, res);

    expect(nextRender).toHaveBeenCalledWith(
      req,
      res,
      matchedRoute.page,
      req.query,
    );
  });
});
