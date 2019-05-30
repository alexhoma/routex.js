import getRequestHandler from './server';
import { parse } from 'url';

const nextRender = jest.fn();
const nextRequestHandler = jest.fn();
const nextApp = {
  render: nextRender,
  getRequestHandler: () => nextRequestHandler
};

describe('server/getRequestHandler', () => {
  test('should return a getRequestHandler function', () => {
    expect(getRequestHandler).toBeDefined();
  });

  test('should call next requestHandler when route does not exist in route definitions', () => {
    const httpHandler = {
      req: {
        url: '/a-route-url'
      },
      res: {}
    };
    const { req, res } = httpHandler;
    const parsedUrl = parse(req.url, true);

    getRequestHandler(nextApp)(req, res);

    expect(nextRequestHandler).toHaveBeenCalledWith(req, res, parsedUrl);
  });

  test('should call next render when given route exists', () => {
    const httpHandler = {
      req: {
        url: '/a-route-pattern',
        query: {}
      },
      res: {}
    };

    const { req, res } = httpHandler;

    const routes = [
      {
        name: 'a-route-name',
        pattern: 'a-route-pattern',
        page: '/a-route-page'
      }
    ];

    const matchedRoute = routes[0];
    getRequestHandler(nextApp, routes)(req, res);

    expect(nextRender).toHaveBeenCalledWith(
      req,
      res,
      matchedRoute.page,
      req.query
    );
  });

  test('should call next render when given route exists with route path params', () => {
    const httpHandler = {
      req: {
        url: '/a-route-pattern-firstParam-secondParam',
        query: {
          param1: 'firstParam',
          param2: 'secondParam'
        }
      },
      res: {}
    };
    const { req, res } = httpHandler;

    const routes = [
      {
        name: 'a-route-name',
        pattern: 'a-route-pattern-:param1-:param2',
        page: '/a-route-page'
      }
    ];

    const matchedRoute = routes[0];
    getRequestHandler(nextApp, routes)(req, res);

    expect(nextRender).toHaveBeenCalledWith(
      req,
      res,
      matchedRoute.page,
      req.query
    );
  });

  test('should call next render when given route exists with additional query params', () => {
    const httpHandler = {
      req: {
        url: '/a-route-pattern?q=queryParam',
        query: {
          q: 'queryParam'
        }
      },
      res: {}
    };
    const { req, res } = httpHandler;

    const routes = [
      {
        name: 'a-route-name',
        pattern: 'a-route-pattern',
        page: '/a-route-page'
      }
    ];

    const matchedRoute = routes[0];
    getRequestHandler(nextApp, routes)(req, res);

    expect(nextRender).toHaveBeenCalledWith(
      req,
      res,
      matchedRoute.page,
      req.query
    );
  });
});
