import axios from 'axios';
const URL = 'https://pixabay.com/api/';
const PIXABAY_API_KEY = '32461128-4a9834d8affa3b6b2034fc7e6';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = 'true';
export const PER_PAGE = 15;

// axios.defaults.baseURL = 'https://pixabay.com/api/';

export const searchImage = async (query, page) => {
  try {
    const searchParams = new URLSearchParams({
      key: PIXABAY_API_KEY,
      image_type: IMAGE_TYPE,
      orientation: ORIENTATION,
      safesearch: SAFESEARCH,
      per_page: PER_PAGE,
      page: page,
      q: query,
    });

    const url = `${URL}?${searchParams}`;
    const response = await axios.get(url);
    if (!response.status) {
      throw new Error('Something goes wrong');
    }

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};