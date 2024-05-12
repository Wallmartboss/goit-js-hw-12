import axios from "axios";

export async function pixabayRequest(userData, qtyOnPage, page) {
  try {
    const searchParams = {
      params: {
        page,
        _per_page: qtyOnPage,
      }
    };
const searchUrl = `https://pixabay.com/api/?key=43769580-78f5aea5f54664bb89b2b40f7&q=${userData}&image_type=photo&orientation=horizontal&safesearch=true&`;

    const { data } = await axios.get(searchUrl, searchParams);
    return data; 
  } catch (error) {
    console.log("Виникла помилка:", error);
    throw error;
  }
}