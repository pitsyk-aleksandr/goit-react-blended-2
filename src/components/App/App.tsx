import Section from '../Section/Section';
import Container from '../Container/Container';
import Form from '../Form/Form';
import { getPhotos } from '../../services/photos';

import { useState } from 'react';
import type { Photo } from '../../types/photo';
import toast, { Toaster } from 'react-hot-toast';
import PhotosGallery from '../PhotosGallery/PhotosGallery';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import Modal from '../Modal/Modal';

// import css from "./App.module.css";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleSearch = async (search: string) => {
    console.log(search);
    try {
      setIsLoading(true);
      setIsError(false);
      setPhotos([]);
      const fetchphotos = await getPhotos(search);
      console.log(fetchphotos);
      if (fetchphotos.length === 0) {
        toast.error('No photos found');
        return;
      }
      setPhotos(fetchphotos);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSearch} />
          {isLoading && <Loader />}
          {isError && <Text>Error occurred while fetching photos</Text>}
          {photos.length > 0 && <PhotosGallery photos={photos} onSelect={handleSelect} />}
          <Toaster position="top-right" />
          {selectedPhoto && (
            <Modal onClose={() => setSelectedPhoto(null)}>
              <div
                style={{
                  backgroundColor: selectedPhoto.avg_color,
                  borderColor: selectedPhoto.avg_color,
                }}
              >
                <img src={selectedPhoto.src.original} alt={selectedPhoto.alt} />
              </div>
            </Modal>
          )}
        </Container>
      </Section>
    </>
  );
}
