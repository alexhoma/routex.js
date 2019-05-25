import getRequestHandler from './server';
import { parse } from 'url';

const nextRender = jest.fn();
const nextRequestHandler = jest.fn();
const nextApp = {
  render: nextRender,
  getRequestHandler: () => nextRequestHandler
};

describe('Routex/server/requestHandler', () => {
  test('should return a getRequestHandler function', () => {
    expect(getRequestHandler).toBeDefined();
  });

  test('should call next requestHandler with request, response and parsedUrl', () => {
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

  test('should call next render when given route exists in route definitions', () => {
    const httpHandler = {
      req: {
        url: '/a-route-pattern-hello',
        query: {
          param: 'hello'
        }
      },
      res: {}
    };
    const { req, res } = httpHandler;

    const routes = [
      {
        name: 'a-route-name',
        pattern: 'a-route-pattern-:param',
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
