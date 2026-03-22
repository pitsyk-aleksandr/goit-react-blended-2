// id - унікальний ідентифікатор
// avg_color - колір фотографії,
// alt - опис фото,
// src - об'єкт з розмірами картинок, нам цікаві розміри large та original.

export interface Photo {
  id: number;
  avg_color: string;
  alt: string;
  src: {
    large: string;
    original: string;
  };
}
