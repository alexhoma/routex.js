import { parse } from 'url';

function getRequestHandler(nextApp) {
  const nextRequestHandler = nextApp.getRequestHandler();

  // This returns a middleware function
  // that will be executed by your node server
  return function(req, res) {
    const parsedUrl = parse(req.url, true);

    return nextRequestHandler(req, res, parsedUrl);
  };
}

export default getRequestHandler;
