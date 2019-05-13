import getRequestHandler from './server';
import { parse } from 'url';

describe('Routex/server/requestHandler', () => {
  test('should return a getRequestHandler function', () => {
    expect(getRequestHandler).toBeDefined();
  });

  test('should call nextRequestHandler with request and response as params', () => {
    const nextRequestHandler = jest.fn();
    const nextApp = {
      render: jest.fn(),
      getRequestHandler: () => nextRequestHandler
    };

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
});
