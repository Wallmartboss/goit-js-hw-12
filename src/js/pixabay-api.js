
export function pixabayRequest(userData) {

  const searchUrl = `https://pixabay.com/api/?key=43769580-78f5aea5f54664bb89b2b40f7&q=${userData}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(searchUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
         });
}