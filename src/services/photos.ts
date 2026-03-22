import axios from 'axios';

import type { Photo } from '../types/photo';

// Тепер ключ API зберігається в змінній оточення, і ми отримуємо його через import.meta.env
// В цьому випадку, ми використовуємо VITE_API_KEY, оскільки всі змінні оточення в Vite повинні починатися з VITE_
// const API_KEY = "563492ad6f9170000100000108dc2880626e4436b3634ce1cf6b4d74";

// Отримуємо значення змінної оточення (з файлу .env)
// Не забуваємо додати .env в файл .gitignore !!!
// Додатково треба додати в Versel (Settings → Environment Variables)
axios.defaults.baseURL = import.meta.env.VITE_PEXELS_API_URL;
axios.defaults.headers.common['Authorization'] = import.meta.env.VITE_PEXELS_API_KEY;

axios.defaults.params = {
  orientation: 'landscape',
};

interface GetPhotosResponse {
  photos: Photo[];
}

export const getPhotos = async (query: string): Promise<Photo[]> => {
  const response = await axios.get<GetPhotosResponse>(`search?query=${query}`);

  console.log(response.data);

  return response.data.photos;
};
