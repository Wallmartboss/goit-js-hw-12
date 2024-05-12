import axios from "axios";

export function pixabayRequest(userData) {

const searchUrl = `https://pixabay.com/api/?key=43769580-78f5aea5f54664bb89b2b40f7&q=${userData}&image_type=photo&orientation=horizontal&safesearch=true`;

  const response = axios.get(searchUrl);
  return response;
}