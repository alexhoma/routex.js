import React from 'react';
import Error from 'next/error';
import Link from '../Link';
import { findProperty } from '../api-client';

class PropertyPage extends React.Component {
  static async getInitialProps({ query, countryCode }) {
    // This is just an example to get a property from an API given a slug,
    // it's on you the logic you have you fetch the data
    const property = await findProperty(countryCode, query.propertySlug);

    return {
      property,
      query: JSON.stringify(query)
    };
  }

  render() {
    const { property, query } = this.props;

    if (!property) {
      return <Error statusCode="404" />;
    }

    const { title, price, description } = property;

    return (
      <section>
        <h1>{title}</h1>
        <p>{price}</p>
        <p>{description}</p>
        <p>{query}</p>
        <Link route="index" title="Home page">
          👉 Go home
        </Link>
      </section>
    );
  }
}

export default PropertyPage;
