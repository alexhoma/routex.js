import React from 'react';
import Link from '../Link';
import { findAllProperties } from '../api-client';

class Index extends React.Component {
  static async getInitialProps({ query, countryCode }) {
    // This is just an example to get all properties of a country from an API,
    // it's on you the logic you have you fetch the data
    const properties = await findAllProperties(countryCode);

    return {
      properties
    };
  }

  render() {
    const { properties } = this.props;

    return (
      <div>
        <h1>Real Estate website</h1>
        <ul>
          {properties.map(property => (
            <li key={property.slug}>
              <Link
                route="property-for-rent"
                params={{
                  propertySlug: property.slug
                }}
              >
                {property.title} - {property.price}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Index;
