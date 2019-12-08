import fetch from 'isomorphic-fetch';

function composeFakeApiUrl(countryCode) {
  const ukPrefix = countryCode === 'uk' ? 'co.' : '';
  return `http://realestate.${ukPrefix}${countryCode}:3001/fake-data-${countryCode}.json`;
}

export async function findProperty(countryCode, propertyToFind) {
  const apiUrl = composeFakeApiUrl(countryCode);
  const response = await fetch(apiUrl);
  const data = await response.json();

  const [foundProperty] = data.filter(
    property => property.slug === propertyToFind,
  );

  return foundProperty;
}

export async function findAllProperties(countryCode) {
  const apiUrl = composeFakeApiUrl(countryCode);
  const response = await fetch(apiUrl);

  return await response.json();
}
