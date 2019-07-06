import React from 'react';
import App, { Container } from 'next/app';
import { RoutesProvider } from '../Link';

class Application extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    const { appRouteDefinitions, countryCode } =
      ctx.req || window.__NEXT_DATA__.props;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ...ctx, countryCode });
    }

    return {
      appRouteDefinitions,
      countryCode,
      pageProps
    };
  }

  render() {
    const { Component, pageProps, appRouteDefinitions } = this.props;

    return (
      <Container>
        <RoutesProvider routes={appRouteDefinitions}>
          <Component {...pageProps} />
          <a href="http://realestate.es:3001">ES</a> -{' '}
          <a href="http://realestate.co.uk:3001">UK</a>
        </RoutesProvider>
      </Container>
    );
  }
}

export default Application;
