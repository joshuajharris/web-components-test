export default () => {
  const url = 'https://api.unsplash.com/search/photos?page=1&query=toy&client_id=ff5d1a05e1787f3a985f778af3d138c52bab071c5b2f2f73ba11721afcb8bd36';

  return fetch(url).then((response) => {
    return response.json().then(
      ({ results }) => results.slice(0, 5).map(({ alt_description: title, urls }) => ({ title, url: urls.regular })),
    );
  });
};
