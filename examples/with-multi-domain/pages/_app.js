import React from 'react';
import { RoutesProvider } from '../Link';

function Application({ Component, pageProps, appRouteDefinitions }) {
  return (
    <RoutesProvider routes={appRouteDefinitions}>
      <Component {...pageProps} />
      <a href="http://realestate.es:3001">ES</a> -{' '}
      <a href="http://realestate.co.uk:3001">UK</a>
    </RoutesProvider>
  );
}

Application.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  const { appRouteDefinitions, countryCode } =
    ctx.req || window.__NEXT_DATA__.props;

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ ...ctx, countryCode });
  }

  return {
    appRouteDefinitions,
    countryCode,
    pageProps,
  };
};

export default Application;
