export default () => {
  const baseUrl = 'https://api.unsplash.com/search/photos';
  const params = 'page=1&query=toy&client_id=ff5d1a05e1787f3a985f778af3d138c52bab071c5b2f2f73ba11721afcb8bd36';

  return fetch(`${baseUrl}?${params}`).then(
    response => response.json().then(
      ({ results }) => results.slice(0, 5).map(
        ({ alt_description: title, urls }) => ({ title, url: urls.regular }),
      ),
    ),
  );
};
