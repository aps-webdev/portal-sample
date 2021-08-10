export const getQueryParam = (params) => {
  return Object.entries(params)
    .map((param) => {
      return `${param[0]}=${param[1]}`;
    })
    .join('&');
};
