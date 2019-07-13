export function replaceStartingSlash(string) {
  return `/${string}`.replace(/^(\/\/)/, '/');
}

export function replaceIndexRoute(string) {
  return string.replace(/^(\/index)$/, '/');
}
